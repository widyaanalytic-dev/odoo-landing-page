import type { PortfolioIconId } from './visual-ids';

export type Locale = 'id' | 'en';

export type PortfolioItem = {
  iconId: PortfolioIconId;
  industry: string;
  clients: string;
  description: string;
};

export type ModuleCatalogItem = {
  id:
  | 'sales'
  | 'crm'
  | 'accounting'
  | 'inventory'
  | 'purchase'
  | 'mrp'
  | 'attendance'
  | 'payroll'
  | 'hr'
  | 'restaurant'
  | 'fleet'
  | 'project';
  category: 'commercial' | 'finance' | 'hr' | 'operations';
  label: string;
  blurb: string;
  highlights: [string, string];
};

export type ModuleSceneStep = {
  label: string;
  detail: string;
};
