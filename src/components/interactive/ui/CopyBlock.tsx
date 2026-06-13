import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CopyBlockProps {
  children: ReactNode;
  delay?: number;
}

export function CopyBlock({ children, delay = 0 }: CopyBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
