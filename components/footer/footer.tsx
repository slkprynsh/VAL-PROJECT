'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us',   href: '/about'      },
    { label: 'Solutions',  href: '/solutions'   },
    { label: 'Industries', href: '/industries'  },
    { label: 'Impact',     href: '/impact'      },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use',   href: '/terms-of-use'   },
    { label: 'Cookies',        href: '/cookies'        },
    { label: 'Compliance',     href: '/compliance'     },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Honeypot — bots fill this, humans don't
    if (honeypot) {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      return;
    }

    // Strict email validation
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(trimmed) || trimmed.length > 254) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Block disposable email domains
    const blockedDomains = ['mailinator.com', 'guerrillamail.com', 'trashmail.com', 'tempmail.com'];
    if (blockedDomains.includes(trimmed.split('@')[1])) {
      setStatus('error');
      setMessage('Please use a work email address.');
      return;
    }

    setStatus('loading');
    try {
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), 10_000);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/newsletter/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error('Subscription failed');
      }
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      if (err instanceof DOMException && err.name === 'AbortError') {
        setMessage('Request timed out. Please try again.');
      } else {
        setMessage('Unable to subscribe right now. Please try again later.');
      }
    }
  };

  return (
    <footer className="bg-[#2C3E50] text-gray-300">
      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:flex md:items-center md:justify-between gap-8">
          <div className="mb-5 md:mb-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-400">Get the latest updates on advanced materials and innovation.</p>
          </div>
          <div className="max-w-sm w-full">
            <form className="flex gap-2" onSubmit={handleSubscribe} noValidate>
              {/* Honeypot */}
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 px-3 sm:px-5 py-2.5 rounded-lg bg-[#17A2B8] text-white text-sm font-semibold hover:bg-[#0D7A8C] transition-colors disabled:opacity-50 whitespace-nowrap min-h-[44px]"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`text-xs mt-2 ${status === 'success' ? 'text-teal-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/valtrix-logo.png" alt="VAM VALTRIX" width={130} height={44} className="h-9 sm:h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Advance Material Pvt. Ltd — delivering precision-engineered materials to industries worldwide.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#17A2B8] shrink-0" />
                <a href="tel:+912249768900" className="hover:text-white transition-colors">+91 22 4976 8900</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#17A2B8] shrink-0" />
                <a href="mailto:info@vamvaltrix.com" className="hover:text-white transition-colors break-all">info@vamvaltrix.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#17A2B8] shrink-0" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 sm:mb-4 text-sm font-semibold text-white uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-[#17A2B8] transition-colors inline-block py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} VAM VALTRIX – Advance Material Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Facebook,  label: 'Facebook',  href: 'https://facebook.com/vamvaltrix' },
              { icon: Twitter,   label: 'Twitter',   href: 'https://twitter.com/vamvaltrix' },
              { icon: Linkedin,  label: 'LinkedIn',  href: 'https://linkedin.com/company/vamvaltrix' },
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/vamvaltrix' },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#17A2B8] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
