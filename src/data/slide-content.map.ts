import type { landingContent } from './landing/content';
import type { SlideId } from './slides.config';

export type LandingContentKey = keyof typeof landingContent;

/** Primary landingContent key for each slide */
export const slidePrimaryContentKey: Record<SlideId, LandingContentKey> = {
  hero: 'hero',
  'about-company': 'aboutCompany',
  'about-vision': 'aboutVision',
  'about-products': 'aboutProducts',
  problem: 'problem',
  'pain-data': 'pain',
  'pain-process': 'pain',
  empathy: 'empathy',
  solution: 'solution',
  'why-us': 'whyUs',
  modules: 'modules',
  process: 'process',
  portfolio: 'portfolio',
  contact: 'contact',
};

/** Extra content slices for slides that compose multiple pain sections */
export const painSlideSlices = {
  'pain-data': {
    eyebrow: 'data' as const,
    checklist: 'checklist1' as const,
    visual: 'data' as const,
  },
  'pain-process': {
    eyebrow: 'process' as const,
    checklist: 'checklist2' as const,
    visual: 'process' as const,
  },
} as const satisfies Partial<
  Record<SlideId, { eyebrow: 'data' | 'process'; checklist: 'checklist1' | 'checklist2'; visual: 'data' | 'process' }>
>;
