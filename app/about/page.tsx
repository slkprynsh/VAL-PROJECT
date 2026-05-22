'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { Reveal } from '@/components/animations/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { teamMembers } from '@/data/careers';

export default function AboutPage() {
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
            We Source What Others{' '}
            <span className="gradient-text">Can&apos;t Find Fast Enough</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            VALTRIX was built by people who spent years watching manufacturers lose production time
            not because materials didn&apos;t exist — but because the right ones couldn&apos;t be found,
            verified, and delivered fast enough. We built the infrastructure to change that.
          </p>
        </motion.div>
      </Section>

      {/* Mission & Values */}
      <Section className="bg-gradient-to-b from-white to-gray-50">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Our Mission',
              description:
                'To give every industrial manufacturer reliable access to the exact materials they need — at the right specification, from a verified source, and delivered when production demands it.',
            },
            {
              title: 'Our Vision',
              description:
                'A world where supply chain friction never slows down what human ingenuity can build.',
            },
            {
              title: 'Our Values',
              description:
                'Precision over approximation. Accountability over excuses. Long-term partnerships over transactional volume. And total transparency at every step of the supply chain.',
            },
          ].map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.1}>
              <GlassCard variant="light" className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team Section */}
      <Section className="bg-white">
        <SectionTitle
          subtitle="OUR TEAM"
          title="Meet the Leaders"
          description="The operators, engineers, and sourcing specialists who built VALTRIX"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {teamMembers.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative rounded-xl overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex flex-col justify-end p-4 text-white">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-teal-300 text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-gray-200">{member.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-gray-50">
        <SectionTitle
          subtitle="OUR JOURNEY"
          title="Building VALTRIX"
          description="Milestones in our growth"
        />

        <div className="mt-12 space-y-8 max-w-3xl mx-auto">
          {[
            { year: '2018', event: 'Founded in response to a widespread alloy shortage that idled four major industrial clients' },
            { year: '2019', event: 'Built the first version of the VALTRIX supplier verification network (42 suppliers at launch)' },
            { year: '2020', event: 'Expanded into polymer and composite categories; launched real-time order tracking' },
            { year: '2021', event: 'Crossed 1,000 active manufacturer clients; opened logistics hub in the Midwest' },
            { year: '2022', event: 'Launched specialty coatings and chemical supply category' },
            { year: '2023', event: 'Introduced the VALTRIX Compliance Layer — automated spec-matching and cert validation' },
            { year: '2024', event: '320+ verified suppliers, 18,000+ SKUs, operations in 60+ countries' },
          ].map((item, idx) => (
            <Reveal key={item.year} delay={idx * 0.1}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-teal-600 ring-4 ring-teal-200" />
                  {idx < 6 && <div className="w-1 h-12 bg-teal-200" />}
                </div>
                <div className="pb-4">
                  <p className="font-bold text-teal-600">{item.year}</p>
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Partner With a Supply Chain That&apos;s Built to Perform</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Whether you need a single specialty alloy or a full multi-category sourcing partner,
          VALTRIX is built to deliver — on spec, on time, every time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButton variant="secondary" size="lg">
            Request a Quote
          </CustomButton>
          <CustomButton
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Talk to a Sourcing Specialist
          </CustomButton>
        </div>
      </Section>
    </div>
  );
}
