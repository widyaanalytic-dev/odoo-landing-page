import { useCallback, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import type { Locale } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { ProblemSceneShell } from './ProblemSceneCard';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { useCompactProblemScene } from '../../../hooks/useCompactProblemScene';
import { useProblemVisualDemo } from '../../../hooks/useProblemVisualDemo';
import type { ProblemVisualPhaseId } from './problem.visual.config';
import { ChaosPhase } from './problem/ChaosPhase';
import { ManualPhase } from './problem/ManualPhase';
import { SeamlessPhase } from './problem/SeamlessPhase';
import { SiloLayer } from './problem/SiloLayer';
import { ProblemSceneCanvas } from './problem/ProblemSceneCanvas';

interface ProblemVisualProps {
  slideIndex: number;
}

function phaseHint(phaseId: ProblemVisualPhaseId, locale: Locale) {
  return t(landingContent.problem, locale).visual.phases[phaseId].hint;
}

export function ProblemVisual({ slideIndex }: ProblemVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const compact = useCompactProblemScene();
  const [demoActive, setDemoActive] = useState(false);
  const [phaseId, setPhaseId] = useState<ProblemVisualPhaseId>('chaos');

  const content = t(landingContent.problem, locale).visual;

  const onEnter = useCallback(() => setDemoActive(true), []);
  const onLeave = useCallback(() => setDemoActive(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  useProblemVisualDemo({
    enabled: demoActive,
    active: demoActive,
    reducedMotion,
    onStateChange: (state) => setPhaseId(state.phaseId),
  });

  return (
    <ProblemSceneShell
      phaseId={phaseId}
      phaseLabels={content.phaseLabels}
      hint={phaseHint(phaseId, locale)}
    >
      <ProblemSceneCanvas>
        <SiloLayer phaseId={phaseId} content={content} reducedMotion={!!reducedMotion} compact={compact} />

        <AnimatePresence mode="wait">
          {phaseId === 'chaos' && (
            <ChaosPhase key="chaos" content={content} reducedMotion={!!reducedMotion} compact={compact} />
          )}
          {phaseId === 'manual' && (
            <ManualPhase key="manual" content={content} reducedMotion={!!reducedMotion} />
          )}
          {phaseId === 'seamless' && (
            <SeamlessPhase key="seamless" content={content} reducedMotion={!!reducedMotion} compact={compact} />
          )}
        </AnimatePresence>
      </ProblemSceneCanvas>
    </ProblemSceneShell>
  );
}
