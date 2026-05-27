'use client';

import { Section, SectionTitle } from '@/components/ui/section';
import { companies } from '@/data/companies';
import { motion } from 'framer-motion';

export function TrustedBySection() {
  return (
    <Section className="bg-[#F8FAFB]">
      <SectionTitle
        subtitle="TRUSTED ACROSS INDUSTRY"
        title="Built for the Companies That Build Everything Else"
        description="From precision component makers to large-scale structural fabricators, VAM VALTRIX powers procurement for manufacturers who can't afford supply chain surprises."
      />

      <div className="relative overflow-hidden mt-12">
        <div className="flex gap-6 animate-infinite-scroll">
          {[...companies, ...companies].map((company, idx) => (
            <motion.div
              key={`${company.name}-${idx}`}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 flex items-center justify-center px-8 py-5 rounded-xl border border-gray-200 bg-white hover:border-[#D1F2F7] hover:shadow-sm transition-all w-40 h-20"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-[#17A2B8] mb-0.5">{company.logo}</div>
                <div className="text-xs font-medium text-[#6B7280]">{company.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#F8FAFB] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#F8FAFB] to-transparent pointer-events-none" />
      </div>
    </Section>
  );
}
