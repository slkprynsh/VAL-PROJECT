'use client';

import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { CustomButton } from '@/components/ui/custom-button';
import { Reveal } from '@/components/animations/reveal';
import { GlassCard } from '@/components/ui/glass-card';
import { jobListings } from '@/data/careers';
import { MapPin, Briefcase, Zap } from 'lucide-react';

export default function CareersPage() {
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
            Work Where the <span className="gradient-text">Supply Chain Gets Fixed</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            VALTRIX is a team of engineers, logistics thinkers, sourcing specialists, and operators
            who believe manufacturing supply chains deserve better infrastructure. If that problem
            excites you, we want to hear from you.
          </p>
          <div className="flex gap-4 justify-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Zap size={20} className="text-teal-600" />
              <span>Competitive Salaries</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Briefcase size={20} className="text-teal-600" />
              <span>Remote Options</span>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Job Listings */}
      <Section className="bg-white py-16">
        <SectionTitle
          subtitle="OPEN POSITIONS"
          title="We're Hiring"
          description="We're growing across sourcing, technology, and customer success. Every role at VALTRIX sits close to the real operational challenges our clients face daily."
        />

        <div className="mt-12 space-y-6">
          {jobListings.map((job, idx) => (
            <Reveal key={job.id} delay={idx * 0.1}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 border border-gray-200 rounded-xl hover:border-teal-600 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase size={16} className="text-teal-600" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-teal-600" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-900">Key Requirements:</p>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {job.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0 mt-1.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <CustomButton variant="primary" size="lg" className="whitespace-nowrap">
                    Apply Now
                  </CustomButton>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Join Us */}
      <Section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <SectionTitle
          subtitle="WHY VALTRIX"
          title="Benefits & Culture"
          description="We operate like the manufacturers we serve — with urgency, precision, and no tolerance for waste."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Mission-Driven Work',
              description: 'Fix a real problem that affects real production lines every day.',
            },
            {
              title: 'Competitive Compensation',
              description: 'Market-leading salaries and meaningful equity.',
            },
            {
              title: 'Flexible Working',
              description: 'Remote-friendly with async-first culture.',
            },
            {
              title: 'Deep Ownership',
              description: 'You own your work end-to-end — no hand-holding, no bureaucracy.',
            },
            {
              title: 'Expert Team',
              description: 'Work alongside sourcing specialists, engineers, and operators who know the industry cold.',
            },
            {
              title: 'Health & Wellness',
              description: 'Comprehensive health, dental, and wellness benefits from day one.',
            },
          ].map((benefit, idx) => (
            <Reveal key={benefit.title} delay={idx * 0.1}>
              <GlassCard variant="light" className="text-center">
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-6">Ready to Build Something That Keeps Industry Moving?</h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Don&apos;t see the right role? We&apos;re always looking for people who understand industrial
          supply chains and want to make them work better.
        </p>
        <CustomButton variant="secondary" size="lg">
          Get in Touch
        </CustomButton>
      </Section>
    </div>
  );
}
