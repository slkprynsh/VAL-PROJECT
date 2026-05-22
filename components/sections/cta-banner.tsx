'use client';

import { Section } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <Section fullWidth className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <Sparkles size={32} />
          </motion.div>
        </div>

        <h2 className="mb-4 text-4xl sm:text-5xl font-bold text-balance">
          Your Next Order Shouldn&apos;t Take Three Weeks to Source
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
          VALTRIX gives industrial manufacturers direct access to a pre-vetted material supply network — with full traceability, spec documentation, and a fulfillment team that understands production timelines.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButton
            variant="secondary"
            size="lg"
            className="text-teal-600 hover:text-teal-700"
          >
            Request a Quote
            <ArrowRight size={20} />
          </CustomButton>
          <CustomButton
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10"
          >
            Talk to a Sourcing Specialist
          </CustomButton>
        </div>

        {/* Features mention */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-8 text-sm"
        >
          {['✓ No minimum order commitment', '✓ Spec sheet verification included', '✓ Dedicated account support from day one'].map(
            (feature) => (
              <div key={feature} className="flex items-center gap-2">
                {feature}
              </div>
            ),
          )}
        </motion.div>
      </motion.div>
    </Section>
  );
}
