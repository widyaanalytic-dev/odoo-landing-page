import type { WhyUsPillarId } from '../whyUs.visual.config';

export interface WhyUsIndustryScene {
  caption: string;
  tags: string[];
}

export interface WhyUsEditionsScene {
  caption: string;
  community: { label: string; note: string };
  enterprise: { label: string; note: string };
  verdict: string;
}

export interface WhyUsVersionsScene {
  caption: string;
  versions: string[];
  latestLabel: string;
}

export interface WhyUsWorkflowScene {
  caption: string;
  steps: string[];
}

export type WhyUsSceneMap = {
  industry: WhyUsIndustryScene;
  editions: WhyUsEditionsScene;
  versions: WhyUsVersionsScene;
  workflow: WhyUsWorkflowScene;
};

export interface WhyUsPillarSceneProps {
  pillarId: WhyUsPillarId;
  scene: WhyUsSceneMap[WhyUsPillarId];
  active: boolean;
  reducedMotion: boolean | null;
}
