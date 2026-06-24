'use client';

import { Section, SectionTitle } from '@/components/ui/section';
import { Counter } from '@/components/animations/counter';
import { Reveal } from '@/components/animations/reveal';
import { motion } from 'framer-motion';
import { Factory, TrendingUp, Award, Users } from 'lucide-react';

const stats = [
  { icon: Factory,    value: 320,   suffix: '+',   label: 'Vetted Suppliers',       description: 'Every supplier verified before onboarding' },
  { icon: TrendingUp, value: 18000, suffix: '+',   label: 'Active Material SKUs',   description: 'Metals, polymers, composites, coatings' },
  { icon: Award,      value: 97,    suffix: '.4%', label: 'On-Time Fulfillment',    description: 'Earned on the floor, not in a boardroom' },
  { icon: Users,      value: 60,    suffix: '+',   label: 'Countries Served',       description: 'Global reach with local accountability' },
];

export function StatsSection() {
  return (
    <Section className="bg-[#F8FAFB]">
      <SectionTitle
        subtitle="PERFORMANCE BY THE NUMBERS"
        title="The Metrics That Keep Production Moving"
        description="Every number here is earned on the floor, not in a boardroom."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="h-full bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D1F2F7] transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#E6F7FA] mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#17A2B8]" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-1">
                  <Counter end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">{stat.label}</h3>
                <p className="text-xs text-[#6B7280]">{stat.description}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
