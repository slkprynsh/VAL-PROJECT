'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedText } from './animated-text';
import { ScrollIndicator } from './scroll-indicator';
import { CustomButton } from '@/components/ui/custom-button';
import { Modal } from '@/components/ui/modal';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';

export function HeroSection() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleQuoteSubmit = async () => {
    if (!quoteEmail) return;
    setQuoteStatus('loading');
    try {
      await api.quotes.create({ email: quoteEmail, material: 'General inquiry' });
      setQuoteStatus('success');
      setQuoteEmail('');
    } catch {
      setQuoteStatus('error');
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200">
            <span className="w-2 h-2 rounded-full bg-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Precision Materials. Delivered at Scale.
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div className="mb-8">
          <AnimatedText
            text="The Supply Chain Behind Industry's Toughest Builds"
            stagger={0.03}
            delay={0.1}
            highlightWords={['Supply', 'Chain', 'Industry']}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-center text-gray-900 leading-tight"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-2xl text-center text-lg sm:text-xl text-gray-600 mb-12"
        >
          VALTRIX connects heavy manufacturers with a verified network of metals, polymers, composites, and specialty coatings — sourced precisely, delivered reliably, and spec-matched to your production demands.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <CustomButton 
            variant="primary" 
            size="lg"
            onClick={() => setIsTrialModalOpen(true)}
          >
            Request a Quote
            <ArrowRight size={20} />
          </CustomButton>
          <CustomButton 
            variant="outline" 
            size="lg"
            onClick={() => setIsDemoModalOpen(true)}
          >
            See How It Works
          </CustomButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-16"
        >
          {[
            { label: 'Verified Suppliers', value: '320+' },
            { label: 'SKUs In-Network', value: '18,000+' },
            { label: 'On-Time Delivery', value: '97.4%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-teal-600 mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>

      {/* Free Trial Modal */}
      <Modal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        title="Request a Quote"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Hundreds of manufacturers trust VALTRIX to keep their lines running. Tell us what you need — we'll match you with the right material and the right source, fast.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span>No minimum order commitment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span>Spec sheet verification included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              <span>Dedicated account support from day one</span>
            </div>
          </div>
          <input
            type="email"
            placeholder="your@email.com"
            value={quoteEmail}
            onChange={(e) => setQuoteEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {quoteStatus === 'success' ? (
            <p className="text-center text-sm text-teal-600 font-medium">
              ✓ Request received — a specialist will follow up shortly.
            </p>
          ) : (
            <CustomButton
              variant="primary"
              className="w-full"
              onClick={handleQuoteSubmit}
              disabled={quoteStatus === 'loading'}
            >
              {quoteStatus === 'loading' ? 'Submitting...' : 'Submit Request'}
            </CustomButton>
          )}
          {quoteStatus === 'error' && (
            <p className="text-center text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </div>
      </Modal>

      {/* Demo Modal */}
      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Watch Our Demo"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Watch how VALTRIX's sourcing engine cuts procurement cycles from weeks to days, without sacrificing traceability or spec compliance.
          </p>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">▶</span>
              </div>
              <p className="text-gray-600">Click to play demo video</p>
            </div>
          </div>
          <CustomButton variant="primary" className="w-full">
            Schedule a Live Demo
          </CustomButton>
        </div>
      </Modal>
    </section>
  );
}
