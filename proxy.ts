/**
 * Next.js Edge Proxy — Security layer
 *
 * Runs on every request before it reaches the app:
 *  1. Blocks obviously malicious URL patterns (path traversal, null bytes, etc.)
 *  2. In-memory rate limiting per IP on mutating / sensitive routes
 *  3. Removes the Server header fingerprint
 *  4. Blocks known bad User-Agent patterns (scanners, exploit kits)
 */

import { NextRequest, NextResponse } from 'next/server';

// ── 1. Malicious URL pattern blocklist ────────────────────────────────
const BLOCKED_PATTERNS = [
  /\.\.[/\\]/,                   // path traversal
  /%2e%2e/i,                     // encoded traversal
  /\x00/,                        // null byte injection
  /<script/i,                    // XSS in URL
  /union\s+select/i,             // SQL injection probe
  /etc\/passwd/i,                // Unix file probe
  /wp-admin|phpMyAdmin|\.php$/i, // CMS/PHP scanner probes
  /eval\s*\(/i,                  // eval injection
];

// ── 2. Rate limiting store (in-memory, Edge runtime) ─────────────────
//    Limits: 30 requests / 60 s per IP on sensitive paths
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX       = 30;
const rateLimitStore       = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMITED_PATHS = ['/api/', '/contact', '/solutions'];

function getRealIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) return false; // blocked

  entry.count++;
  return true; // allowed
}

// ── 3. Bad User-Agent blocklist ───────────────────────────────────────
const BLOCKED_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /nmap/i,
  /zgrab/i,
  /dirbuster/i,
  /hydra/i,
  /python-requests\/[01]\./i, // old Python scraper versions
  /go-http-client\/1\./i,     // Go scanner pattern
];

// ── Proxy entry point (Next.js 16+ convention) ────────────────────────
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const fullPath = pathname + search;
  const ua       = req.headers.get('user-agent') ?? '';

  // Block malicious URL patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(fullPath)) {
      return new NextResponse('Bad Request', { status: 400 });
    }
  }

  // Block bad User-Agents
  for (const pattern of BLOCKED_UA_PATTERNS) {
    if (pattern.test(ua)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // Rate limit on sensitive paths
  const isSensitive = RATE_LIMITED_PATHS.some((p) => pathname.startsWith(p));
  if (isSensitive) {
    const ip      = getRealIp(req);
    const allowed = checkRateLimit(ip);
    if (!allowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  const res = NextResponse.next();

  // Strip server fingerprint headers
  res.headers.delete('server');
  res.headers.delete('x-powered-by');

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)).*)',
  ],
};
