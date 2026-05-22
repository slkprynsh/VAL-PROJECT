'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { Reveal } from '@/components/animations/reveal';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { api } from '@/lib/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.contact.send(formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

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
            Talk to Someone Who <span className="gradient-text">Knows Materials</span>
          </h1>
          <p className="text-xl text-gray-600">
            Have a sourcing challenge? Send us the details and a VALTRIX specialist will
            respond — usually within a few hours.
          </p>
        </motion.div>
      </Section>

      {/* Contact Info + Form */}
      <Section className="bg-white py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <SectionTitle
              subtitle="CONTACT INFO"
              title="Reach Out"
              className="text-left mb-8"
            />

            <div className="space-y-8">
              <Reveal direction="left">
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-teal-100 h-fit">
                    <Mail size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">hello@valtrix.com</p>
                    <p className="text-gray-600 text-sm">sourcing@valtrix.com</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-teal-100 h-fit">
                    <Phone size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+1 (312) 940-7200</p>
                    <p className="text-gray-600 text-sm">Mon–Fri, 7am–6pm CST</p>
                  </div>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <div className="flex gap-4">
                  <div className="p-3 rounded-lg bg-teal-100 h-fit">
                    <MapPin size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Office</h3>
                    <p className="text-gray-600 text-sm">400 Industrial Parkway, Suite 800</p>
                    <p className="text-gray-600 text-sm">Chicago, IL 60601</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <Reveal direction="right" className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company
                </label>
                <Input
                  type="text"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  What are you sourcing? *
                </label>
                <textarea
                  placeholder="Describe the material, spec, quantity, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg font-semibold transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                {status !== 'loading' && <Send size={20} />}
              </motion.button>

              {status === 'success' && (
                <p className="text-center text-sm text-teal-600 font-medium">
                  ✓ Message received — we'll be in touch within a few hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-600">{errorMsg}</p>
              )}
            </motion.form>
          </Reveal>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-gray-50 py-16">
        <SectionTitle
          subtitle="FREQUENTLY ASKED"
          title="Common Questions"
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'How quickly can VALTRIX source a material that isn\'t in your current network?',
              a: 'For most specialty materials, we can identify and qualify a new supplier within 24–72 hours. Our supplier network team handles outreach, cert verification, and onboarding so you don\'t have to.',
            },
            {
              q: 'What certifications and compliance documents come standard with each order?',
              a: 'Every order includes the relevant mill certificates, material test reports, and compliance documentation (REACH, RoHS, DFARS where applicable). You receive these before shipment, not after.',
            },
            {
              q: 'Do you support just-in-time delivery for high-turnover production lines?',
              a: 'Yes. We work with your production schedule to establish reorder cadences and buffer stock strategies that keep your line fed without inflating your inventory carrying costs.',
            },
            {
              q: 'Can VALTRIX handle multi-site distribution for national or global manufacturers?',
              a: 'Absolutely. Multi-site fulfillment is one of our core capabilities — split shipments, site-specific delivery windows, and unified invoicing across all locations under a single account.',
            },
          ].map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <motion.details className="group border border-gray-200 rounded-lg p-6 hover:border-teal-600 transition-colors cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900">
                  {faq.q}
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600 text-sm">{faq.a}</p>
              </motion.details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Start Your First Sourcing Request</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Tell us what you need. A VALTRIX sourcing specialist will follow up with options,
          pricing, and lead times — usually within the same business day.
        </p>
        <CustomButton variant="secondary" size="lg">
          Request a Quote
        </CustomButton>
      </Section>
    </div>
  );
}
