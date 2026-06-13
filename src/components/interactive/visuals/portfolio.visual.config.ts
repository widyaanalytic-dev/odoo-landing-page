export type ProductionPortfolioId = 'manufacturing' | 'agritech' | 'heavy-equipment' | 'construction';

export const PRODUCTION_PORTFOLIO_ORDER: ProductionPortfolioId[] = [
  'manufacturing',
  'agritech',
  'heavy-equipment',
  'construction',
];

export const DEFAULT_PRODUCTION_PORTFOLIO: ProductionPortfolioId = 'manufacturing';

export const productionIndustryTheme: Record<
  ProductionPortfolioId,
  { chip: string; icon: string; glow: string }
> = {
  manufacturing: {
    chip: 'border-slate-200 bg-slate-50 text-slate-700',
    icon: 'border-slate-200 bg-slate-100 text-slate-600',
    glow: 'from-slate-200/40 via-brand-cyan/5 to-transparent',
  },
  agritech: {
    chip: 'border-emerald-200/80 bg-emerald-50 text-emerald-800',
    icon: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    glow: 'from-emerald-100/50 via-brand-cyan/5 to-transparent',
  },
  'heavy-equipment': {
    chip: 'border-amber-200/80 bg-amber-50 text-amber-900',
    icon: 'border-amber-200 bg-amber-50 text-amber-700',
    glow: 'from-amber-100/50 via-brand-cyan/5 to-transparent',
  },
  construction: {
    chip: 'border-orange-200/80 bg-orange-50 text-orange-900',
    icon: 'border-orange-200 bg-orange-50 text-orange-700',
    glow: 'from-orange-100/40 via-brand-cyan/5 to-transparent',
  },
};

export type ServicesPortfolioId = 'healthcare' | 'hospitality' | 'services';

export const SERVICES_PORTFOLIO_ORDER: ServicesPortfolioId[] = ['healthcare', 'hospitality', 'services'];

export const DEFAULT_SERVICES_PORTFOLIO: ServicesPortfolioId = 'healthcare';

export const servicesIndustryTheme: Record<
  ServicesPortfolioId,
  { chip: string; icon: string; glow: string }
> = {
  healthcare: {
    chip: 'border-rose-200/80 bg-rose-50 text-rose-900',
    icon: 'border-rose-200 bg-rose-50 text-rose-700',
    glow: 'from-rose-100/50 via-brand-cyan/5 to-transparent',
  },
  hospitality: {
    chip: 'border-violet-200/80 bg-violet-50 text-violet-900',
    icon: 'border-violet-200 bg-violet-50 text-violet-700',
    glow: 'from-violet-100/45 via-brand-cyan/5 to-transparent',
  },
  services: {
    chip: 'border-indigo-200/80 bg-indigo-50 text-indigo-900',
    icon: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    glow: 'from-indigo-100/45 via-brand-cyan/5 to-transparent',
  },
};
