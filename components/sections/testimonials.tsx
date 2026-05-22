'use client';

import { useState, useEffect } from 'react';
import { Section, SectionTitle } from '@/components/ui/section';
import { TestimonialCard } from '@/components/cards/testimonial-card';
import { testimonials } from '@/data/testimonials';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Section className="bg-gradient-to-b from-gray-900 to-black text-white">
      <SectionTitle
        subtitle="FROM THE FLOOR UP"
        title="What Procurement Teams Are Saying"
        description="Real feedback from the engineers, buyers, and operations leads who rely on VALTRIX every day."
        className="text-white"
      />

      <div className="mt-12 relative">
        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[activeIndex, activeIndex + 1, activeIndex + 2].map((idx) => {
              const testimonial = testimonials[idx % testimonials.length];
              return (
                <div key={testimonial.id}>
                  <TestimonialCard {...testimonial} />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'bg-teal-600 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </Section>
  );
}
