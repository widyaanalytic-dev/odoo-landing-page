import { useEffect, useRef } from 'react';
import {
  SOLUTION_DEMO_INTERVAL,
  SOLUTION_MODULE_ORDER,
  type SolutionModuleId,
} from '../components/interactive/visuals/solution.visual.config';

interface UseSolutionVisualDemoOptions {
  enabled: boolean;
  active: boolean;
  reducedMotion: boolean | null;
  paused: boolean;
  onSelect: (moduleId: SolutionModuleId) => void;
}

export function useSolutionVisualDemo({
  enabled,
  active,
  reducedMotion,
  paused,
  onSelect,
}: UseSolutionVisualDemoOptions) {
  const onSelectRef = useRef(onSelect);
  const indexRef = useRef(0);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!enabled || !active || reducedMotion || paused) return;

    const id = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % SOLUTION_MODULE_ORDER.length;
      onSelectRef.current(SOLUTION_MODULE_ORDER[indexRef.current] ?? 'sales');
    }, SOLUTION_DEMO_INTERVAL);

    return () => window.clearInterval(id);
  }, [enabled, active, reducedMotion, paused]);
}
