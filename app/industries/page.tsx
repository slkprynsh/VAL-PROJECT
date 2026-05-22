'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { Reveal } from '@/components/animations/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { Building2, Factory, Cpu, Shield, Package, Wrench } from 'lucide-react';

const industries = [
  {
    icon: Factory,
    title: 'Structural Fabrication & Steel Construction',
    description:
      'The tolerances don\'t move. Neither do our delivery commitments. VALTRIX sources structural steel, rebar, plate, and specialty fasteners with full mill cert documentation and predictable lead times for project-driven schedules.',
    benefits: [
      'Full mill cert documentation',
      'Structural steel & rebar',
      'Specialty fasteners',
      'Project-driven lead times',
    ],
  },
  {
    icon: Wrench,
    title: 'Automotive & Precision Component Manufacturing',
    description:
      'Tight tolerances, complex alloy requirements, and JIT pressure define auto supply chains. VALTRIX keeps your line fed with the right-grade metals and polymer compounds without the scheduling chaos.',
    benefits: [
      'JIT delivery support',
      'Right-grade metal sourcing',
      'Polymer compounds',
      'Tolerance-matched specs',
    ],
  },
  {
    icon: Building2,
    title: 'Industrial Equipment & Heavy Machinery',
    description:
      'Long-run castings, wear-resistant materials, and high-temp alloys need suppliers who understand engineering requirements — not just catalog numbers. VALTRIX bridges the gap between spec sheet and delivery.',
    benefits: [
      'Wear-resistant materials',
      'High-temp alloys',
      'Engineering-grade sourcing',
      'Long-run casting support',
    ],
  },
  {
    icon: Cpu,
    title: 'Electronics & Electrical Systems Manufacturing',
    description:
      'Board substrates, enclosure polymers, thermally conductive compounds, and specialty coatings — all sourced with RoHS and REACH compliance documentation baked in.',
    benefits: [
      'RoHS & REACH compliance',
      'Board substrates',
      'Thermally conductive compounds',
      'Specialty coatings',
    ],
  },
  {
    icon: Shield,
    title: 'Defense & Aerospace Tier Suppliers',
    description:
      'DFARS-compliant material sourcing, conflict minerals documentation, and traceability from melt to delivery. VALTRIX supports Tier 2 and Tier 3 suppliers who need to meet prime contractor requirements without standing up a full compliance department.',
    benefits: [
      'DFARS-compliant sourcing',
      'Conflict minerals (CMRT)',
      'Melt-to-delivery traceability',
      'Tier 2 & 3 support',
    ],
  },
  {
    icon: Package,
    title: 'Packaging & Industrial Plastics',
    description:
      'High-volume polymer sourcing with consistent lot traceability, FDA-compliant options, and the flexibility to scale volumes up or down without renegotiating supplier terms from scratch.',
    benefits: [
      'Consistent lot traceability',
      'FDA-compliant options',
      'Scalable volume flexibility',
      'High-volume polymer sourcing',
    ],
  },
];

export default function IndustriesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <Section className="py-24 bg-gradient-to-b from-teal-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
            We Know Your Industry&apos;s Materials —{' '}
            <span className="gradient-text">Not Just Your Category</span>
          </h1>
          <p className="text-xl text-gray-600">
            Purpose-built sourcing for the industries where material quality, compliance, and
            delivery timing are non-negotiable.
          </p>
        </motion.div>
      </Section>

      {/* Industries Grid */}
      <Section className="bg-white py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.title} delay={idx * 0.1} direction="up">
                <GlassCard variant="light" className="flex flex-col h-full">
                  <div className="p-4 rounded-lg bg-teal-100 w-fit mb-6">
                    <Icon size={32} className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{industry.title}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{industry.description}</p>
                  <div className="space-y-2 mb-6">
                    {industry.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0 mt-2" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <CustomButton variant="outline" size="sm" className="w-full">
                    Learn More
                  </CustomButton>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Case Studies */}
      <Section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <SectionTitle
          subtitle="CLIENT RESULTS"
          title="Industry Leaders Choose VALTRIX"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              company: 'PrecisionFab Industries',
              industry: 'Structural Fabrication',
              result: '61% faster specialty steel sourcing',
              savings: 'Line idle time cut from 8 days to under 3',
            },
            {
              company: 'PolyForm Manufacturing',
              industry: 'Industrial Plastics',
              result: '74% less admin overhead per order',
              savings: 'Eliminated two recurring compliance audit failures',
            },
            {
              company: 'HeavyBuild Construction Systems',
              industry: 'Construction',
              result: 'Zero compliance gaps across 6 simultaneous project sites',
              savings: 'Passed federal audit without remediation',
            },
            {
              company: 'ArcMetal Components',
              industry: 'Precision Manufacturing',
              result: '43% reduction in spot-buy emergency spend',
              savings: 'Predictive reorder eliminated sourcing emergencies',
            },
          ].map((caseStudy, idx) => (
            <Reveal key={caseStudy.company} delay={idx * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 border border-gray-200 rounded-xl hover:border-teal-600 hover:shadow-lg transition-all"
              >
                <p className="text-sm font-semibold text-teal-600 mb-1">{caseStudy.industry}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{caseStudy.company}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">KEY RESULT</p>
                    <p className="font-semibold text-teal-600">{caseStudy.result}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">OPERATIONAL IMPACT</p>
                    <p className="font-semibold text-gray-900">{caseStudy.savings}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">
          Tell Us What You Build — We&apos;ll Source What You Need
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Send us your spec requirements and a VALTRIX sourcing specialist will respond with
          verified options, pricing, and lead times.
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
            Talk to a Specialist
          </CustomButton>
        </div>
      </Section>
    </div>
  );
}
