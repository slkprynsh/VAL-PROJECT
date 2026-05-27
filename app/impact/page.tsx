'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Counter } from '@/components/animations/counter';
import { Clock, Package, TrendingDown, Globe, Network, DollarSign } from 'lucide-react';
import Link from 'next/link';

const impactMetrics = [
  { icon: Clock,       label: 'Production Hours Recovered',            value: 1200000, suffix: '+' },
  { icon: Package,     label: 'Material Orders Fulfilled',             value: 99000,   suffix: '+' },
  { icon: TrendingDown,label: 'Avg Reduction in Procurement Lead Time',value: 38,      suffix: '%' },
  { icon: Globe,       label: 'Countries Served',                      value: 60,      suffix: '+' },
  { icon: Network,     label: 'Verified Suppliers in Network',         value: 320,     suffix: '+' },
  { icon: DollarSign,  label: 'Client Procurement Spend Managed',      value: 420,     suffix: 'M+'},
];

export default function ImpactPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <Section className="bg-white py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Measurable Results</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            Less Downtime. More Output.{' '}
            <span className="gradient-text">Measurable Results.</span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            The numbers behind what VAM VALTRIX delivers for industrial manufacturers — on the floor, not in a slide deck.
          </p>
        </motion.div>
      </Section>

      {/* Metrics */}
      <Section className="bg-[#F8FAFB]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Reveal key={metric.label} delay={idx * 0.1} direction="up">
                <motion.div whileHover={{ y: -6 }} className="h-full bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#17A2B8]" />
                  </div>
                  <div className="text-4xl font-bold text-[#2C3E50] mb-2">
                    <Counter end={metric.value} duration={2} suffix={metric.suffix} />
                  </div>
                  <p className="text-[#6B7280] font-medium text-sm">{metric.label}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Stories */}
      <Section className="bg-white">
        <SectionTitle subtitle="CLIENT RESULTS" title="What Happens When Supply Chain Works" description="Real outcomes from manufacturers who switched to VAM VALTRIX" />
        <div className="mt-12 space-y-6 max-w-4xl mx-auto">
          {[
            { company: 'PrecisionFab Industries', story: 'A Midwest metal fabricator cut sourcing time for specialty steel by 61% after switching to VAM VALTRIX, reducing line idle time from an average of 8 days to under 3.', impact: '61% faster specialty steel sourcing', savings: 'Line idle time: 8 days → under 3' },
            { company: 'PolyForm Manufacturing',  story: 'Consolidated 11 separate polymer suppliers into a single VAM VALTRIX account, reducing per-order admin overhead by 74% and eliminating two recurring compliance audit failures.', impact: '74% less admin overhead per order', savings: 'Zero recurring compliance failures' },
            { company: 'HeavyBuild Construction', story: "Sourced certified structural composites across 6 project sites simultaneously using VAM VALTRIX's multi-location fulfillment, with zero documentation gaps on a federal compliance audit.", impact: 'Zero compliance gaps across 6 sites', savings: 'Passed federal audit without remediation' },
            { company: 'ArcMetal Components',     story: 'Reduced emergency spot-buy spending by 43% year-over-year by working with VAM VALTRIX to establish a predictive reorder cadence tied to their production schedule.', impact: '43% reduction in spot-buy spend', savings: 'Predictive reorder eliminated emergency sourcing' },
          ].map((story, idx) => (
            <Reveal key={story.company} delay={idx * 0.1} direction="left">
              <motion.div whileHover={{ x: 4 }} className="p-8 rounded-2xl border-2 border-gray-100 hover:border-[#D1F2F7] hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{story.company}</h3>
                <p className="text-[#6B7280] mb-5 leading-relaxed">{story.story}</p>
                <div className="grid md:grid-cols-2 gap-4 pt-5 border-t border-gray-100">
                  <div>
                    <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-1">Key Result</p>
                    <p className="font-bold text-[#2C3E50]">{story.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-1">Operational Impact</p>
                    <p className="font-bold text-[#2C3E50]">{story.savings}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Compliance Standards */}
      <Section className="bg-[#F8FAFB]">
        <SectionTitle subtitle="COMPLIANCE STANDARDS" title="Built for Regulated Industries" description="Every order is backed by the documentation your auditors expect" />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {['ISO 9001', 'REACH Compliance', 'RoHS Compliance', 'ASTM Standards', 'MIL-SPEC Support', 'Conflict Minerals (CMRT)', 'DFARS Compliance', 'Custom Cert Requests'].map((standard, idx) => (
            <Reveal key={standard} delay={idx * 0.05} direction="up">
              <div className="text-center p-5 rounded-2xl bg-white border-2 border-[#D1F2F7] hover:border-[#17A2B8] hover:shadow-sm transition-all duration-200">
                <p className="font-semibold text-[#2C3E50] text-sm">{standard}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Where We&apos;re Headed</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          By 2027, VAM VALTRIX aims to eliminate avoidable supply disruptions for 10,000 manufacturing facilities worldwide — by making verified, spec-matched material sourcing as fast and reliable as any other part of the production process.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors">
          Start a Sourcing Request →
        </Link>
      </Section>
    </div>
  );
}
