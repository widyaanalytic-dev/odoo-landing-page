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

export type ProductionPortfolioId = 'manufacturing' | 'agritech' | 'heavy-equipment' | 'construction';

export const PRODUCTION_PORTFOLIO_ORDER: ProductionPortfolioId[] = [
  'manufacturing',
  'agritech',
  'heavy-equipment',
  'construction',
];

export const DEFAULT_PRODUCTION_PORTFOLIO: ProductionPortfolioId = 'manufacturing';

export type ServicesPortfolioId = 'healthcare' | 'hospitality' | 'services';

export const SERVICES_PORTFOLIO_ORDER: ServicesPortfolioId[] = ['healthcare', 'hospitality', 'services'];

export const DEFAULT_SERVICES_PORTFOLIO: ServicesPortfolioId = 'healthcare';

export type PortfolioIconId =
  | 'factory'
  | 'sprout'
  | 'truck'
  | 'building'
  | 'dna'
  | 'hotel'
  | 'briefcase';
