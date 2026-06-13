import type { ComponentType } from 'react';
import type { SlideComponentProps, SlideId } from '../../../data/slides.config';

export type { SlideComponentProps };
import { AboutCompanySlide } from './AboutCompanySlide';
import { AboutProductsSlide } from './AboutProductsSlide';
import { AboutVisionSlide } from './AboutVisionSlide';
import { ContactSlide } from './ContactSlide';
import { EmpathySlide } from './EmpathySlide';
import { HeroSlide } from './HeroSlide';
import { ModulesSlide } from './ModulesSlide';
import { PainDataSlide } from './PainDataSlide';
import { PainProcessSlide } from './PainProcessSlide';
import { PortfolioProductionSlide } from './PortfolioProductionSlide';
import { PortfolioServicesSlide } from './PortfolioServicesSlide';
import { ProblemSlide } from './ProblemSlide';
import { ProcessSlide } from './ProcessSlide';
import { SolutionSlide } from './SolutionSlide';
import { WhyUsSlide } from './WhyUsSlide';

export const slideComponents: Record<SlideId, ComponentType<SlideComponentProps>> = {
  hero: HeroSlide,
  'about-company': AboutCompanySlide,
  'about-vision': AboutVisionSlide,
  'about-products': AboutProductsSlide,
  problem: ProblemSlide,
  'pain-data': PainDataSlide,
  'pain-process': PainProcessSlide,
  empathy: EmpathySlide,
  solution: SolutionSlide,
  'why-us': WhyUsSlide,
  modules: ModulesSlide,
  process: ProcessSlide,
  'portfolio-production': PortfolioProductionSlide,
  'portfolio-services': PortfolioServicesSlide,
  contact: ContactSlide,
};
