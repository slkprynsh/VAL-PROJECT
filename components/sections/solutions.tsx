'use client';

import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, Recycle } from 'lucide-react';

const materials = [
  {
    icon: Layers,
    name: 'Composite Materials',
    description: 'High-performance fiber-reinforced composites for aerospace and automotive applications.',
    features: ['Carbon Fiber', 'Glass Fiber', 'Kevlar'],
  },
  {
    icon: Zap,
    name: 'Advanced Alloys',
    description: 'Specialized metal alloys engineered for extreme conditions and superior strength.',
    features: ['Titanium Alloys', 'Nickel-based', 'Aluminum'],
  },
  {
    icon: Shield,
    name: 'Protective Coatings',
    description: 'Industrial-grade coatings providing corrosion resistance and thermal protection.',
    features: ['Anti-corrosion', 'Thermal Barrier', 'Wear Resistant'],
  },
  {
    icon: Recycle,
    name: 'Sustainable Materials',
    description: 'Eco-friendly alternatives without compromising on performance and durability.',
    features: ['Bio-based', 'Recyclable', 'Low Carbon'],
  },
];

export function SolutionsSection() {
  return (
    <Section className="bg-white" id="solutions">
      <SectionTitle
        subtitle="OUR PRODUCT RANGE"
        title="Advanced Material Solutions"
        description="Engineered materials that set new standards in performance, reliability, and innovation."
      />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {materials.map((material, idx) => {
          const Icon = material.icon;
          return (
            <Reveal key={material.name} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#D1F2F7] transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center group-hover:bg-[#17A2B8] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#17A2B8] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2C3E50] mb-2 group-hover:text-[#17A2B8] transition-colors">
                      {material.name}
                    </h3>
                    <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">{material.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {material.features.map((f) => (
                        <span key={f} className="px-3 py-1 rounded-full bg-[#F8FAFB] border border-gray-100 text-[#2C3E50] text-xs font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
      <div className="text-center mt-10">
        <a
          href="/solutions"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors duration-200 shadow-sm"
        >
          View Complete Catalog
        </a>
      </div>
    </Section>
  );
}
