import { useId, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface AnimatedUnderlineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  wrap?: boolean;
}

/** Marker centerline — casual upward swipe like a highlighter */
const MARKER_STROKE =
  'M2 15.5 C28 12.5, 54 14, 82 13 C110 12, 138 13.5, 166 12.5 C182 12, 194 13, 199 13.5';

/** Filled marker body — tapered blunt ends */
const MARKER_FILL =
  'M2 15.5 C28 12.5, 54 14, 82 13 C110 12, 138 13.5, 166 12.5 C182 12, 194 13, 199 13.5 L197 20.5 C170 21.5, 142 19.5, 114 20.5 C86 21.5, 58 19.5, 30 20.5 C18 21, 8 20, 4 19.5 Z';

export function AnimatedUnderline({ children, delay = 0, className, wrap = false }: AnimatedUnderlineProps) {
  const reducedMotion = useReducedMotion();
  const clipId = useId();

  return (
    <span className={cn('relative inline', wrap ? 'whitespace-normal' : 'whitespace-nowrap', className)}>
      {children}
      <motion.svg
        className="pointer-events-none absolute -bottom-[0.2em] left-0 h-[0.55em] min-h-[10px] w-full max-w-none overflow-visible sm:left-[-4%] sm:w-[108%]"
        viewBox="0 0 200 24"
        preserveAspectRatio="none"
        aria-hidden
        style={{ rotate: '-1.2deg' }}
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.25, delay: delay + 0.05 }}
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x="0"
              y="0"
              height="24"
              initial={{ width: reducedMotion ? 210 : 0 }}
              whileInView={{ width: 210 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay,
                ease: [0.42, 0, 0.2, 1],
              }}
            />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path
            d={MARKER_FILL}
            fill="var(--color-brand-cyan)"
            opacity="0.62"
          />
          <motion.path
            d={MARKER_STROKE}
            fill="none"
            stroke="var(--color-brand-cyan)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            initial={{ pathLength: reducedMotion ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{
              pathLength: reducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay, ease: [0.42, 0, 0.2, 1] },
            }}
          />
          <path
            d="M6 16.5 C34 14, 62 15, 90 14.5 C118 14, 146 15, 174 14.5 C188 14, 196 14.5, 198 15"
            fill="none"
            stroke="var(--color-brand-cyan)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>
      </motion.svg>
    </span>
  );
}
