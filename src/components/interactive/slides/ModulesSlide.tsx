import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { ProofSlide } from '../ui/ProofSlide';
import { proofVisualCenterClass } from '../ui/SlideLayout';
import { ModulesVisual } from '../visuals/ModulesVisual';

export function ModulesSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.modules, locale);

  return (
    <ProofSlide
      index={index}
      meta={meta}
      className={proofVisualCenterClass}
      content={content}
      accentOnly
      visual={<ModulesVisual slideIndex={index} />}
    />
  );
}
