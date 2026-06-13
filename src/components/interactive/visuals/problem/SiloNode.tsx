import { motion } from 'motion/react';
import { fluidEase } from '../../../../lib/motion';
import type { ProblemSiloConfig, ProblemVisualPhaseId, SiloLayout } from '../problem.visual.config';
import { layoutOffset } from '../problem.visual.config';

interface SiloNodeProps {
  silo: ProblemSiloConfig;
  layout: SiloLayout;
  label: string;
  metric: string;
  phaseId: ProblemVisualPhaseId;
  index: number;
  reducedMotion: boolean;
  compact?: boolean;
}

export function SiloNode({
  silo,
  layout,
  label,
  metric,
  phaseId,
  index,
  reducedMotion,
  compact = false,
}: SiloNodeProps) {
  const Icon = silo.icon;
  const isSeamless = phaseId === 'seamless';
  const visible = phaseId !== 'manual';
  const offset = layoutOffset(layout);

  return (
    <motion.div
      layoutId={`problem-silo-${silo.id}`}
      className={`absolute left-1/2 top-1/2 w-[7.25rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2.5 shadow-md shadow-brand-navy/[0.06] sm:w-[8.75rem] sm:px-3.5 sm:py-3 ${compact ? 'text-[11px] sm:text-xs' : ''} ${silo.color}`}
      style={{ zIndex: layout.zIndex }}
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              scale: layout.scale * 0.9,
              x: offset.x,
              y: offset.y + 14,
              rotate: layout.rotate,
            }
      }
      animate={{
        opacity: visible ? 1 : 0,
        scale: layout.scale,
        x: offset.x,
        y: offset.y,
        rotate: layout.rotate,
      }}
      transition={{
        layout: { duration: 0.85, ease: fluidEase },
        opacity: { duration: 0.4, ease: fluidEase },
        scale: { duration: 0.55, delay: index * 0.12, ease: fluidEase },
        x: { duration: 0.85, ease: fluidEase },
        y: { duration: 0.85, ease: fluidEase },
        rotate: { duration: 0.85, ease: fluidEase },
      }}
    >
      <div className="flex items-center gap-2 text-xs font-semibold">
        <Icon size={14} strokeWidth={2.2} />
        {label}
      </div>
      {!isSeamless && <p className="mt-1.5 text-[11px] font-medium opacity-75">{metric}</p>}
    </motion.div>
  );
}
