import type { BackdropVariant, SlideVariant } from './slide-layout.types';
import type { LandingContentKey } from './slide-content.map';

export type SlideId =
  | 'hero'
  | 'about-company'
  | 'about-vision'
  | 'about-products'
  | 'problem'
  | 'pain-data'
  | 'pain-process'
  | 'empathy'
  | 'solution'
  | 'why-us'
  | 'modules'
  | 'process'
  | 'portfolio-production'
  | 'portfolio-services'
  | 'contact';

export interface SlideMeta {
  id: SlideId;
  label: string;
  variant: SlideVariant;
  backdrop: BackdropVariant;
  dark?: boolean;
  /** Primary key in landingContent — see slide-content.map.ts */
  contentKey: LandingContentKey;
}

export type SlideComponentProps = { index: number; meta: SlideMeta };

export const slideMetaList: SlideMeta[] = [
  { id: 'hero', label: 'Hero', variant: 'hero', backdrop: 'glow', contentKey: 'hero' },
  { id: 'about-company', label: 'About', variant: 'split', backdrop: 'muted', contentKey: 'aboutCompany' },
  { id: 'about-vision', label: 'About', variant: 'split', backdrop: 'light', contentKey: 'aboutVision' },
  { id: 'about-products', label: 'Products', variant: 'centered', backdrop: 'muted', contentKey: 'aboutProducts' },
  { id: 'problem', label: 'Problem', variant: 'visual-wide', backdrop: 'light', contentKey: 'problem' },
  { id: 'pain-data', label: 'Pain', variant: 'split', backdrop: 'muted', contentKey: 'pain' },
  { id: 'pain-process', label: 'Pain', variant: 'split-reverse', backdrop: 'light', contentKey: 'pain' },
  { id: 'empathy', label: 'Empathy', variant: 'split', backdrop: 'glow', contentKey: 'empathy' },
  { id: 'solution', label: 'Solution', variant: 'split-reverse', backdrop: 'muted', contentKey: 'solution' },
  { id: 'why-us', label: 'Why us', variant: 'split', backdrop: 'glow', contentKey: 'whyUs' },
  { id: 'modules', label: 'Modules', variant: 'split-reverse', backdrop: 'light', contentKey: 'modules' },
  { id: 'process', label: 'Process', variant: 'split', backdrop: 'muted', contentKey: 'process' },
  { id: 'portfolio-production', label: 'Portfolio', variant: 'split-reverse', backdrop: 'glow', contentKey: 'portfolioProduction' },
  { id: 'portfolio-services', label: 'Portfolio', variant: 'split', backdrop: 'muted', contentKey: 'portfolioServices' },
  { id: 'contact', label: 'Contact', variant: 'split-reverse', backdrop: 'glow', contentKey: 'contact' },
];

export function getSlideIndex(slides: SlideMeta[], id: SlideId): number {
  return slides.findIndex((s) => s.id === id);
}

export function getSlideCount(): number {
  return slideMetaList.length;
}

export type NavSectionId = 'home' | 'about' | 'solutions' | 'contact';

export interface NavSection {
  id: NavSectionId;
  label: { id: string; en: string };
  /** Slide to scroll to when the nav item is clicked */
  slideId: SlideId;
  /** First slide where this section becomes active (defaults to slideId) */
  groupStartSlideId?: SlideId;
}

/** Primary navbar — 4 grouped sections */
export const navSections: NavSection[] = [
  { id: 'home', label: { id: 'Beranda', en: 'Home' }, slideId: 'hero' },
  {
    id: 'about',
    label: { id: 'Tentang', en: 'About' },
    slideId: 'about-company',
    groupStartSlideId: 'about-company',
  },
  {
    id: 'solutions',
    label: { id: 'Solusi', en: 'Solutions' },
    slideId: 'solution',
    groupStartSlideId: 'problem',
  },
  { id: 'contact', label: { id: 'Kontak', en: 'Contact' }, slideId: 'contact' },
];

export function getActiveNavSection(activeSlide: number): NavSectionId {
  let active: NavSectionId = navSections[0].id;

  for (const section of navSections) {
    const startId = section.groupStartSlideId ?? section.slideId;
    const index = getSlideIndex(slideMetaList, startId);
    if (index >= 0 && activeSlide >= index) active = section.id;
  }

  return active;
}
