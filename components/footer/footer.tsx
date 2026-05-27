'use client';

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
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center',   href: '#' },
    { label: 'Case Studies',  href: '#' },
    { label: 'Status',        href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use',   href: '#' },
    { label: 'Cookies',        href: '#' },
    { label: 'Compliance',     href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-gray-300">
      {/* Newsletter banner */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:flex md:items-center md:justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-400">Get the latest updates on advanced materials and innovation.</p>
          </div>
          <form className="flex gap-2 max-w-sm w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#17A2B8] text-white text-sm font-semibold hover:bg-[#0D7A8C] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src="/valtrix-logo.png" alt="VAM VALTRIX" width={130} height={44} className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Advance Material Pvt. Ltd — delivering precision-engineered materials to industries worldwide.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Phone size={14} className="text-[#17A2B8]" /><span>+91 XXX XXX XXXX</span></div>
              <div className="flex items-center gap-2"><Mail size={14} className="text-[#17A2B8]" /><span>info@vamvaltrix.com</span></div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-[#17A2B8]" /><span>India</span></div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-[#17A2B8] transition-colors">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} VAM VALTRIX – Advance Material Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Facebook,  label: 'Facebook'  },
              { icon: Twitter,   label: 'Twitter'   },
              { icon: Linkedin,  label: 'LinkedIn'  },
              { icon: Instagram, label: 'Instagram' },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#17A2B8] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
