import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { RowStaggerHighlight } from '../ui/RowStaggerHighlight';
import { SlideLayout } from '../ui/SlideLayout';
import { ProblemVisual } from '../visuals/ProblemVisual';

export function ProblemSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.problem, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<ProblemVisual slideIndex={index} />}
    >
      <div className="mx-auto min-w-0 w-full max-w-xl overflow-visible lg:max-w-2xl lg:overflow-hidden">
        <p className="text-lead text-brand-navy/75">{content.lead}</p>
        <RowStaggerHighlight text={content.highlight} />
      </div>
    </SlideLayout>
  );
}
