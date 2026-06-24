/**
 * Next.js Edge Middleware — Security layer
 *
 * Runs on every request BEFORE it reaches the app:
 *  1. Blocks malicious URL patterns (path traversal, null bytes, XSS, SQLi probes)
 *  2. In-memory rate limiting per IP on sensitive routes
 *  3. Strips server fingerprint headers
 *  4. Blocks known scanner / exploit User-Agents
 */

import { NextRequest, NextResponse } from 'next/server';

// ── 1. Malicious URL pattern blocklist ────────────────────────────────
const BLOCKED_PATTERNS: RegExp[] = [
  /\.\.[/\\]/,                    // path traversal  ../
  /%2e%2e/i,                      // encoded traversal %2e%2e
  /\x00/,                         // null byte injection
  /<script/i,                     // XSS in URL
  /union\s+select/i,              // SQL injection probe
  /etc\/passwd/i,                 // Unix file probe
  /wp-admin|phpMyAdmin|\.php$/i,  // CMS/PHP scanner probes
  /eval\s*\(/i,                   // eval injection
  /base64_decode/i,               // PHP RCE probe
  /\.\//,                         // dot-slash traversal
  /\/\//,                         // double-slash normalization abuse
];

// ── 2. Rate limiting (in-memory per Edge instance) ────────────────────
//    60 requests / 60 s on sensitive paths — stricter than before
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX       = 60;
const rateLimitStore       = new Map<string, { count: number; resetAt: number }>();

// Clean up stale entries periodically to prevent memory leak
let lastCleanup = Date.now();
function maybePurgeStore() {
  const now = Date.now();
  if (now - lastCleanup < 120_000) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) rateLimitStore.delete(key);
  }
}

const RATE_LIMITED_PATHS = ['/contact', '/solutions', '/about', '/industries', '/impact'];
const STRICT_RATE_LIMIT_MAX = 10; // stricter limit for form-submission-likely paths
const STRICT_PATHS = ['/contact'];

function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function checkRateLimit(ip: string, strict: boolean): boolean {
  maybePurgeStore();
  const now    = Date.now();
  const key    = `${ip}:${strict ? 's' : 'n'}`;
  const entry  = rateLimitStore.get(key);
  const maxReq = strict ? STRICT_RATE_LIMIT_MAX : RATE_LIMIT_MAX;

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count++;
  return true;
}

// ── 3. Bad User-Agent blocklist ───────────────────────────────────────
const BLOCKED_UA_PATTERNS: RegExp[] = [
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /nmap/i,
  /zgrab/i,
  /dirbuster/i,
  /gobuster/i,
  /wfuzz/i,
  /hydra/i,
  /burpsuite/i,
  /metasploit/i,
  /python-requests\/[01]\./i,   // old Python scraper
  /go-http-client\/1\./i,       // Go scanner
  /curl\/[0-6]\./i,             // old curl versions used by scanners
  /libwww-perl/i,               // perl scanner
  /scrapy/i,                    // web scraper
];

// ── Middleware entry point ─────────────────────────────────────────────
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const fullPath = pathname + search;
  const ua       = req.headers.get('user-agent') ?? '';
  const method   = req.method;

  // ── Block malicious URL patterns ──
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(fullPath)) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // ── Block bad User-Agents ──
  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // ── Block empty User-Agent on non-static routes (bot signal) ──
  if (!ua && !pathname.startsWith('/_next')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // ── Rate limit sensitive paths ──
  const isRateLimited = RATE_LIMITED_PATHS.some((p) => pathname.startsWith(p));
  if (isRateLimited) {
    const isStrict = STRICT_PATHS.some((p) => pathname.startsWith(p));
    const ip       = getRealIp(req);
    if (!checkRateLimit(ip, isStrict)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // ── Block non-standard HTTP methods ──
  const ALLOWED_METHODS = ['GET', 'HEAD', 'POST', 'OPTIONS'];
  if (!ALLOWED_METHODS.includes(method)) {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  const res = NextResponse.next();

  // ── Strip server fingerprint headers ──
  res.headers.delete('server');
  res.headers.delete('x-powered-by');

  // ── Add security headers not covered by next.config.mjs ──
  res.headers.set('X-Request-ID', crypto.randomUUID());

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)).*)',
  ],
};
