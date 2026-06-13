import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { AnimatedChecklist } from '../AnimatedChecklist';
import { useLang } from '../LangProvider';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { SlideLayout } from '../ui/SlideLayout';
import { PainDataVisual } from '../visuals/PainDataVisual';

export function PainDataSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<PainDataVisual slideIndex={index} />}
    >
      <div className="min-w-0 max-w-xl lg:max-w-2xl">
        <Eyebrow>{t(landingContent.pain, locale).data}</Eyebrow>
        <CopyBlock delay={0.08}>
          <AnimatedChecklist items={landingContent.painChecklist1} slideIndex={index} />
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
