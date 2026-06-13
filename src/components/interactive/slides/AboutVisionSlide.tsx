import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { aboutSlideClass, SlideLayout } from '../ui/SlideLayout';
import { AboutVisionVisual } from '../visuals/AboutVisionVisual';

export function AboutVisionSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.aboutVision, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      className={aboutSlideClass}
      visual={
        <AboutVisionVisual
          slideIndex={index}
          missionLabel={content.missionLabel}
          missions={content.missions ?? []}
        />
      }
    >
      <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-lg">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <CopyBlock>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/40">{content.visionLabel}</p>
          <p className="text-body mt-3 leading-relaxed text-brand-navy/75 sm:mt-4 lg:mt-5">{content.vision}</p>
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
