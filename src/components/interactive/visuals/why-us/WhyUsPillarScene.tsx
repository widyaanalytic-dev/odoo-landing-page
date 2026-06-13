import { EditionsScene } from './EditionsScene';
import { IndustryScene } from './IndustryScene';
import { VersionsScene } from './VersionsScene';
import { WorkflowScene } from './WorkflowScene';
import type { WhyUsPillarSceneProps } from './types';

export type {
  WhyUsEditionsScene,
  WhyUsIndustryScene,
  WhyUsSceneMap,
  WhyUsVersionsScene,
  WhyUsWorkflowScene,
} from './types';

export function WhyUsPillarScene({ pillarId, scene, active, reducedMotion }: WhyUsPillarSceneProps) {
  switch (pillarId) {
    case 'industry':
      return <IndustryScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'editions':
      return <EditionsScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'versions':
      return <VersionsScene scene={scene} active={active} reducedMotion={reducedMotion} />;
    case 'workflow':
      return <WorkflowScene scene={scene} active={active} reducedMotion={reducedMotion} />;
  }
}
