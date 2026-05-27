import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-[#1A1A1A]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
