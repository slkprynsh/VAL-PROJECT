'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const variants = {
  up:    { hidden: { opacity: 0, y: 24  }, visible: { opacity: 1, y: 0  } },
  down:  { hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0  } },
  left:  { hidden: { opacity: 0, x: 24  }, visible: { opacity: 1, x: 0  } },
  right: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0  } },
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.4,
  direction = 'up',
  className,
}: RevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,      // trigger earlier — less perceived lag
    triggerOnce: true,   // never re-animate
    rootMargin: '0px 0px -40px 0px', // start slightly before entering viewport
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier — feels snappier than default
      }}
      // willChange only while animating, auto-removed after (framer handles this)
      className={className}
    >
      {children}
    </motion.div>
  );
}
