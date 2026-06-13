import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';

interface DataPulseProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  reducedMotion: boolean | null;
  delay?: number;
}

export function DataPulse({ from, to, reducedMotion, delay = 0 }: DataPulseProps) {
  if (reducedMotion) return null;

  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <motion.circle
      r="4"
      fill="#29ABE2"
      initial={{ opacity: 0, offsetDistance: '0%' }}
      animate={{ opacity: [0, 1, 1, 0], offsetDistance: '100%' }}
      transition={{ duration: 0.65, delay, ease: fluidEase, times: [0, 0.08, 0.82, 1] }}
      style={{ offsetPath: `path('${path}')` }}
    />
  );
}
