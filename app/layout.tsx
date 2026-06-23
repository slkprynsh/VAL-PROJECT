import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { CookieConsent } from '@/components/ui/cookie-consent';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  'name': 'VAM VALTRIX – Advance Material Pvt. Ltd',
  'url': 'https://valtrix-frontend-y7df.vercel.app',
  'logo': 'https://valtrix-frontend-y7df.vercel.app/valtrix-logo.png',
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+91 22 4976 8900',
    'contactType': 'customer service',
    'areaServed': 'IN',
    'availableLanguage': ['en', 'hi'],
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Advance Material Pvt. Ltd',
    'addressCountry': 'India',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
