'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const navItems = [
  { label: 'About',      href: '/about' },
  { label: 'Solutions',  href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Impact',     href: '/impact' },
  { label: 'Contact',    href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress                       = useScrollProgress();
  const pathname                             = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm',
      )}>
        {/* Top bar */}
        <div className="bg-[#2C3E50] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+912249768900" className="flex items-center gap-1.5 hover:text-[#D1F2F7] transition-colors">
                <Phone size={13} />
                <span>+91 22 4976 8900</span>
              </a>
              <a href="mailto:info@vamvaltrix.com" className="hidden md:flex items-center gap-1.5 hover:text-[#D1F2F7] transition-colors">
                <Mail size={13} />
                <span>info@vamvaltrix.com</span>
              </a>
            </div>
            <span className="text-xs text-gray-300">ISO Certified &nbsp;|&nbsp; Advance Material Pvt. Ltd</span>
          </div>
        </div>

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/valtrix-logo.png"
                alt="VAM VALTRIX"
                width={140}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav — pill style with active state */}
            <div className="hidden md:flex items-center bg-[#F8FAFB] border border-gray-200 rounded-xl px-2 py-1.5 gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'bg-[#17A2B8] text-white shadow-sm'
                        : 'text-[#2C3E50] hover:bg-[#E6F7FA] hover:text-[#17A2B8]',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA button */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#17A2B8] text-white hover:bg-[#0D7A8C] transition-all duration-200 shadow-sm"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#1A1A1A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          className="h-0.5 bg-[#17A2B8] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[calc(2.5rem+5rem)] left-0 right-0 z-40 bg-white border-b border-gray-100 md:hidden shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm',
                    isActive
                      ? 'bg-[#17A2B8] text-white'
                      : 'text-[#2C3E50] hover:bg-[#E6F7FA] hover:text-[#17A2B8]',
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-gray-100">
              <Link href="/contact" className="block text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#17A2B8] text-white">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
