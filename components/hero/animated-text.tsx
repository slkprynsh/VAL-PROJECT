'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  highlightWords?: string[];
}

export function AnimatedText({
  text,
  delay = 0,
  stagger = 0.05,
  className = '',
  highlightWords = [],
}: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, idx) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.toLowerCase(),
        );

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
            className={isHighlight ? 'gradient-text font-bold' : ''}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
