import type { ProblemVisualPhaseId, SiloLayout } from '../problem.visual.config';
import { PROBLEM_SILOS, compactSiloLayout } from '../problem.visual.config';
import { SiloNode } from './SiloNode';

type ProblemVisualContent = {
  silos: Record<string, string>;
  metrics: Record<string, string>;
};

interface SiloLayerProps {
  phaseId: ProblemVisualPhaseId;
  content: ProblemVisualContent;
  reducedMotion: boolean;
  compact?: boolean;
}

function resolveLayout(layout: SiloLayout, compact: boolean) {
  return compact ? compactSiloLayout(layout) : layout;
}

export function SiloLayer({ phaseId, content, reducedMotion, compact = false }: SiloLayerProps) {
  return (
    <>
      {PROBLEM_SILOS.map((silo, index) => {
        const base =
          phaseId === 'seamless' ? silo.seamlessPosition : silo.chaosPosition;
        const layout = resolveLayout(base, compact && phaseId !== 'manual');

        return (
          <SiloNode
            key={silo.id}
            silo={silo}
            layout={layout}
            label={content.silos[silo.labelKey]}
            metric={content.metrics[silo.metricKey]}
            phaseId={phaseId}
            index={index}
            reducedMotion={reducedMotion}
            compact={compact}
          />
        );
      })}
    </>
  );
}
