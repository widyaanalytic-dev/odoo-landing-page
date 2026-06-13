import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  hint?: ReactNode;
  delay?: number;
  variant?: 'default' | 'glass';
}

export function InteractiveCard({
  children,
  className,
  hint,
  delay = 0,
  variant = 'default',
}: InteractiveCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative overflow-hidden rounded-3xl',
        variant === 'glass' ? 'glass-panel' : 'border border-brand-navy/10 bg-white shadow-xl shadow-brand-navy/[0.08]',
        className,
      )}
    >
      <div className="texture-grain pointer-events-none absolute inset-0 z-10 rounded-3xl" />
      {hint && (
        <p className="relative z-20 border-b border-brand-navy/5 bg-brand-muted/80 px-6 py-3.5 text-sm font-medium text-brand-mid-blue backdrop-blur-sm">
          {hint}
        </p>
      )}
      <div className="relative z-20 p-6 md:p-8">{children}</div>
    </motion.div>
  );
}
