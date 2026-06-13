import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface EyebrowProps {
  children: ReactNode;
  dark?: boolean;
}

export function Eyebrow({ children, dark = false }: EyebrowProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      className={cn(
        'mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] sm:mb-6 sm:gap-2.5 sm:px-5 sm:py-2 sm:text-sm lg:mb-8',
        dark
          ? 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan'
          : 'border-brand-cyan/30 bg-white/60 text-brand-navy backdrop-blur-sm',
      )}
    >
      <span className="h-1 w-1 rounded-full bg-brand-cyan" />
      {children}
    </motion.p>
  );
}
