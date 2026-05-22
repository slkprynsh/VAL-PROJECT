'use client';

import { GlassCard } from '@/components/ui/glass-card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
}

export function TestimonialCard({
  name,
  role,
  company,
  text,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.2)' }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard
        variant="light"
        className="backdrop-blur-md border-white/20 flex flex-col h-full"
      >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-100 text-sm leading-relaxed mb-6 flex-1">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-sm text-white">{name}</p>
          <p className="text-xs text-gray-300">{role} at {company}</p>
        </div>
      </div>
      </GlassCard>
    </motion.div>
  );
}
