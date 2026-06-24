import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { CookieConsent } from '@/components/ui/cookie-consent';
import './globals.css';

// Subset + display:swap eliminates render-blocking font flash
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'VAM VALTRIX – Advance Material Pvt. Ltd',
  description: 'Leading manufacturer of advanced materials for industrial applications. Metals, composites, polymers, and specialty coatings.',
  openGraph: {
    title: 'VAM VALTRIX – Advance Material Pvt. Ltd',
    description: 'Leading manufacturer of advanced materials for industrial applications.',
    url: 'https://vamvaltrix.com',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VAM VALTRIX – Advance Material Pvt. Ltd',
  url: 'https://vamvaltrix.com',
  logo: 'https://vamvaltrix.com/valtrix-logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 22 4976 8900',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Advance Material Pvt. Ltd',
    addressCountry: 'India',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        {/* Preload hero carousel images for instant display */}
        <link rel="preload" as="image" href="/compositematerials.jpg" />
        <link rel="preload" as="image" href="/advancedalloys.jpg" />
        <link rel="preload" as="image" href="/protectivelayer.jpg" />
        <link rel="preload" as="image" href="/specialtypolymers.jpg" />

        {/* DNS prefetch for external origins used across the site */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <link rel="dns-prefetch" href="https://valtrix-backend-y7df.vercel.app" />

        {/* Preconnect to font origin — eliminates connection latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white text-[#1A1A1A]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        {/*
          reCAPTCHA is NOT loaded here globally anymore.
          It is loaded only on the /contact page to avoid
          adding ~150 KB to every page's initial load.
        */}
      </body>
    </html>
  );
}
