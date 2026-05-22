'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { Reveal } from '@/components/animations/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { solutions } from '@/data/solutions';

export default function SolutionsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
            One Platform. Every Material.{' '}
            <span className="gradient-text">Full Visibility.</span>
          </h1>
          <p className="text-xl text-gray-600">
            Source, verify, order, and track every material your operation depends on —
            from a single account with full documentation at every step.
          </p>
        </motion.div>
      </Section>

      {/* Solutions Grid */}
      <Section className="bg-gradient-to-b from-white to-gray-50">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <Reveal key={solution.id} delay={idx * 0.1}>
                <GlassCard variant="light" className="flex flex-col h-full hover:border-teal-200/50">
                  <div className="p-4 rounded-lg bg-teal-100 w-fit mb-6">
                    <Icon size={32} className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{solution.description}</p>
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0 mt-2" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <CustomButton variant="ghost" size="sm" className="w-full justify-start">
                    Learn More →
                  </CustomButton>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Integration Section */}
      <Section className="bg-white">
        <SectionTitle
          subtitle="CONNECTS WITH YOUR EXISTING STACK"
          title="Works With Your Tools"
          description="VALTRIX integrates with leading ERP, MRP, and procurement platforms so your sourcing data flows where your operations team already works — no manual reentry, no reconciliation headaches."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              title: 'ERP & MRP Integration',
              description: 'Connect directly to SAP, Oracle, and other major ERP/MRP systems for seamless data flow.',
            },
            {
              title: 'Procurement Platform Sync',
              description: 'Works with Coupa, Ariba, and other procurement platforms your team already uses.',
            },
            {
              title: 'Real-Time Order Data',
              description: 'Order status, shipment tracking, and cert documentation sync automatically to your systems.',
            },
            {
              title: 'Custom API Access',
              description: 'Full REST API for teams who need custom integrations with proprietary internal systems.',
            },
          ].map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.1}>
              <motion.div className="p-6 border border-gray-200 rounded-lg hover:border-teal-600 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-gradient-to-b from-gray-50 to-white">
        <SectionTitle
          subtitle="PROVEN RESULTS"
          title="What You Can Expect"
          description="Numbers from manufacturers already running on VALTRIX"
        />

        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          {[
            {
              benefit: '38% Average Lead Time Reduction',
              description: 'Procurement cycles cut from weeks to days across metals, polymers, and coatings.',
            },
            {
              benefit: '97.4% On-Time Fulfillment Rate',
              description: 'Earned across 99,000+ orders — not a marketing number.',
            },
            {
              benefit: '360° End-to-End Order Visibility',
              description: 'From quote to delivery, every step is tracked and documented in your account.',
            },
            {
              benefit: '<4 hrs Average Response on Custom Sourcing Requests',
              description: 'When you need something outside the catalog, our sourcing team moves fast.',
            },
          ].map((item, idx) => (
            <Reveal key={item.benefit} delay={idx * 0.1} direction="left">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex gap-4 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg flex-shrink-0">
                  <span className="text-teal-600 font-bold text-lg">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.benefit}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Get Started With a No-Commitment Sourcing Request</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Tell us what you need. We&apos;ll show you what we can source, at what price, and how fast —
          before you commit to anything.
        </p>
        <CustomButton variant="secondary" size="lg">
          Request a Quote
        </CustomButton>
      </Section>
    </div>
  );
}
