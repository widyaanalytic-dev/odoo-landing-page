import { AnimatePresence, motion } from 'motion/react';
import { fluidEase } from '../../../../lib/motion';
import { AlertTriangle, ClipboardList, Link2 } from 'lucide-react';
import { cn } from '../../../../lib/cn';
import type { ProblemVisualPhaseId } from '../problem.visual.config';

const phaseIcons = {
  chaos: AlertTriangle,
  manual: ClipboardList,
  seamless: Link2,
} as const;

const phaseBoxStyles: Record<ProblemVisualPhaseId, string> = {
  chaos: 'border-red-200/70 bg-red-50/40 text-red-900/85',
  manual: 'border-amber-200/70 bg-amber-50/45 text-amber-950/85',
  seamless: 'border-brand-cyan/35 bg-brand-cyan/[0.07] text-brand-navy/85',
};

const phaseIconStyles: Record<ProblemVisualPhaseId, string> = {
  chaos: 'bg-red-100/90 text-red-600 ring-red-200/60',
  manual: 'bg-amber-100/90 text-amber-600 ring-amber-200/60',
  seamless: 'bg-brand-cyan/12 text-brand-cyan ring-brand-cyan/25',
};

interface ProblemPhaseHintProps {
  phaseId: ProblemVisualPhaseId;
  hint: string;
}

export function ProblemPhaseHint({ phaseId, hint }: ProblemPhaseHintProps) {
  const Icon = phaseIcons[phaseId];

  return (
    <div className="mb-5 flex justify-center px-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={phaseId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45, ease: fluidEase }}
          className={cn(
            'flex w-full max-w-md items-center gap-3.5 rounded-2xl border px-4 py-3.5 shadow-sm shadow-brand-navy/[0.04] backdrop-blur-sm sm:px-5 sm:py-4',
            phaseBoxStyles[phaseId],
          )}
        >
          <span
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1',
              phaseIconStyles[phaseId],
            )}
          >
            <Icon size={18} strokeWidth={2.2} />
          </span>
          <p className="flex-1 text-center text-sm font-medium leading-snug sm:text-[15px]">{hint}</p>
          <span className="h-10 w-10 shrink-0" aria-hidden />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
