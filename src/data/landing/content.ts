import { hero } from './sections/hero';
import { aboutCompany } from './sections/about-company';
import { aboutVision } from './sections/about-vision';
import { aboutProducts } from './sections/about-products';
import { pain } from './sections/pain';
import { problem } from './sections/problem';
import { painChecklist1 } from './sections/pain-checklist1';
import { painChecklist2 } from './sections/pain-checklist2';
import { painVisual } from './sections/pain-visual';
import { empathy } from './sections/empathy';
import { solution } from './sections/solution';
import { whyUs } from './sections/why-us';
import { modules } from './sections/modules';
import { process } from './sections/process';
import { portfolioProduction } from './sections/portfolio-production';
import { portfolioServices } from './sections/portfolio-services';
import { cta } from './sections/cta';

export const landingContent = {
  hero,
  aboutCompany,
  aboutVision,
  aboutProducts,
  pain,
  problem,
  painChecklist1,
  painChecklist2,
  painVisual,
  empathy,
  solution,
  whyUs,
  modules,
  process,
  portfolioProduction,
  portfolioServices,
  cta,
} as const;
