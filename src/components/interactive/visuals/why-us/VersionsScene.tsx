import { Fragment } from 'react';
import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';
import { SceneConnector } from './SceneConnector';
import type { WhyUsVersionsScene } from './types';

interface VersionsSceneProps {
  scene: WhyUsVersionsScene;
  active: boolean;
  reducedMotion: boolean | null;
}

export function VersionsScene({ scene, active, reducedMotion }: VersionsSceneProps) {
  const lastIndex = scene.versions.length - 1;

  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="flex w-full items-start">
        {scene.versions.map((version, i) => {
          const isLatest = i === lastIndex;

          return (
            <Fragment key={version}>
              {i > 0 && (
                <div className="flex min-w-[0.5rem] flex-1 items-center self-start pt-[1.125rem]">
                  <SceneConnector
                    active={active}
                    reducedMotion={reducedMotion}
                    delay={0.1 + i * 0.08}
                  />
                </div>
              )}
              <motion.div
                className="flex shrink-0 flex-col items-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : 0.15 + i * 0.1,
                  ease: fluidEase,
                }}
              >
                <motion.span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums ${
                    isLatest
                      ? 'bg-brand-cyan text-white shadow-md shadow-brand-cyan/25'
                      : 'border border-brand-navy/10 bg-white text-brand-navy/50'
                  }`}
                  initial={{ scale: reducedMotion ? 1 : 0.88 }}
                  animate={{ scale: active ? 1 : 0.88 }}
                  transition={{
                    duration: 0.35,
                    delay: reducedMotion ? 0 : 0.2 + i * 0.1,
                    ease: fluidEase,
                  }}
                >
                  {version.replace('v', '')}
                </motion.span>
                {isLatest && (
                  <motion.span
                    className="mt-1.5 rounded-full bg-brand-cyan/12 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-cyan"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
                    transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.55, ease: fluidEase }}
                  >
                    {scene.latestLabel}
                  </motion.span>
                )}
              </motion.div>
            </Fragment>
          );
        })}
      </div>

      <motion.p
        className="mt-4 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.62, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
