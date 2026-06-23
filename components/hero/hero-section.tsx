'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/ui/modal';
import { ArrowRight, CheckCircle, Users, Globe2, Clock, Shield, Truck, Zap, BarChart3, Play, CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';

const carouselSlides = [
  {
    // compositematerials.jpg — autoclave composite development facility, carbon fiber layup
    image: '/compositematerials.jpg',
    label: 'Composite Materials',
    caption: 'Carbon fiber, glass fiber & Kevlar composites for aerospace and automotive.',
  },
  {
    // advancedalloys.jpg — alloy development trials lab, VIM furnace, microstructure analysis
    image: '/advancedalloys.jpg',
    label: 'Advanced Alloys',
    caption: 'Titanium, nickel-based & aluminum alloys engineered for extreme conditions.',
  },
  {
    // protectivelayer.jpg — worker spray-coating steel beam, Marine/Oil & Gas/Infrastructure
    image: '/protectivelayer.jpg',
    label: 'Protective Coatings',
    caption: 'Anti-corrosion, thermal barrier & wear-resistant industrial coatings.',
  },
  {
    // specialpolymers.jpg — lab with polymer beads, flasks, molecular display
    image: '/specialpolymers.jpg',
    label: 'Specialty Polymers',
    caption: 'High-performance polymers & sustainable materials for industrial use.',
  },
];

export function HeroSection() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isDemoOpen,  setIsDemoOpen]  = useState(false);
  const [current,     setCurrent]     = useState(0);

  const [quoteName,     setQuoteName]     = useState('');
  const [quoteCompany,  setQuoteCompany]  = useState('');
  const [quoteEmail,    setQuoteEmail]    = useState('');
  const [quoteMaterial, setQuoteMaterial] = useState('');
  const [quoteStatus,   setQuoteStatus]   = useState<'idle'|'loading'|'success'|'error'>('idle');

  const total = carouselSlides.length;
  const next  = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev  = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuoteSubmit = async () => {
    if (!quoteEmail) return;
    setQuoteStatus('loading');
    try {
      await api.quotes.create({ email: quoteEmail, material: quoteMaterial || 'General inquiry' });
      setQuoteStatus('success');
      setQuoteName(''); setQuoteCompany(''); setQuoteEmail(''); setQuoteMaterial('');
    } catch {
      setQuoteStatus('error');
    }
  };

  const achievements = [
    { icon: CalendarCheck, value: '20+',  label: 'Years Experience' },
    { icon: Users,         value: '500+', label: 'Clients Worldwide' },
    { icon: Globe2,        value: '15+',  label: 'Countries Served'  },
  ];

  return (
    <section className="relative pt-36 pb-24 bg-white overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #17A2B8 1px, transparent 0)', backgroundSize: '36px 36px' }}
      />
      {/* Teal glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#D1F2F7] opacity-40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Content ── */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#D1F2F7] shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#17A2B8] animate-pulse" />
              <span className="text-sm font-medium text-[#2C3E50]">Leading Advanced Materials Manufacturer</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#2C3E50] leading-tight mb-6">
              Advanced Materials for{' '}
              <span className="gradient-text block mt-1">Tomorrow's Industries</span>
            </h1>

            <p className="text-lg text-[#6B7280] mb-8 leading-relaxed max-w-xl">
              VAM VALTRIX delivers cutting-edge material solutions — metals, polymers, composites, and specialty coatings — engineered for performance, durability, and innovation across diverse industrial applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-all duration-200 shadow-sm group"
              >
                Request a Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-[#17A2B8] text-[#17A2B8] font-semibold hover:bg-[#17A2B8] hover:text-white transition-all duration-200"
              >
                See How It Works
              </button>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              {achievements.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E6F7FA] mb-2">
                    <Icon className="w-5 h-5 text-[#17A2B8]" />
                  </div>
                  <div className="text-2xl font-bold text-[#2C3E50]">{value}</div>
                  <div className="text-sm text-[#6B7280]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Image Carousel ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">

            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer h-[460px] select-none"
              onClick={scrollToSolutions}
              title="Click to explore our solutions"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-black"
                >
                  <img
                    src={carouselSlides[current].image}
                    alt={carouselSlides[current].label}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      carouselSlides[current].label === 'Protective Coatings'
                        ? 'object-top'   // frame the action — worker + cans
                        : ''
                    }`}
                  />
                  {/* Slide content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#D1F2F7] mb-1">Our Services</p>
                      <h3 className="text-2xl font-bold text-white mb-2">{carouselSlides[current].label}</h3>
                      <p className="text-sm text-white/75">{carouselSlides[current].caption}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D1F2F7]">
                        <span>Click to explore all solutions</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating accent */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-[#17A2B8] opacity-10 blur-2xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* ── Quote Modal ── */}
      <Modal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} title="Get Started with VAM VALTRIX">
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Clock,  label: '24hr Response',   sub: 'Quote turnaround'  },
              { icon: Shield, label: 'Verified Sources', sub: '320+ suppliers'   },
              { icon: Truck,  label: 'On-Time',          sub: '97.4% delivery'   },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="text-center p-3 bg-[#E6F7FA] rounded-xl border border-[#D1F2F7]">
                <Icon className="w-5 h-5 text-[#17A2B8] mx-auto mb-1" />
                <p className="text-xs font-semibold text-[#2C3E50]">{label}</p>
                <p className="text-xs text-[#6B7280]">{sub}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {['No minimum order commitment', 'Spec sheet & cert verification included', 'Dedicated sourcing specialist assigned', 'Real-time order tracking from day one'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#17A2B8] shrink-0" />
                <span className="text-sm text-[#1A1A1A]">{item}</span>
              </div>
            ))}
          </div>

          {quoteStatus === 'success' ? (
            <div className="text-center py-5 bg-[#E6F7FA] rounded-xl border border-[#D1F2F7]">
              <CheckCircle className="w-10 h-10 text-[#17A2B8] mx-auto mb-2" />
              <p className="font-semibold text-[#2C3E50]">Request Received!</p>
              <p className="text-sm text-[#6B7280] mt-1">A specialist will follow up within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Your name" value={quoteName} onChange={(e) => setQuoteName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
                  <input type="text" placeholder="Company" value={quoteCompany} onChange={(e) => setQuoteCompany(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
                </div>
                <input type="email" placeholder="Work email" value={quoteEmail} onChange={(e) => setQuoteEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
                <input type="text" placeholder="Material needed (e.g. Titanium Grade 5, HDPE sheet...)" value={quoteMaterial} onChange={(e) => setQuoteMaterial(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
              </div>
              <button onClick={handleQuoteSubmit} disabled={quoteStatus === 'loading'}
                className="w-full py-3 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors disabled:opacity-60">
                {quoteStatus === 'loading' ? 'Submitting...' : 'Get My Quote →'}
              </button>
              {quoteStatus === 'error' && <p className="text-center text-xs text-red-600">Something went wrong. Please try again.</p>}
            </>
          )}
        </div>
      </Modal>

      {/* ── Demo Modal ── */}
      <Modal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} title="See How VAM VALTRIX Works">
        <div className="space-y-5">
          <p className="text-sm text-[#6B7280]">
            See how VAM VALTRIX cuts procurement cycles from weeks to days — without sacrificing traceability or spec compliance.
          </p>
          <div className="aspect-video bg-gradient-to-br from-[#2C3E50] to-[#17A2B8] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <button className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <Play className="w-6 h-6 text-[#17A2B8] ml-1" />
              </button>
              <p className="text-white/80 text-sm">3-minute product walkthrough</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">How it works</p>
            {[
              { icon: Zap,       step: '01', title: 'Submit your spec',   desc: 'Upload your material requirements or describe what you need.' },
              { icon: Shield,    step: '02', title: 'We match & verify',  desc: 'Our engine finds the best-fit supplier from 320+ verified sources.' },
              { icon: BarChart3, step: '03', title: 'Track in real time', desc: 'Monitor your order from confirmation to delivery on your dashboard.' },
              { icon: Users,     step: '04', title: 'Dedicated support',  desc: 'A sourcing specialist is assigned to every account.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFB] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#17A2B8]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2C3E50]">{title}</p>
                  <p className="text-xs text-[#6B7280]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => { setIsDemoOpen(false); setIsQuoteOpen(true); }}
            className="w-full py-3 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors">
            Get Started Now →
          </button>
        </div>
      </Modal>
    </section>
  );
}
