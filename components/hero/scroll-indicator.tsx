'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <p className="text-sm font-medium text-gray-600">Scroll to explore</p>
      <div className="relative w-6 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-1.5 bg-gray-400 rounded-full"
        />
      </div>
    </motion.div>
  );
}
