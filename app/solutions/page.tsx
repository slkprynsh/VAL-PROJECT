'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { solutions } from '@/data/solutions';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const productImages: Record<string, string> = {
  'metals-alloys':          '/placeholder.jpg',
  'polymers-composites':    '/placeholder.jpg',
  'coatings-chemicals':     '/placeholder.jpg',
  'compliance-certs':       '/placeholder.jpg',
  'multi-site-fulfillment': '/placeholder.jpg',
  'predictive-reorder':     '/placeholder.jpg',
};

const productDetails: Record<string, { overview: string; specs: string[]; applications: string[] }> = {
  'metals-alloys': {
    overview: 'Our metals & alloys sourcing covers the full spectrum of industrial-grade materials — from standard carbon steel to exotic titanium alloys. Every SKU comes with full mill certification and traceable heat numbers.',
    specs: ['Carbon Steel (A36, A572)', 'Stainless Steel (304, 316, 17-4PH)', 'Aluminum (6061, 7075)', 'Titanium (Grade 2, Grade 5)', 'Nickel Alloys (Inconel, Hastelloy)'],
    applications: ['Structural fabrication', 'Aerospace components', 'Automotive parts', 'Pressure vessels'],
  },
  'polymers-composites': {
    overview: 'Engineering-grade thermoplastics and high-performance fiber-reinforced composites sourced from verified manufacturers with full spec documentation.',
    specs: ['PEEK, PPS, PTFE', 'Carbon Fiber Reinforced Polymer', 'Glass Fiber Composites', 'Kevlar / Aramid', 'HDPE, UHMWPE'],
    applications: ['Aerospace structures', 'Automotive body panels', 'Marine components', 'Industrial machinery'],
  },
  'coatings-chemicals': {
    overview: 'Industrial coatings, adhesives, sealants, and process chemicals from certified manufacturers — all with SDS documentation and compliance flags built in.',
    specs: ['Epoxy coatings', 'Polyurethane topcoats', 'Thermal barrier coatings', 'Anti-corrosion primers', 'Industrial adhesives'],
    applications: ['Pipeline protection', 'Structural steel', 'Marine environments', 'High-temp equipment'],
  },
  'compliance-certs': {
    overview: 'Automated cert validation, conflict minerals reporting, REACH/RoHS flagging, and DFARS tracking — all managed in one place so your audits are always ready.',
    specs: ['ISO 9001 documentation', 'REACH / RoHS compliance', 'DFARS material tracking', 'Conflict minerals (CMRT)', 'Mill test reports'],
    applications: ['Defense supply chains', 'Electronics manufacturing', 'Medical devices', 'Aerospace Tier suppliers'],
  },
  'multi-site-fulfillment': {
    overview: 'Coordinates split fulfillment, site-specific delivery scheduling, and unified invoicing across all your locations under a single account.',
    specs: ['Split shipment coordination', 'Site-specific delivery windows', 'Unified invoicing', 'Multi-location tracking', 'Single account dashboard'],
    applications: ['National manufacturers', 'Construction project sites', 'Global OEMs', 'Distributed warehouses'],
  },
  'predictive-reorder': {
    overview: 'Connect your production schedule to your procurement cadence — before a shortage hits your floor. Consumption-based alerts and reorder planning built in.',
    specs: ['Consumption-based alerts', 'Production schedule sync', 'Shortage risk flagging', 'Reorder cadence planning', 'Inventory intelligence dashboard'],
    applications: ['High-turnover production lines', 'JIT manufacturing', 'Seasonal demand planning', 'MRO management'],
  },
};

export default function SolutionsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const activeSolution = solutions.find((s) => s.id === selected);
  const activeDetails  = selected ? productDetails[selected] : null;
  const activeImage    = selected ? productImages[selected] : null;

  return (
    <div className="pt-16 sm:pt-20">

      {/* Hero */}
      <Section className="bg-white py-12 sm:py-16 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Our Product Range</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] mb-4 sm:mb-6 leading-tight">
            One Platform. Every Material.{' '}
            <span className="gradient-text">Full Visibility.</span>
          </h1>
          <p className="text-base sm:text-xl text-[#6B7280]">
            Click any product below to explore full details, specifications, and applications.
          </p>
        </motion.div>
      </Section>

      {/* Main: List + Detail */}
      <Section className="bg-[#F8FAFB]" id="solutions">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── Left: Product List ── */}
          <div className="lg:w-80 shrink-0">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3 sm:mb-4">Select a Product</p>
            {/* Mobile: horizontal scroll row; Desktop: vertical stack */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 lg:space-y-0 snap-x snap-mandatory lg:snap-none">
              {solutions.map((solution, idx) => {
                const Icon = solution.icon;
                const isActive = selected === solution.id;
                return (
                  <Reveal key={solution.id} delay={idx * 0.07}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setSelected(isActive ? null : solution.id)}
                      className={`w-64 lg:w-full shrink-0 snap-start text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden group ${
                        isActive
                          ? 'border-[#17A2B8] bg-white shadow-md'
                          : 'border-gray-100 bg-white hover:border-[#D1F2F7] hover:shadow-sm'
                      }`}
                    >
                      {/* Card image strip */}
                      <div className={`relative h-24 sm:h-28 overflow-hidden ${isActive ? 'bg-gradient-to-br from-[#17A2B8] to-[#0D7A8C]' : 'bg-gradient-to-br from-[#2C3E50] to-[#17A2B8]'}`}>
                        <img src={productImages[solution.id]} alt={solution.title} className="w-full h-full object-cover mix-blend-overlay opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-white' : 'bg-white/20'}`}>
                            <Icon size={20} className={isActive ? 'text-[#17A2B8]' : 'text-white'} />
                          </div>
                        </div>
                      </div>
                      {/* Card text */}
                      <div className="p-3 sm:p-4 flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className={`font-semibold text-sm ${isActive ? 'text-[#17A2B8]' : 'text-[#2C3E50]'}`}>{solution.title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-1">{solution.description}</p>
                        </div>
                        <ArrowRight size={16} className={`shrink-0 ml-2 transition-transform duration-200 ${isActive ? 'text-[#17A2B8] translate-x-1' : 'text-gray-300 group-hover:text-[#17A2B8]'}`} />
                      </div>
                    </motion.button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* ── Right: Detail Panel ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[300px] sm:min-h-[400px] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 sm:p-12"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E6F7FA] flex items-center justify-center mb-4">
                    <ArrowLeft size={22} className="text-[#17A2B8]" />
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-[#2C3E50] mb-2">Select a product</p>
                  <p className="text-sm text-[#6B7280]">Click any product card to view full details, specs, and applications.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* ── Top block: Details left, Photo right ── */}
                  <div className="bg-white rounded-2xl border-2 border-[#D1F2F7] overflow-hidden shadow-sm">
                    <div className="grid md:grid-cols-2">
                      {/* Left: Product info */}
                      <div className="p-5 sm:p-8 border-b md:border-b-0 md:border-r border-[#E6F7FA]">
                        <div className="flex items-center gap-3 mb-4 sm:mb-5">
                          {activeSolution && (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                              <activeSolution.icon size={20} className="text-[#17A2B8]" />
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider">Product Details</p>
                            <h2 className="text-lg sm:text-xl font-bold text-[#2C3E50]">{activeSolution?.title}</h2>
                          </div>
                        </div>
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-4 sm:mb-5">{activeDetails?.overview}</p>
                        <div className="space-y-2">
                          {activeSolution?.features.map((f) => (
                            <div key={f} className="flex items-center gap-2">
                              <CheckCircle size={14} className="text-[#17A2B8] shrink-0" />
                              <span className="text-sm text-[#2C3E50]">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Right: Photo */}
                      <div className="relative h-48 sm:h-56 md:h-auto bg-gradient-to-br from-[#2C3E50] to-[#17A2B8]">
                        <img src={activeImage!} alt={activeSolution?.title} className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                        <div className="absolute inset-0 flex items-end p-4 sm:p-5">
                          <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">Product Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Bottom block: Photo left, Specs right ── */}
                  <div className="bg-white rounded-2xl border-2 border-[#D1F2F7] overflow-hidden shadow-sm">
                    <div className="grid md:grid-cols-2">
                      {/* Left: Photo */}
                      <div className="relative h-48 sm:h-56 md:h-auto bg-gradient-to-br from-[#17A2B8] to-[#0D7A8C] order-2 md:order-1">
                        <img src={activeImage!} alt="Application" className="w-full h-full object-cover mix-blend-overlay opacity-40" />
                        <div className="absolute inset-0 flex items-end p-4 sm:p-5">
                          <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">Application Photo</span>
                        </div>
                      </div>
                      {/* Right: Specs + Applications */}
                      <div className="p-5 sm:p-8 order-1 md:order-2 border-b md:border-b-0 md:border-l border-[#E6F7FA]">
                        <div className="mb-5 sm:mb-6">
                          <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-3">Specifications</p>
                          <div className="space-y-2">
                            {activeDetails?.specs.map((spec) => (
                              <div key={spec} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFB] border border-gray-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#17A2B8] shrink-0" />
                                <span className="text-sm text-[#2C3E50]">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-3">Applications</p>
                          <div className="flex flex-wrap gap-2">
                            {activeDetails?.applications.map((app) => (
                              <span key={app} className="px-3 py-1 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] text-xs font-medium text-[#2C3E50]">
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Link href="/contact" className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#17A2B8] text-white text-sm font-semibold hover:bg-[#0D7A8C] transition-colors min-h-[44px]">
                          Request a Quote <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section className="bg-white">
        <SectionTitle subtitle="PROVEN RESULTS" title="What You Can Expect" description="Numbers from manufacturers already running on VAM VALTRIX" />
        <div className="mt-8 sm:mt-12 space-y-4 max-w-3xl mx-auto">
          {[
            { benefit: '38% Average Lead Time Reduction',            description: 'Procurement cycles cut from weeks to days across metals, polymers, and coatings.' },
            { benefit: '97.4% On-Time Fulfillment Rate',             description: 'Earned across 99,000+ orders — not a marketing number.' },
            { benefit: '360° End-to-End Order Visibility',           description: 'From quote to delivery, every step is tracked and documented in your account.' },
            { benefit: '<4 hrs Average Response on Custom Requests', description: 'When you need something outside the catalog, our sourcing team moves fast.' },
          ].map((item, idx) => (
            <Reveal key={item.benefit} delay={idx * 0.1} direction="left">
              <motion.div whileHover={{ x: 6 }} className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-[#D1F2F7] hover:shadow-sm transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#E6F7FA] rounded-xl shrink-0">
                  <span className="text-[#17A2B8] font-bold text-base sm:text-lg">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2C3E50] mb-1 text-sm sm:text-base">{item.benefit}</h3>
                  <p className="text-[#6B7280] text-sm">{item.description}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">Get Started With a No-Commitment Sourcing Request</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Tell us what you need. We&apos;ll show you what we can source, at what price, and how fast — before you commit to anything.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors min-h-[48px]">
          Request a Quote <ArrowRight size={18} />
        </Link>
      </Section>
    </div>
  );
}
