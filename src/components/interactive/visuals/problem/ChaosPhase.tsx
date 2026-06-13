import { motion } from 'motion/react';
import { fluidEase } from '../../../../lib/motion';
import {
  PROBLEM_CHAOS_CURVES,
  PROBLEM_CONFLICT_CALLOUT,
  PROBLEM_SCENE,
  PROBLEM_SILOS,
  fractionPoint,
  layoutOffset,
  siloAnchor,
} from '../problem.visual.config';

const { width, height } = PROBLEM_SCENE;

type ChaosContent = {
  conflictCallout: string;
};

interface ChaosPhaseProps {
  content: ChaosContent;
  reducedMotion: boolean;
}

export function ChaosPhase({ content, reducedMotion }: ChaosPhaseProps) {
  const calloutOffset = layoutOffset({
    x: PROBLEM_CONFLICT_CALLOUT.x,
    y: PROBLEM_CONFLICT_CALLOUT.y,
    rotate: 0,
    scale: 1,
    zIndex: 0,
  });

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
        {PROBLEM_CHAOS_CURVES.map(({ from, to, cpX, cpY }, i) => {
          const a = siloAnchor(PROBLEM_SILOS[from].chaosPosition);
          const b = siloAnchor(PROBLEM_SILOS[to].chaosPosition);
          const cp = fractionPoint(cpX, cpY);
          const path = `M ${a.x} ${a.y} Q ${cp.x} ${cp.y} ${b.x} ${b.y}`;

          return (
            <motion.path
              key={`${from}-${to}`}
              d={path}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="7 6"
              strokeOpacity="0.4"
              initial={{ opacity: 0, pathLength: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 0.4, pathLength: 1 }}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.15, ease: fluidEase }}
            />
          );
        })}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-red-300/80 bg-white/95 px-3.5 py-2 shadow-md shadow-red-500/10 ring-1 ring-red-100"
        initial={{ opacity: 0, scale: 0.88, x: calloutOffset.x, y: calloutOffset.y }}
        animate={{ opacity: 1, scale: 1, x: calloutOffset.x, y: calloutOffset.y }}
        transition={{ duration: 0.5, delay: 0.65, ease: fluidEase }}
      >
        <span className="text-sm font-bold tabular-nums text-red-600">{content.conflictCallout}</span>
      </motion.div>
    </motion.div>
  );
}
