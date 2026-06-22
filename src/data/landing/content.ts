import { hero } from './sections/hero';
import { aboutCompany } from './sections/about-company';
import { aboutVision } from './sections/about-vision';
import { aboutProducts } from './sections/about-products';
import { pain } from './sections/pain/index';
import { problem } from './sections/problem';
import { empathy } from './sections/empathy';
import { solution } from './sections/solution';
import { whyUs } from './sections/why-us';
import { modules } from './sections/modules';
import { process } from './sections/process';
import { portfolio } from './sections/portfolio';
import { contact } from './sections/contact';

export const landingContent = {
  hero,
  aboutCompany,
  aboutVision,
  aboutProducts,
  pain,
  problem,
  empathy,
  solution,
  whyUs,
  modules,
  process,
  portfolio,
  contact,
} as const;
