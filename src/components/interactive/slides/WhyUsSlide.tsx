import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { ProofSlide } from '../ui/ProofSlide';
import { proofVisualCenterClass } from '../ui/SlideLayout';
import { WhyUsVisual } from '../visuals/WhyUsVisual';

export function WhyUsSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.whyUs, locale);

  return (
    <ProofSlide
      index={index}
      meta={meta}
      className={proofVisualCenterClass}
      content={content}
      headlineVariant="compact"
      visual={<WhyUsVisual slideIndex={index} />}
    />
  );
}
