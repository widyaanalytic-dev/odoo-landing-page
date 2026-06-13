export type ProcessStepId = 'discovery' | 'design' | 'implementation' | 'training' | 'support';

export const PROCESS_STEP_ORDER: ProcessStepId[] = [
  'discovery',
  'design',
  'implementation',
  'training',
  'support',
];

export const DEFAULT_PROCESS_STEP: ProcessStepId = 'discovery';
