'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading bar */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={isLoading ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-cyan-500 z-50"
      />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
