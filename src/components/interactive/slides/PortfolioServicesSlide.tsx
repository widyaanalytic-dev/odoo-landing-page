import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { ProofSlide } from '../ui/ProofSlide';
import { portfolioProofClass } from '../ui/SlideLayout';
import { PortfolioServicesVisual } from '../visuals/PortfolioServicesVisual';

export function PortfolioServicesSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.portfolioServices, locale);

  return (
    <ProofSlide
      index={index}
      meta={meta}
      className={portfolioProofClass}
      content={content}
      headlineVariant="compact"
      copyClassName="min-w-0 max-w-md lg:max-w-lg"
      introClassName="text-body mt-4 max-w-sm text-brand-navy/70 sm:mt-5 lg:mt-6"
      visual={<PortfolioServicesVisual slideIndex={index} />}
    />
  );
}
