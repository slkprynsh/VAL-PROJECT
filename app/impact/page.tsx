'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { Counter } from '@/components/animations/counter';
import { Clock, Package, TrendingDown, Globe, Network, DollarSign } from 'lucide-react';

const impactMetrics = [
  {
    icon: Clock,
    label: 'Production Hours Recovered',
    value: 1200000,
    suffix: '+',
    color: 'text-teal-600',
  },
  {
    icon: Package,
    label: 'Material Orders Fulfilled',
    value: 99000,
    suffix: '+',
    color: 'text-blue-600',
  },
  {
    icon: TrendingDown,
    label: 'Avg Reduction in Procurement Lead Time',
    value: 38,
    suffix: '%',
    color: 'text-cyan-600',
  },
  {
    icon: Globe,
    label: 'Countries Served',
    value: 60,
    suffix: '+',
    color: 'text-green-600',
  },
  {
    icon: Network,
    label: 'Verified Suppliers in Network',
    value: 320,
    suffix: '+',
    color: 'text-purple-600',
  },
  {
    icon: DollarSign,
    label: 'Client Procurement Spend Managed',
    value: 420,
    suffix: 'M+',
    color: 'text-orange-600',
  },
];

export default function ImpactPage() {
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
            Less Downtime. More Output. <span className="gradient-text">Measurable Results.</span>
          </h1>
          <p className="text-xl text-gray-600">
            The numbers behind what VALTRIX delivers for industrial manufacturers — on the floor,
            not in a slide deck.
          </p>
        </motion.div>
      </Section>

      {/* Impact Metrics */}
      <Section className="bg-white py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {impactMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Reveal key={metric.label} delay={idx * 0.1} direction="up">
                <GlassCard variant="light" className="text-center backdrop-blur-lg p-8">
                  <div className="p-4 rounded-lg bg-opacity-20 w-fit mx-auto mb-6">
                    <Icon size={32} className={metric.color} />
                  </div>
                  <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                    <Counter end={metric.value} duration={2} suffix={metric.suffix} />
                  </div>
                  <p className="text-gray-700 font-medium">{metric.label}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Company Stories */}
      <Section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <SectionTitle
          subtitle="CLIENT RESULTS"
          title="What Happens When Supply Chain Works"
          description="Real outcomes from manufacturers who switched to VALTRIX"
        />

        <div className="mt-12 space-y-8 max-w-4xl mx-auto">
          {[
            {
              company: 'PrecisionFab Industries',
              story:
                'A Midwest metal fabricator cut sourcing time for specialty steel by 61% after switching to VALTRIX, reducing line idle time from an average of 8 days to under 3.',
              impact: '61% faster specialty steel sourcing',
              savings: 'Line idle time: 8 days → under 3',
            },
            {
              company: 'PolyForm Manufacturing',
              story:
                'Consolidated 11 separate polymer suppliers into a single VALTRIX account, reducing per-order admin overhead by 74% and eliminating two recurring compliance audit failures.',
              impact: '74% less admin overhead per order',
              savings: 'Zero recurring compliance failures',
            },
            {
              company: 'HeavyBuild Construction Systems',
              story:
                'Sourced certified structural composites across 6 project sites simultaneously using VALTRIX\'s multi-location fulfillment, with zero documentation gaps on a federal compliance audit.',
              impact: 'Zero compliance gaps across 6 sites',
              savings: 'Passed federal audit without remediation',
            },
            {
              company: 'ArcMetal Components',
              story:
                'Reduced emergency spot-buy spending by 43% year-over-year by working with VALTRIX to establish a predictive reorder cadence tied to their production schedule.',
              impact: '43% reduction in spot-buy spend',
              savings: 'Predictive reorder eliminated emergency sourcing',
            },
          ].map((story, idx) => (
            <Reveal key={story.company} delay={idx * 0.1} direction="left">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 border border-gray-200 rounded-xl hover:border-teal-600 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{story.company}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{story.story}</p>
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-sm font-semibold text-teal-600 mb-1">KEY RESULT</p>
                    <p className="text-lg font-bold text-gray-900">{story.impact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-teal-600 mb-1">OPERATIONAL IMPACT</p>
                    <p className="text-lg font-bold text-gray-900">{story.savings}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Standards Alignment */}
      <Section className="bg-white py-16">
        <SectionTitle
          subtitle="COMPLIANCE STANDARDS"
          title="Built for Regulated Industries"
          description="Every order is backed by the documentation your auditors expect"
        />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            'ISO 9001',
            'REACH Compliance',
            'RoHS Compliance',
            'ASTM Standards',
            'MIL-SPEC Support',
            'Conflict Minerals (CMRT)',
            'DFARS Material Compliance',
            'Custom Cert Requests',
          ].map((standard, idx) => (
            <Reveal key={standard} delay={idx * 0.05} direction="up">
              <GlassCard variant="light" className="text-center p-6">
                <p className="font-semibold text-gray-900">{standard}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Commitment Section */}
      <Section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <SectionTitle subtitle="OUR COMMITMENT" title="Where We're Headed" />

        <div className="mt-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              By 2027, VALTRIX aims to eliminate avoidable supply disruptions for 10,000
              manufacturing facilities worldwide — by making verified, spec-matched material
              sourcing as fast and reliable as any other part of the production process.
            </p>
            <div className="pt-8">
              <div className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold">
                Start a sourcing request →
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
