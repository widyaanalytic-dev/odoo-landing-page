export type WhyUsPillarId = 'industry' | 'editions' | 'versions' | 'workflow';

export const WHY_US_PILLAR_ORDER: WhyUsPillarId[] = ['industry', 'editions', 'versions', 'workflow'];

export type ProcessStepId = 'discovery' | 'design' | 'implementation' | 'training' | 'support';

export const PROCESS_STEP_ORDER: ProcessStepId[] = [
  'discovery',
  'design',
  'implementation',
  'training',
  'support',
];

export const DEFAULT_PROCESS_STEP: ProcessStepId = 'discovery';

export type PortfolioIconId =
  | 'factory'
  | 'sprout'
  | 'truck'
  | 'building'
  | 'dna'
  | 'hotel'
  | 'briefcase';
