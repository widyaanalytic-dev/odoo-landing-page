import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';

interface SceneConnectorProps {
  active: boolean;
  delay?: number;
  reducedMotion: boolean | null;
}

export function SceneConnector({ active, delay = 0, reducedMotion }: SceneConnectorProps) {
  return (
    <div
      className="relative h-0.5 w-full overflow-hidden rounded-full bg-brand-cyan/15"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-left rounded-full bg-brand-cyan/50"
        initial={{ scaleX: reducedMotion ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : delay, ease: fluidEase }}
      />
    </div>
  );
}
