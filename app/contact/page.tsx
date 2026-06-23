'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { api } from '@/lib/api';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus]     = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Client-side validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    if (formData.name.length > 100) {
      setValidationError('Name must be 100 characters or less.');
      return;
    }

    if (formData.email.length > 100) {
      setValidationError('Email must be 100 characters or less.');
      return;
    }

    if (formData.message.length > 5000) {
      setValidationError('Message must be 5000 characters or less.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      let token = '';
      if (typeof window !== 'undefined' && window.grecaptcha) {
        token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
          { action: 'contact' }
        );
      }

      await api.contact.send({ ...formData, recaptchaToken: token });
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  return (
    <div className="pt-20">

      {/* Hero */}
      <Section className="bg-white py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">Get In Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2C3E50] mb-6 leading-tight">
            Talk to Someone Who{' '}
            <span className="gradient-text">Knows Materials</span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Have a sourcing challenge? Send us the details and a VAM VALTRIX specialist will respond — usually within a few hours.
          </p>
        </motion.div>
      </Section>

      {/* Contact Info + Form */}
      <Section className="bg-[#F8FAFB]">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Info */}
          <div className="lg:col-span-1 space-y-8">
            <SectionTitle subtitle="CONTACT INFO" title="Reach Out" className="text-left mb-2" />
            {[
              { icon: Mail,    title: 'Email',  lines: ['info@vamvaltrix.com', 'sourcing@vamvaltrix.com'] },
              { icon: Phone,   title: 'Phone',  lines: ['+91 22 4976 8900', 'Mon–Fri, 9am–6pm IST'] },
              { icon: MapPin,  title: 'Office', lines: ['Advance Material Pvt. Ltd', 'India'] },
            ].map(({ icon: Icon, title, lines }, idx) => (
              <Reveal key={title} direction="left" delay={idx * 0.1}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#17A2B8]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C3E50] mb-1">{title}</h3>
                    {lines.map((l) => <p key={l} className="text-[#6B7280] text-sm">{l}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form */}
          <Reveal direction="right" className="lg:col-span-2">
            <motion.form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              {validationError && (
                <div className="mb-5 p-3.5 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                  ⚠️ {validationError}
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-2">Full Name *</label>
                  <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required maxLength={100}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
                  <span className="text-xs text-gray-400 block mt-1 text-right">{formData.name.length}/100</span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2C3E50] mb-2">Email *</label>
                  <input type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required maxLength={100}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
                  <span className="text-xs text-gray-400 block mt-1 text-right">{formData.email.length}/100</span>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2">Company</label>
                <input type="text" placeholder="Your company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} maxLength={100}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2C3E50] mb-2">What are you sourcing? *</label>
                <textarea placeholder="Describe the material, spec, quantity, and timeline..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} maxLength={5000}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8] resize-none" />
                <span className="text-xs text-gray-400 block mt-1 text-right">{formData.message.length}/5000</span>
              </div>

              {status === 'success' ? (
                <div className="text-center py-4 bg-[#E6F7FA] rounded-xl border border-[#D1F2F7]">
                  <p className="font-semibold text-[#17A2B8]">✓ Message received — we&apos;ll be in touch within a few hours.</p>
                </div>
              ) : (
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17A2B8] hover:bg-[#0D7A8C] disabled:opacity-60 text-white rounded-lg font-semibold transition-colors">
                  {status === 'loading' ? 'Sending...' : <><span>Send Message</span><Send size={18} /></>}
                </motion.button>
              )}
              {status === 'error' && <p className="text-center text-sm text-red-600 mt-3">{errorMsg}</p>}
            </motion.form>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white">
        <SectionTitle subtitle="FREQUENTLY ASKED" title="Common Questions" />
        <div className="mt-12 max-w-3xl mx-auto space-y-3">
          {[
            { q: "How quickly can VAM VALTRIX source a material that isn't in your current network?", a: "For most specialty materials, we can identify and qualify a new supplier within 24–72 hours. Our supplier network team handles outreach, cert verification, and onboarding so you don't have to." },
            { q: 'What certifications and compliance documents come standard with each order?', a: 'Every order includes the relevant mill certificates, material test reports, and compliance documentation (REACH, RoHS, DFARS where applicable). You receive these before shipment, not after.' },
            { q: 'Do you support just-in-time delivery for high-turnover production lines?', a: "Yes. We work with your production schedule to establish reorder cadences and buffer stock strategies that keep your line fed without inflating your inventory carrying costs." },
            { q: 'Can VAM VALTRIX handle multi-site distribution for national or global manufacturers?', a: 'Absolutely. Multi-site fulfillment is one of our core capabilities — split shipments, site-specific delivery windows, and unified invoicing across all locations under a single account.' },
          ].map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <details className="group border-2 border-gray-100 hover:border-[#D1F2F7] rounded-xl p-6 transition-colors cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-[#2C3E50] list-none">
                  {faq.q}
                  <span className="ml-4 w-6 h-6 rounded-full bg-[#E6F7FA] flex items-center justify-center text-[#17A2B8] text-xs shrink-0 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-[#6B7280] text-sm leading-relaxed">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">Start Your First Sourcing Request</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Tell us what you need. A VAM VALTRIX sourcing specialist will follow up with options, pricing, and lead times — usually within the same business day.
        </p>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#17A2B8] text-white font-semibold hover:bg-[#0D7A8C] transition-colors">
          Request a Quote →
        </a>
      </Section>
    </div>
  );
}
