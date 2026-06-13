import { Fragment, useCallback, useMemo, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { assertFound } from '../../../lib/assert';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { cn } from '../../../lib/cn';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { ProcessStepScene } from './ProcessStepScene';
import {
  DEFAULT_PROCESS_STEP,
  PROCESS_STEP_ORDER,
  type ProcessStepId,
} from './process.visual.config';

function StepConnector({ filled }: { filled: boolean }) {
  return (
    <div
      className="relative mx-0.5 h-0.5 min-w-[0.75rem] flex-1 overflow-hidden rounded-full bg-brand-navy/10 sm:mx-1"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 origin-left rounded-full bg-brand-cyan"
        animate={{ scaleX: filled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: fluidEase }}
      />
    </div>
  );
}

interface ProcessVisualProps {
  slideIndex: number;
}

export function ProcessVisual({ slideIndex }: ProcessVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activeStepId, setActiveStepId] = useState<ProcessStepId>(DEFAULT_PROCESS_STEP);

  const content = t(landingContent.process, locale);

  const steps = useMemo(
    () => PROCESS_STEP_ORDER.map((id) => assertFound(
      content.steps.find((s) => s.id === id),
      `Process step missing for id "${id}"`,
    )),
    [content.steps],
  );

  const activeIndex = steps.findIndex((s) => s.id === activeStepId);
  const activeStep = steps[activeIndex] ?? steps[0];
  const activeScene = content.stepScenes[activeStep.id];

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className="flex h-full max-h-full w-full min-h-0 min-w-0 flex-col"
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/95 shadow-md">
        <div className="shrink-0 border-b border-brand-navy/[0.06] px-3 py-2.5 sm:px-5 sm:py-3.5">
          <div className="flex w-full items-center" role="tablist" aria-label={content.eyebrow}>
            {steps.map((step, i) => {
              const isActive = activeStepId === step.id;
              const isPast = i < activeIndex;
              const tabId = `process-tab-${step.id}`;
              const panelId = `process-panel-${step.id}`;

              return (
                <Fragment key={step.id}>
                  {i > 0 && <StepConnector filled={isPast || isActive} />}
                  <button
                    type="button"
                    id={tabId}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveStepId(step.id)}
                    className="relative z-[1] flex shrink-0 flex-col items-center"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums sm:h-10 sm:w-10 sm:text-xs',
                        isActive
                          ? 'border-brand-cyan bg-brand-cyan text-white shadow-md shadow-brand-cyan/25'
                          : isPast
                            ? 'border-brand-cyan/30 bg-brand-cyan/15 text-brand-cyan'
                            : 'border-brand-navy/10 bg-white text-brand-navy/45 hover:border-brand-cyan/25',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepId}
            id={`process-panel-${activeStepId}`}
            role="tabpanel"
            aria-labelledby={`process-tab-${activeStepId}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: fluidEase }}
            className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-3 sm:px-5 sm:py-4"
          >
            <div className="shrink-0">
              <p className="text-sm font-bold text-brand-deep-navy sm:text-base">{activeStep.title}</p>
              <p className="mt-1 text-sm leading-snug text-brand-navy/65">{activeStep.text}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeStep.deliverables.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-brand-cyan/15 bg-brand-muted/40 px-2.5 py-0.5 text-xs font-medium text-brand-navy/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-h-[7.5rem] flex-1 rounded-lg border border-brand-navy/[0.06] bg-brand-muted/15 px-3 py-3 sm:min-h-[8.5rem]">
              <ProcessStepScene scene={activeScene} active={visible} reducedMotion={reducedMotion} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
