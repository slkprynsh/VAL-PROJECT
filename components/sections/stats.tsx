'use client';

import { Section, SectionTitle } from '@/components/ui/section';
import { GlassCard } from '@/components/ui/glass-card';
import { Counter } from '@/components/animations/counter';
import { Reveal } from '@/components/animations/reveal';
import { motion } from 'framer-motion';

const stats = [
  {
    label: 'Vetted Material Suppliers',
    value: 320,
    suffix: '+',
    description: 'Every supplier verified before onboarding',
  },
  {
    label: 'Active Material SKUs',
    value: 18000,
    suffix: '+',
    description: 'Metals, polymers, composites, coatings',
  },
  {
    label: 'On-Time Fulfillment Rate',
    value: 97,
    suffix: '.4%',
    description: 'Earned on the floor, not in a boardroom',
  },
  {
    label: 'Countries Served',
    value: 60,
    suffix: '+',
    description: 'Global reach with local accountability',
  },
];

export function StatsSection() {
  return (
    <Section className="bg-gradient-to-b from-gray-50 to-white">
      <SectionTitle
        subtitle="PERFORMANCE BY THE NUMBERS"
        title="The Metrics That Keep Production Moving"
        description="Every number here is earned on the floor, not in a boardroom."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {stats.map((stat, idx) => (
          <Reveal key={stat.label} delay={idx * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                variant="light"
                className="text-center p-8 backdrop-blur-lg h-full"
              >
              <div className="mb-4 text-4xl font-bold text-teal-600">
                <Counter
                  end={stat.value}
                  duration={2}
                  suffix={stat.suffix}
                />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-600">{stat.description}</p>
            </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
