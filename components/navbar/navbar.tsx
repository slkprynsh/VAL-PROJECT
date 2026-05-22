'use client';

import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useEffect, useState } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Impact', href: '/impact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const scrollProgress = useScrollProgress();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrollDirection === 'down' && scrollProgress > 5
            ? 'translate-y-0'
            : 'translate-y-0',
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/valtrix-logo.png"
                alt="VALTRIX"
                width={132}
                height={44}
                className="h-11 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <CustomButton variant="ghost" size="sm">
                Sign In
              </CustomButton>
              <CustomButton variant="primary" size="sm">
                Get Started
              </CustomButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className="h-1 bg-gradient-to-r from-teal-600 to-cyan-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-30 bg-white border-b border-gray-100 md:hidden">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:bg-teal-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <CustomButton variant="ghost" size="sm" className="flex-1">
                Sign In
              </CustomButton>
              <CustomButton variant="primary" size="sm" className="flex-1">
                Get Started
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
