import { useEffect, useRef } from 'react';
import { wait } from '../lib/async';
import {
  PROBLEM_VISUAL_PHASES,
  PROBLEM_VISUAL_TIMING,
  type ProblemVisualPhaseId,
} from '../components/interactive/visuals/problem.visual.config';

export interface ProblemVisualState {
  phaseIndex: number;
  phaseId: ProblemVisualPhaseId;
}

interface UseProblemVisualDemoOptions {
  enabled: boolean;
  active: boolean;
  reducedMotion: boolean | null;
  onStateChange: (state: ProblemVisualState) => void;
}

function buildState(phaseIndex: number): ProblemVisualState {
  return {
    phaseIndex,
    phaseId: PROBLEM_VISUAL_PHASES[phaseIndex] ?? 'chaos',
  };
}

const PHASE_DURATION: Record<ProblemVisualPhaseId, number> = {
  chaos: PROBLEM_VISUAL_TIMING.chaos,
  manual: PROBLEM_VISUAL_TIMING.manual,
  seamless: PROBLEM_VISUAL_TIMING.seamless,
};

export function useProblemVisualDemo({
  enabled,
  active,
  reducedMotion,
  onStateChange,
}: UseProblemVisualDemoOptions) {
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  useEffect(() => {
    if (!enabled || !active) return;

    const controller = new AbortController();
    const { signal } = controller;

    const emit = (state: ProblemVisualState) => onStateChangeRef.current(state);

    async function loop() {
      while (!signal.aborted) {
        for (let i = 0; i < PROBLEM_VISUAL_PHASES.length; i += 1) {
          const phaseId = PROBLEM_VISUAL_PHASES[i];
          emit(buildState(i));
          await wait(reducedMotion ? 600 : PHASE_DURATION[phaseId], signal);
        }
        await wait(reducedMotion ? 400 : PROBLEM_VISUAL_TIMING.loopPause, signal);
      }
    }

    if (reducedMotion) {
      emit(buildState(PROBLEM_VISUAL_PHASES.indexOf('seamless')));
      return;
    }

    loop().catch((error) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      throw error;
    });

    return () => controller.abort();
  }, [enabled, active, reducedMotion]);
}
