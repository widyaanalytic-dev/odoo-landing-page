import type { ProblemVisualPhaseId } from '../problem.visual.config';
import { PROBLEM_SILOS } from '../problem.visual.config';
import { SiloNode } from './SiloNode';

type ProblemVisualContent = {
  silos: Record<string, string>;
  metrics: Record<string, string>;
};

interface SiloLayerProps {
  phaseId: ProblemVisualPhaseId;
  content: ProblemVisualContent;
  reducedMotion: boolean;
}

export function SiloLayer({ phaseId, content, reducedMotion }: SiloLayerProps) {
  return (
    <>
      {PROBLEM_SILOS.map((silo, index) => {
        const layout =
          phaseId === 'seamless' ? silo.seamlessPosition : silo.chaosPosition;

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
          />
        );
      })}
    </>
  );
}
