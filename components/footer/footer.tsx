'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
    { label: 'Compliance', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-500 p-8 text-white md:flex md:items-center md:justify-between">
          <div className="md:flex-1">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-teal-50">
              Get the latest updates on advanced materials and innovation.
            </p>
          </div>
          <form className="mt-6 md:mt-0 md:ml-8 flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            />
            <CustomButton variant="secondary">Subscribe</CustomButton>
          </form>
        </div>

        {/* Links Grid */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link
                href="/"
                className="flex items-center gap-2 mb-2"
              >
                <Image
                  src="/valtrix-logo.png"
                  alt="VALTRIX"
                  width={110}
                  height={39}
                  className="h-9 w-auto"
                />
              </Link>
              <p className="text-sm text-gray-400">
                Advancing materials for tomorrow&apos;s innovations.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-teal-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 VALTRIX. All rights reserved. | Advancing Materials for the Future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
