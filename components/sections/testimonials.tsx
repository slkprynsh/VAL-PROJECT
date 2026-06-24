'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';

const threatCards = [
  {
    title: 'Equipment Failure',
    description: 'Substandard materials accelerate wear and cause unexpected breakdowns, resulting in costly unplanned downtime across production lines.',
    image: '/equipment-failure.jpg',
    gradient: 'from-[#1a2e40] to-[#0D7A8C]',
  },
  {
    title: 'Economic Loss',
    description: 'Supply chain failures cost global manufacturers billions annually — from line stoppages, emergency sourcing premiums, and expedited freight.',
    image: '/economic-loss.jpg',
    gradient: 'from-[#0D7A8C] to-[#17A2B8]',
  },
  {
    title: 'Surface Degradation',
    description: 'Unprotected or improperly specified materials degrade rapidly in harsh environments, compounding maintenance costs and compliance risk.',
    image: '/placeholder.jpg',
    gradient: 'from-[#2C3E50] to-[#1a2e40]',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading row */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#2C3E50] leading-tight">
              Material Failure is an{' '}
              <span className="text-[#17A2B8]">Economic Threat.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[#6B7280] leading-relaxed text-lg">
              Equipment downtime directly impacts the bottom line. Material failures in industrial
              environments cascade into production delays, compliance violations, and lost revenue.
              Valtrix eliminates this risk at the source.
            </p>
          </motion.div>
        </div>

        {/* Threat cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {threatCards.map((card, idx) => (
            <Reveal key={card.title} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300 group"
              >
                {/* Gradient image area */}
                <div className={`relative h-48 bg-gradient-to-br ${card.gradient} overflow-hidden`}>
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                      {card.title}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                  <h3 className="font-bold text-[#2C3E50] mb-2 group-hover:text-[#17A2B8] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
