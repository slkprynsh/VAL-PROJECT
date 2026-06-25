'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { teamMembers } from '@/data/careers';
import { Target, Telescope, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20">

      {/* Hero */}
      <Section className="bg-white py-12 sm:py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Valtrix Advance Material Pvt. Ltd</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-4 sm:mb-6 leading-tight">
            We Source What Others{' '}
            <span className="gradient-text">Can&apos;t Find Fast Enough</span>
          </h1>
          <p className="text-base sm:text-xl text-[#6B7280] leading-relaxed">
            VAM VALTRIX was built by people who spent years watching manufacturers lose production time —
            not because materials didn&apos;t exist, but because the right ones couldn&apos;t be found,
            verified, and delivered fast enough.
          </p>
        </motion.div>
      </Section>

      {/* Mission / Vision / Values */}
      <Section className="bg-[#F8FAFB]">
        <SectionTitle subtitle="WHO WE ARE" title="What Drives Us" description="The principles behind every sourcing decision we make" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 mt-10 sm:mt-12 items-stretch">
          {[
            { title: 'Our Mission', Icon: Target,    description: 'To give every industrial manufacturer reliable access to the exact materials they need — at the right specification, from a verified source, and delivered when production demands it.' },
            { title: 'Our Vision',  Icon: Telescope, description: 'A world where supply chain friction never slows down what human ingenuity can build.' },
            { title: 'Our Values',  Icon: Zap,       description: 'Precision over approximation. Accountability over excuses. Long-term partnerships over transactional volume. Total transparency at every step.' },
          ].map((item, idx) => (
            <Reveal key={item.title} delay={idx * 0.15} className="h-full">
              <div className="relative h-full rounded-2xl border-2 border-[#D1F2F7] bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#17A2B8] to-[#0D7A8C]" />
                <div className="p-5 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#17A2B8]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#2C3E50] mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base">{item.description}</p>
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12">
          {teamMembers.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.1} direction="up">
              <motion.div whileHover={{ y: -8 }} className="group relative rounded-xl overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-48 sm:h-64 object-cover rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent rounded-xl flex flex-col justify-end p-3 sm:p-4 text-white">
                  <h3 className="font-bold text-sm sm:text-lg">{member.name}</h3>
                  <p className="text-[#D1F2F7] text-xs sm:text-sm mb-1">{member.role}</p>
                  <p className="text-xs text-white/70 hidden sm:block">{member.bio}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-[#F8FAFB]">
        <SectionTitle subtitle="OUR JOURNEY" title="Building VAM VALTRIX" description="Milestones in our growth" />
        <div className="mt-8 sm:mt-12 space-y-5 sm:space-y-6 max-w-3xl mx-auto">
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
                  <div className="w-4 h-4 rounded-full bg-[#17A2B8] ring-4 ring-[#D1F2F7] shrink-0" />
                  {idx < 6 && <div className="w-0.5 h-10 bg-[#D1F2F7]" />}
                </div>
                <div className="pb-2">
                  <p className="font-bold text-[#17A2B8]">{item.year}</p>
                  <p className="text-[#6B7280] text-sm sm:text-base">{item.event}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight px-4">Partner With a Supply Chain That&apos;s Built to Perform</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          Whether you need a single specialty alloy or a full multi-category sourcing partner, VAM VALTRIX delivers — on spec, on time, every time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <Link href="/contact" className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors min-h-[48px]">
            Request a Quote
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors min-h-[48px]">
            Talk to a Specialist
          </Link>
        </div>
      </Section>
    </div>
  );
}
