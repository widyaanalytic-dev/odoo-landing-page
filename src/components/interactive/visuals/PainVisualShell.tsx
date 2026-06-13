import type { ReactNode } from 'react';
import { smoothEase as fluidEase } from '../../../lib/motion';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../lib/cn';

interface PainVisualShellProps {
  hint: string;
  icon: LucideIcon;
  boxClassName: string;
  iconClassName: string;
  children: ReactNode;
}

export function PainVisualShell({
  hint,
  icon: Icon,
  boxClassName,
  iconClassName,
  children,
}: PainVisualShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: fluidEase }}
      className="relative w-full min-w-0"
    >
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-navy/[0.04] via-brand-cyan/[0.06] to-transparent blur-2xl sm:-inset-x-6"
        aria-hidden
      />

      <div className="mb-3 flex justify-center px-0 sm:mb-5 sm:px-1">
        <div
          className={cn(
            'flex w-full max-w-md items-center gap-3.5 rounded-2xl border px-4 py-3.5 shadow-sm shadow-brand-navy/[0.04] backdrop-blur-sm sm:px-5 sm:py-4',
            boxClassName,
          )}
        >
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1',
              iconClassName,
            )}
          >
            <Icon size={18} strokeWidth={2.2} />
          </span>
          <p className="flex-1 text-center text-sm font-medium leading-snug sm:text-[15px]">{hint}</p>
          <span className="h-10 w-10 shrink-0" aria-hidden />
        </div>
      </div>

      {children}
    </motion.div>
  );
}
