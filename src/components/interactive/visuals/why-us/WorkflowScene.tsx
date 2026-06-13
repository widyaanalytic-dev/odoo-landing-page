import { Fragment } from 'react';
import { Briefcase, Settings2, Sparkles, type LucideIcon } from 'lucide-react';
import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';
import { SceneConnector } from './SceneConnector';
import type { WhyUsWorkflowScene } from './types';

const workflowIcons: LucideIcon[] = [Briefcase, Settings2, Sparkles];

interface WorkflowSceneProps {
  scene: WhyUsWorkflowScene;
  active: boolean;
  reducedMotion: boolean | null;
}

export function WorkflowScene({ scene, active, reducedMotion }: WorkflowSceneProps) {
  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="flex w-full items-start">
        {scene.steps.map((step, i) => {
          const Icon = workflowIcons[i] ?? Briefcase;
          const isLast = i === scene.steps.length - 1;

          return (
            <Fragment key={step}>
              {i > 0 && (
                <div className="flex min-w-[0.5rem] flex-1 items-center self-start pt-[1.125rem]">
                  <SceneConnector
                    active={active}
                    reducedMotion={reducedMotion}
                    delay={0.12 + i * 0.1}
                  />
                </div>
              )}
              <motion.div
                className="flex min-w-0 flex-1 flex-col items-center px-0.5 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
                transition={{
                  duration: 0.4,
                  delay: reducedMotion ? 0 : 0.12 + i * 0.14,
                  ease: fluidEase,
                }}
              >
                <motion.span
                  className={`mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm ${
                    isLast
                      ? 'border-brand-cyan/30 bg-brand-cyan text-white shadow-brand-cyan/20'
                      : 'border-brand-cyan/20 bg-white text-brand-cyan'
                  }`}
                  initial={{ scale: reducedMotion ? 1 : 0.85 }}
                  animate={{ scale: active ? 1 : 0.85 }}
                  transition={{
                    duration: 0.35,
                    delay: reducedMotion ? 0 : 0.18 + i * 0.14,
                    ease: fluidEase,
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                </motion.span>
                <span className="w-full text-[10px] font-semibold leading-snug text-brand-navy/70 sm:text-[11px]">
                  {step}
                </span>
              </motion.div>
            </Fragment>
          );
        })}
      </div>

      <motion.p
        className="mt-4 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.58, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
