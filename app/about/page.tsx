'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { teamMembers } from '@/data/careers';
import { Target, Telescope, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <Section className="bg-white py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Advance Material Pvt. Ltd</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            We Source What Others{' '}
            <span className="gradient-text">Can&apos;t Find Fast Enough</span>
          </h1>
          <p className="text-xl text-[#6B7280] leading-relaxed">
            VAM VALTRIX was built by people who spent years watching manufacturers lose production time —
            not because materials didn&apos;t exist, but because the right ones couldn&apos;t be found,
            verified, and delivered fast enough.
          </p>
        </motion.div>
      </Section>

      {/* Mission / Vision / Values */}
      <Section className="bg-[#F8FAFB]">
        <SectionTitle subtitle="WHO WE ARE" title="What Drives Us" description="The principles behind every sourcing decision we make" />
        <div className="grid md:grid-cols-3 gap-8 mt-12 items-stretch">
          {[
            { title: 'Our Mission', Icon: Target, description: 'To give every industrial manufacturer reliable access to the exact materials they need — at the right specification, from a verified source, and delivered when production demands it.' },
            { title: 'Our Vision',  Icon: Telescope, description: 'A world where supply chain friction never slows down what human ingenuity can build.' },
            { title: 'Our Values',  Icon: Zap, description: 'Precision over approximation. Accountability over excuses. Long-term partnerships over transactional volume. Total transparency at every step.' },
          ].map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.15} className="h-full">
              <div className="relative h-full rounded-2xl border-2 border-[#D1F2F7] bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#17A2B8] to-[#0D7A8C]" />
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.Icon className="w-6 h-6 text-[#17A2B8]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{item.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#17A2B8] to-[#0D7A8C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-white">
        <SectionTitle subtitle="OUR TEAM" title="Meet the Leaders" description="The operators, engineers, and sourcing specialists behind VAM VALTRIX (Illustrative profiles)" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {teamMembers.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1} direction="up">
              <motion.div whileHover={{ y: -8 }} className="group relative rounded-xl overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent rounded-xl flex flex-col justify-end p-4 text-white">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-[#D1F2F7] text-sm mb-1">{member.role}</p>
                  <p className="text-xs text-white/70">{member.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-[#F8FAFB]">
        <SectionTitle subtitle="OUR JOURNEY" title="Building VAM VALTRIX" description="Milestones in our growth" />
        <div className="mt-12 space-y-6 max-w-3xl mx-auto">
          {[
            { year: '2018', event: 'Founded in response to a widespread alloy shortage that idled four major industrial clients' },
            { year: '2019', event: 'Built the first version of the supplier verification network (42 suppliers at launch)' },
            { year: '2020', event: 'Expanded into polymer and composite categories; launched real-time order tracking' },
            { year: '2021', event: 'Crossed 1,000 active manufacturer clients; opened logistics hub' },
            { year: '2022', event: 'Launched specialty coatings and chemical supply category' },
            { year: '2023', event: 'Introduced the Compliance Layer — automated spec-matching and cert validation' },
            { year: '2024', event: '320+ verified suppliers, 18,000+ SKUs, operations in 60+ countries' },
          ].map((item, idx) => (
            <Reveal key={item.year} delay={idx * 0.08}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#17A2B8] ring-4 ring-[#D1F2F7]" />
                  {idx < 6 && <div className="w-0.5 h-10 bg-[#D1F2F7]" />}
                </div>
                <div className="pb-2">
                  <p className="font-bold text-[#17A2B8]">{item.year}</p>
                  <p className="text-[#6B7280]">{item.event}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Partner With a Supply Chain That&apos;s Built to Perform</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you need a single specialty alloy or a full multi-category sourcing partner, VAM VALTRIX delivers — on spec, on time, every time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="px-8 py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors">
            Request a Quote
          </Link>
          <Link href="/contact" className="px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
            Talk to a Specialist
          </Link>
        </div>
      </Section>
    </div>
  );
}
