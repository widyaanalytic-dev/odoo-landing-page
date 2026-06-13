import { motion } from 'motion/react';
import { fluidEase } from '../../../../lib/motion';
import { Check } from 'lucide-react';
import {
  PROBLEM_SCENE,
  PROBLEM_SILOS,
  SILO_CONNECTOR_INSET,
  compactSiloLayout,
  siloAnchor,
} from '../problem.visual.config';

const { width, height } = PROBLEM_SCENE;

type SeamlessContent = {
  phases: { seamless: { label: string } };
  metrics: { stockUnified: string };
};

interface SeamlessPhaseProps {
  content: SeamlessContent;
  reducedMotion: boolean;
  compact?: boolean;
}

export function SeamlessPhase({ content, reducedMotion, compact = false }: SeamlessPhaseProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: fluidEase }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {PROBLEM_SILOS.slice(0, -1).map((silo, i) => {
          const next = PROBLEM_SILOS[i + 1];
          const aLayout = compact ? compactSiloLayout(silo.seamlessPosition) : silo.seamlessPosition;
          const bLayout = compact ? compactSiloLayout(next.seamlessPosition) : next.seamlessPosition;
          const a = siloAnchor(aLayout);
          const b = siloAnchor(bLayout);
          const y = a.y + 18;
          return (
            <motion.line
              key={silo.id}
              x1={a.x + SILO_CONNECTOR_INSET}
              y1={y}
              x2={b.x - SILO_CONNECTOR_INSET}
              y2={y}
              stroke="#29abe2"
              strokeWidth="2.5"
              strokeOpacity="0.5"
              initial={{ opacity: 0, pathLength: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 0.5, pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.12, ease: fluidEase }}
            />
          );
        })}
      </svg>

      <motion.div
        className="absolute inset-x-4 bottom-[12%] sm:inset-x-6 sm:bottom-[10%] lg:inset-x-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85, ease: fluidEase }}
      >
        <div className="mx-auto max-w-sm">
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-brand-cyan/12">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-emerald-400"
              initial={{ width: reducedMotion ? '100%' : '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.7, delay: 1.05, ease: fluidEase }}
            />
          </div>

          <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#d4edda] px-5 py-3 ring-1 ring-[#28a745]/25">
            <Check size={15} className="text-[#155724]" strokeWidth={2.5} />
            <motion.span
              className="text-sm font-semibold text-[#155724]"
              initial={{ opacity: 0.75 }}
              animate={{ opacity: [0.75, 1, 0.9, 1] }}
              transition={{ duration: 0.55, delay: 1.35, ease: fluidEase }}
            >
              {content.metrics.stockUnified}
            </motion.span>
            <span className="text-xs text-[#155724]/75">· {content.phases.seamless.label}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
