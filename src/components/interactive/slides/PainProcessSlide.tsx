import { landingContent, t } from '../../../data/landing';
import { painSlideSlices } from '../../../data/slide-content.map';
import type { SlideComponentProps } from '../../../data/slides.config';
import { AnimatedChecklist } from '../ui/AnimatedChecklist';
import { useLang } from '../LangProvider';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { SlideLayout } from '../ui/SlideLayout';
import { PainProcessVisual } from '../visuals/PainProcessVisual';

export function PainProcessSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<PainProcessVisual slideIndex={index} />}
    >
      <div className="min-w-0 max-w-xl lg:max-w-2xl">
        <Eyebrow>{t(landingContent.pain.labels, locale)[painSlideSlices['pain-process'].eyebrow]}</Eyebrow>
        <CopyBlock delay={0.08}>
          <AnimatedChecklist items={landingContent.pain.checklist2} slideIndex={index} />
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
