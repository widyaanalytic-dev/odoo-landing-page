import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface HighlightProps {
  children: ReactNode;
  dark?: boolean;
  /** Tighter padding — fits individual words instead of a full phrase block */
  tight?: boolean;
  delay?: number;
  /** Text stays visible; only the background wipes in from the left */
  bgSlide?: boolean;
  /** Wipe duration when bgSlide is true */
  bgDuration?: number;
}

const paddingTight = 'px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1';
const paddingDefault = 'px-4 py-1.5';

export function Highlight({
  children,
  dark = false,
  tight = false,
  delay = 0,
  bgSlide = false,
  bgDuration = 0.7,
}: HighlightProps) {
  const reducedMotion = useReducedMotion();
  const padding = tight ? paddingTight : paddingDefault;

  if (bgSlide) {
    return (
      <span className={cn('relative inline-block w-fit leading-none', padding)}>
        <motion.span
          className={cn(
            'absolute inset-0 rounded-sm',
            dark ? 'bg-brand-cyan shadow-lg shadow-brand-cyan/25' : 'bg-brand-cyan/15',
          )}
          aria-hidden
          initial={{ scaleX: reducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: reducedMotion ? 0 : bgDuration,
            delay,
            ease: [0.33, 0, 0.2, 1],
          }}
          style={{ transformOrigin: 'left center' }}
        />
        <span className="relative z-10 text-brand-deep-navy">{children}</span>
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, filter: reducedMotion ? 'blur(0px)' : 'blur(3px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.6 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 0.4, delay },
              scale: { type: 'spring', stiffness: 80, damping: 18, delay },
              filter: { duration: 0.45, delay },
            }
      }
      className={cn(
        'inline-block w-fit leading-none',
        padding,
        dark
          ? 'bg-brand-cyan text-brand-deep-navy shadow-lg shadow-brand-cyan/25'
          : 'bg-brand-cyan/15 text-brand-deep-navy',
      )}
    >
      {children}
    </motion.span>
  );
}
