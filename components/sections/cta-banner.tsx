'use client';

import { Section } from '@/components/ui/section';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function CTABanner() {
  return (
    <Section fullWidth className="bg-[#2C3E50] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#17A2B8] animate-pulse" />
          <span className="text-sm font-medium text-[#D1F2F7]">Ready to streamline your supply chain?</span>
        </div>

        <h2 className="mb-4 text-4xl sm:text-5xl font-bold text-white text-balance">
          Your Next Order Shouldn&apos;t Take Three Weeks to Source
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
          VAM VALTRIX gives industrial manufacturers direct access to a pre-vetted material supply network — with full traceability, spec documentation, and a fulfillment team that understands production timelines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors duration-200 shadow-sm group"
          >
            Request a Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
          >
            Talk to a Specialist
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-300"
        >
          {['No minimum order commitment', 'Spec sheet verification included', 'Dedicated account support from day one'].map((f) => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle size={15} className="text-[#17A2B8] shrink-0" />
              {f}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
