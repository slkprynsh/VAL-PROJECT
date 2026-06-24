/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const apiOrigins = [
  'http://localhost:5000',
  'https://valtrix-backend-y7df.vercel.app',
].join(' ');

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com"
  : "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com";

const nextConfig = {
  poweredByHeader: false,

  // ── Compiler optimisations ──────────────────────────────────────────
  compiler: {
    // Remove console.log in production
    removeConsole: isDev ? false : { exclude: ['error', 'warn'] },
  },

  // ── Image optimisation ──────────────────────────────────────────────
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // 1 day browser cache for optimised images
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'valtrix-backend-y7df.vercel.app' },
    ],
  },

  // ── HTTP → HTTPS redirect in production ────────────────────────────
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

  // ── Security & performance headers ─────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
          { key: 'X-Frame-Options',             value: 'DENY' },
          { key: 'X-Content-Type-Options',       value: 'nosniff' },
          { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()', 'microphone=()', 'geolocation=()',
              'interest-cohort=()', 'payment=()', 'usb=()', 'bluetooth=()',
              'autoplay=()', 'fullscreen=(self)',
            ].join(', '),
          },
          { key: 'Strict-Transport-Security',    value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control',       value: 'on' },
          { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
        ],
      },
      // Aggressive caching for static assets (they are content-hashed by Next.js)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache local images for 1 day
      {
        source: '/:file(.*\\.(?:jpg|jpeg|png|gif|webp|avif|svg|ico))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=43200' },
        ],
      },
    ];
  },
};

export default nextConfig;
