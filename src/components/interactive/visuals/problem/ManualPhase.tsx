import { motion } from 'motion/react';
import { fluidEase } from '../../../../lib/motion';
import { ArrowDown, Clock, RefreshCw } from 'lucide-react';
import { MANUAL_STEP_ACCENTS } from '../problem.visual.config';

const manualIcons = [RefreshCw, Clock, ArrowDown] as const;

type ManualContent = {
  phases: { manual: { steps: string[] } };
};

interface ManualPhaseProps {
  content: ManualContent;
  reducedMotion: boolean;
}

export function ManualPhase({ content, reducedMotion }: ManualPhaseProps) {
  const steps = content.phases.manual.steps;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: fluidEase }}
    >
      <div className="relative w-full max-w-md">
        <div
          className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-brand-navy/12"
          aria-hidden
        />

        <div className="flex flex-col gap-5">
          {steps.map((step, i) => {
            const Icon = manualIcons[i] ?? RefreshCw;
            const accent = MANUAL_STEP_ACCENTS[i] ?? MANUAL_STEP_ACCENTS[0];

            return (
              <motion.div
                key={step}
                className="relative flex items-start gap-4"
                initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.45, ease: fluidEase }}
              >
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-navy/10 bg-white text-sm font-bold text-brand-navy/55 shadow-sm">
                  {i + 1}
                </span>

                <div className={`min-w-0 flex-1 rounded-2xl border px-4 py-3.5 shadow-sm ${accent}`}>
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon size={15} className="text-brand-mid-blue" strokeWidth={2} />
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-navy/40">
                      Step {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-brand-navy/85">{step}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
