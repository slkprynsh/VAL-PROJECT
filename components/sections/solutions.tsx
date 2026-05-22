'use client';

import { useState } from 'react';
import { Section, SectionTitle } from '@/components/ui/section';
import { GlassCard } from '@/components/ui/glass-card';
import { Reveal } from '@/components/animations/reveal';
import { solutions } from '@/data/solutions';
import { motion, AnimatePresence } from 'framer-motion';

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState('carbon-tracking');

  const activeSolution = solutions.find((s) => s.id === activeTab) || solutions[0];
  const Icon = activeSolution.icon;

  return (
    <Section className="bg-white">
      <SectionTitle
        subtitle="WHAT WE DO"
        title="End-to-End Material Sourcing, Simplified"
        description="One platform to source, verify, order, and track every material your operation depends on."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        {/* Tab buttons */}
        <div className="space-y-3 lg:col-span-1">
          {solutions.map((solution) => (
            <Reveal key={solution.id} direction="left">
              <motion.button
                onClick={() => setActiveTab(solution.id)}
                className={`w-full text-left px-6 py-4 rounded-xl transition-all duration-200 ${
                  activeTab === solution.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-semibold">{solution.title}</div>
                <p className="text-sm opacity-75 mt-1">{solution.description}</p>
              </motion.button>
            </Reveal>
          ))}
        </div>

        {/* Details panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                variant="light"
                className="p-10 backdrop-blur-lg border-2 border-teal-200/30"
              >
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-teal-100">
                    <Icon size={32} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {activeSolution.title}
                    </h3>
                    <p className="text-gray-600">{activeSolution.description}</p>
                  </div>
                </div>

                <div className="mb-8 h-0.5 bg-gradient-to-r from-teal-300 to-cyan-300" />

                <div className="grid grid-cols-2 gap-4">
                  {activeSolution.features.map((feature) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-teal-600" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                  Learn More →
                </motion.button>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
