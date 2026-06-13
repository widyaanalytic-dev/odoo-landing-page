import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { ProofSlide } from '../ui/ProofSlide';
import { proofSlideClass } from '../ui/SlideLayout';
import { ProcessVisual } from '../visuals/ProcessVisual';

export function ProcessSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.process, locale);

  return (
    <ProofSlide
      index={index}
      meta={meta}
      className={proofSlideClass}
      content={content}
      visual={<ProcessVisual slideIndex={index} />}
    />
  );
}
