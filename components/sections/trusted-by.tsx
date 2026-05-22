'use client';

import { Section, SectionTitle } from '@/components/ui/section';
import { companies } from '@/data/companies';
import { motion } from 'framer-motion';

export function TrustedBySection() {
  return (
    <Section className="bg-white">
      <SectionTitle
        subtitle="TRUSTED ACROSS INDUSTRY"
        title="Built for the Companies That Build Everything Else"
        description="From precision component makers to large-scale structural fabricators, VALTRIX powers procurement for manufacturers who can't afford supply chain surprises."
      />

      {/* Scrolling logos */}
      <div className="relative overflow-hidden mt-12">
        <div className="flex gap-8 animate-infinite-scroll">
          {[...companies, ...companies].map((company, idx) => (
            <motion.div
              key={`${company.name}-${idx}`}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center justify-center px-8 py-6 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-all w-40 h-20"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-1">
                  {company.logo}
                </div>
                <div className="text-xs font-medium text-gray-600">
                  {company.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </Section>
  );
}
