/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

// Allowed backend origins
const apiOrigins = [
  'http://localhost:5000',
  'https://valtrix-backend-y7df.vercel.app',
].join(' ');

// script-src: 'unsafe-eval' only in dev (required by React/Turbopack for call-stack reconstruction)
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com"
  : "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com";

const nextConfig = {
  // ── Disable x-powered-by header (hides Next.js fingerprint) ──────────
  poweredByHeader: false,

  // ── Image optimisation ───────────────────────────────────────────────
  images: {
    unoptimized: true,
    // Only allow images from these origins
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'valtrix-backend-y7df.vercel.app' },
    ],
  },

  // ── Redirect HTTP → HTTPS in production ─────────────────────────────
  async redirects() {
    if (isDev) return [];
    return [
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://vamvaltrix.com/:path*',
        permanent: true,
      },
    ];
  },

  // ── Security headers on every route ─────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content-Security-Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              `img-src 'self' data: blob: https://images.unsplash.com https://valtrix-backend-y7df.vercel.app`,
              `connect-src 'self' ${apiOrigins} https://www.google.com`,
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // Clickjacking protection (redundant with frame-ancestors but belt-and-suspenders)
          { key: 'X-Frame-Options',        value: 'DENY' },
          // MIME-type sniffing protection
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Referrer leakage control
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          // Restrict browser feature access
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'interest-cohort=()',   // disables FLoC / Topics API
              'payment=()',
              'usb=()',
              'bluetooth=()',
            ].join(', '),
          },
          // HSTS — 2 years, include subdomains, preload-ready
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // DNS prefetch control
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // Cross-Origin policies
          { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' }, // set to require-corp if you control all sub-resources
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
        ],
      },
      // Cache static assets aggressively but never cache HTML pages
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
