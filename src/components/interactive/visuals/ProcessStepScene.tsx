import { Fragment } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion } from 'motion/react';

export interface ProcessStepSceneContent {
  caption: string;
  items: string[];
}

interface ProcessStepSceneProps {
  scene: ProcessStepSceneContent;
  active: boolean;
  reducedMotion: boolean | null;
}

function SceneConnector({ active, index, reducedMotion }: { active: boolean; index: number; reducedMotion: boolean | null }) {
  return (
    <div
      className="relative mx-0.5 h-0.5 min-w-[0.5rem] flex-1 self-center overflow-hidden rounded-full bg-brand-navy/10"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-left rounded-full bg-brand-cyan"
        initial={{ scaleX: reducedMotion ? 1 : 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{
          duration: 0.4,
          delay: reducedMotion ? 0 : 0.14 + index * 0.1,
          ease: fluidEase,
        }}
      />
    </div>
  );
}

export function ProcessStepScene({ scene, active, reducedMotion }: ProcessStepSceneProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center">
      <div className="flex w-full items-center">
        {scene.items.map((item, i) => (
          <Fragment key={item}>
            {i > 0 && <SceneConnector active={active} index={i} reducedMotion={reducedMotion} />}
            <motion.div
              className="flex min-w-0 flex-1 flex-col items-center px-0.5 text-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
              transition={{
                duration: 0.3,
                delay: reducedMotion ? 0 : 0.1 + i * 0.08,
                ease: fluidEase,
              }}
            >
              <motion.span
                className={`mb-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums sm:h-8 sm:w-8 ${
                  i === scene.items.length - 1
                    ? 'border-brand-cyan/30 bg-brand-cyan text-white shadow-sm shadow-brand-cyan/20'
                    : 'border-brand-cyan/20 bg-white text-brand-cyan'
                }`}
                initial={{ scale: reducedMotion ? 1 : 0.9 }}
                animate={{ scale: active ? 1 : 0.9 }}
                transition={{
                  duration: 0.28,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.08,
                  ease: fluidEase,
                }}
              >
                {i + 1}
              </motion.span>
              <span className="w-full text-[10px] font-semibold leading-snug text-brand-navy/60 sm:text-xs">
                {item}
              </span>
            </motion.div>
          </Fragment>
        ))}
      </div>

      <motion.p
        className="mt-3 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.28, delay: reducedMotion ? 0 : 0.42, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
