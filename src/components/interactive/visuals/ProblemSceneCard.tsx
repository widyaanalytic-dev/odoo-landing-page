import type { ReactNode } from 'react';
import { smoothEase as fluidEase } from '../../../lib/motion';
import { motion } from 'motion/react';
import { cn } from '../../../lib/cn';
import type { ProblemVisualPhaseId } from './problem.visual.config';
import { ProblemPhaseHint } from './problem/ProblemPhaseHint';

const phaseDotActive: Record<ProblemVisualPhaseId, string> = {
  chaos: 'bg-red-400 border-red-300/60',
  manual: 'bg-amber-400 border-amber-300/60',
  seamless: 'bg-brand-cyan border-brand-cyan/50',
};

const phaseTrackFill: Record<ProblemVisualPhaseId, string> = {
  chaos: 'from-red-400/80 to-red-300/40',
  manual: 'from-red-300/40 via-amber-400/70 to-amber-300/40',
  seamless: 'from-amber-300/40 via-brand-cyan/80 to-emerald-400/60',
};

interface ProblemSceneShellProps {
  children: ReactNode;
  phaseId: ProblemVisualPhaseId;
  hint: string;
  phaseLabels: { chaos: string; manual: string; seamless: string };
}

export function ProblemSceneShell({
  children,
  phaseId,
  hint,
  phaseLabels,
}: ProblemSceneShellProps) {
  const phases: ProblemVisualPhaseId[] = ['chaos', 'manual', 'seamless'];
  const activeIndex = phases.indexOf(phaseId);
  const progress = activeIndex / (phases.length - 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: fluidEase }}
      className="relative w-full min-w-0 overflow-hidden"
    >
      <ProblemPhaseHint phaseId={phaseId} hint={hint} />

      <div className="relative">
        {children}

        <div className="mt-6 border-t border-brand-navy/[0.07] pt-5">
          <div className="relative mx-auto max-w-md">
            <div className="absolute left-[8%] right-[8%] top-[5px] h-[2px] overflow-hidden rounded-full bg-brand-navy/[0.08]">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', phaseTrackFill[phaseId])}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.55, ease: fluidEase }}
              />
            </div>

            <div className="grid grid-cols-3">
              {phases.map((id, i) => {
                const isActive = id === phaseId;
                const isPast = i < activeIndex;

                return (
                  <div key={id} className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm transition-colors duration-300',
                        isActive || isPast ? phaseDotActive[id] : 'bg-brand-navy/12 border-brand-navy/5',
                        isActive && 'scale-125',
                      )}
                    />
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase tracking-[0.12em]',
                        isActive ? 'text-brand-navy/80' : isPast ? 'text-brand-navy/50' : 'text-brand-navy/28',
                      )}
                    >
                      {phaseLabels[id]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
