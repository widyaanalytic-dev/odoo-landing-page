export type Locale = 'id' | 'en';

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
