import type { BackdropVariant, SlideVariant } from '../components/interactive/ui/SlideLayout';

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
}

export type SlideComponentProps = { index: number; meta: SlideMeta };

export const slideMetaList: SlideMeta[] = [
  { id: 'hero', label: 'Hero', variant: 'hero', backdrop: 'glow' },
  { id: 'about-company', label: 'About', variant: 'split', backdrop: 'muted' },
  { id: 'about-vision', label: 'About', variant: 'split', backdrop: 'light' },
  { id: 'about-products', label: 'Products', variant: 'centered', backdrop: 'muted' },
  { id: 'problem', label: 'Problem', variant: 'visual-wide', backdrop: 'light' },
  { id: 'pain-data', label: 'Pain', variant: 'split', backdrop: 'muted' },
  { id: 'pain-process', label: 'Pain', variant: 'split-reverse', backdrop: 'light' },
  { id: 'empathy', label: 'Empathy', variant: 'split', backdrop: 'glow' },
  { id: 'solution', label: 'Solution', variant: 'split-reverse', backdrop: 'muted' },
  { id: 'why-us', label: 'Why us', variant: 'split', backdrop: 'glow' },
  { id: 'modules', label: 'Modules', variant: 'split-reverse', backdrop: 'light' },
  { id: 'process', label: 'Process', variant: 'split', backdrop: 'muted' },
  { id: 'portfolio-production', label: 'Portfolio', variant: 'split-reverse', backdrop: 'glow' },
  { id: 'portfolio-services', label: 'Portfolio', variant: 'split', backdrop: 'muted' },
  { id: 'contact', label: 'Contact', variant: 'split-reverse', backdrop: 'glow' },
];

export function getSlideIndex(slides: SlideMeta[], id: SlideId): number {
  return slides.findIndex((s) => s.id === id);
}

export function getSlideCount(): number {
  return slideMetaList.length;
}

export type NavSectionId = 'home' | 'about' | 'products' | 'solution' | 'modules' | 'portfolio' | 'contact';

export interface NavSection {
  id: NavSectionId;
  label: { id: string; en: string };
  slideId: SlideId;
}

/** Primary navbar sections — each jumps to the first slide in that group */
export const navSections: NavSection[] = [
  { id: 'home', label: { id: 'Beranda', en: 'Home' }, slideId: 'hero' },
  { id: 'about', label: { id: 'Tentang', en: 'About' }, slideId: 'about-company' },
  { id: 'products', label: { id: 'Produk', en: 'Products' }, slideId: 'about-products' },
  { id: 'solution', label: { id: 'Solusi', en: 'Solution' }, slideId: 'solution' },
  { id: 'modules', label: { id: 'Modul', en: 'Modules' }, slideId: 'modules' },
  { id: 'portfolio', label: { id: 'Portofolio', en: 'Portfolio' }, slideId: 'portfolio-production' },
  { id: 'contact', label: { id: 'Kontak', en: 'Contact' }, slideId: 'contact' },
];

export function getActiveNavSection(activeSlide: number): NavSectionId {
  let active: NavSectionId = navSections[0].id;

  for (const section of navSections) {
    const index = getSlideIndex(slideMetaList, section.slideId);
    if (index >= 0 && activeSlide >= index) active = section.id;
  }

  return active;
}
