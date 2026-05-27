'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Building2, Factory, Cpu, Shield, Package, Wrench } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    icon: Factory,
    title: 'Structural Fabrication & Steel Construction',
    description: "The tolerances don't move. Neither do our delivery commitments. VAM VALTRIX sources structural steel, rebar, plate, and specialty fasteners with full mill cert documentation.",
    benefits: ['Full mill cert documentation', 'Structural steel & rebar', 'Specialty fasteners', 'Project-driven lead times'],
  },
  {
    icon: Wrench,
    title: 'Automotive & Precision Component Manufacturing',
    description: 'Tight tolerances, complex alloy requirements, and JIT pressure define auto supply chains. VAM VALTRIX keeps your line fed with the right-grade metals and polymer compounds.',
    benefits: ['JIT delivery support', 'Right-grade metal sourcing', 'Polymer compounds', 'Tolerance-matched specs'],
  },
  {
    icon: Building2,
    title: 'Industrial Equipment & Heavy Machinery',
    description: 'Long-run castings, wear-resistant materials, and high-temp alloys need suppliers who understand engineering requirements — not just catalog numbers.',
    benefits: ['Wear-resistant materials', 'High-temp alloys', 'Engineering-grade sourcing', 'Long-run casting support'],
  },
  {
    icon: Cpu,
    title: 'Electronics & Electrical Systems Manufacturing',
    description: 'Board substrates, enclosure polymers, thermally conductive compounds, and specialty coatings — all sourced with RoHS and REACH compliance documentation baked in.',
    benefits: ['RoHS & REACH compliance', 'Board substrates', 'Thermally conductive compounds', 'Specialty coatings'],
  },
  {
    icon: Shield,
    title: 'Defense & Aerospace Tier Suppliers',
    description: 'DFARS-compliant material sourcing, conflict minerals documentation, and traceability from melt to delivery for Tier 2 and Tier 3 suppliers.',
    benefits: ['DFARS-compliant sourcing', 'Conflict minerals (CMRT)', 'Melt-to-delivery traceability', 'Tier 2 & 3 support'],
  },
  {
    icon: Package,
    title: 'Packaging & Industrial Plastics',
    description: 'High-volume polymer sourcing with consistent lot traceability, FDA-compliant options, and the flexibility to scale volumes up or down.',
    benefits: ['Consistent lot traceability', 'FDA-compliant options', 'Scalable volume flexibility', 'High-volume polymer sourcing'],
  },
];

export default function IndustriesPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <Section className="bg-white py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Industries We Serve</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            We Know Your Industry&apos;s Materials —{' '}
            <span className="gradient-text">Not Just Your Category</span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Purpose-built sourcing for the industries where material quality, compliance, and delivery timing are non-negotiable.
          </p>
        </motion.div>
      </Section>

      {/* Industries Grid */}
      <Section className="bg-[#F8FAFB]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.title} delay={idx * 0.1} direction="up">
                <motion.div whileHover={{ y: -4 }} className="h-full bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300 group flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center mb-5 group-hover:bg-[#17A2B8] transition-colors duration-300">
                    <Icon size={28} className="text-[#17A2B8] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-3 group-hover:text-[#17A2B8] transition-colors">{industry.title}</h3>
                  <p className="text-[#6B7280] text-sm mb-5 flex-1 leading-relaxed">{industry.description}</p>
                  <div className="space-y-2">
                    {industry.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#17A2B8] shrink-0" />
                        <span className="text-sm text-[#6B7280]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Case Studies */}
      <Section className="bg-white">
        <SectionTitle subtitle="CLIENT RESULTS" title="Industry Leaders Choose VAM VALTRIX" />
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { company: 'PrecisionFab Industries',      industry: 'Structural Fabrication', result: '61% faster specialty steel sourcing',          savings: 'Line idle time cut from 8 days to under 3' },
            { company: 'PolyForm Manufacturing',       industry: 'Industrial Plastics',    result: '74% less admin overhead per order',             savings: 'Eliminated two recurring compliance audit failures' },
            { company: 'HeavyBuild Construction',      industry: 'Construction',           result: 'Zero compliance gaps across 6 project sites',   savings: 'Passed federal audit without remediation' },
            { company: 'ArcMetal Components',          industry: 'Precision Manufacturing',result: '43% reduction in spot-buy emergency spend',     savings: 'Predictive reorder eliminated sourcing emergencies' },
          ].map((cs, idx) => (
            <Reveal key={cs.company} delay={idx * 0.1}>
              <motion.div whileHover={{ y: -3 }} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300">
                <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-1">{cs.industry}</p>
                <h3 className="text-lg font-bold text-[#2C3E50] mb-4">{cs.company}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider mb-1">Key Result</p>
                    <p className="font-semibold text-[#17A2B8]">{cs.result}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wider mb-1">Operational Impact</p>
                    <p className="font-semibold text-[#2C3E50]">{cs.savings}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Tell Us What You Build — We&apos;ll Source What You Need</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Send us your spec requirements and a VAM VALTRIX sourcing specialist will respond with verified options, pricing, and lead times.
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
