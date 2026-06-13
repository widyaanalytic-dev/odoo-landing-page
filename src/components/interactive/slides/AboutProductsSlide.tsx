import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { AnimatedUnderline } from '../ui/AnimatedUnderline';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { SlideLayout } from '../ui/SlideLayout';
import { AboutProductsVisual } from '../visuals/AboutProductsVisual';

export function AboutProductsSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.aboutProducts, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<AboutProductsVisual slideIndex={index} products={content.products ?? []} />}
    >
      <div className="mx-auto flex w-full max-w-lg flex-col items-center px-1 text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <CopyBlock>
          <h2 className="text-headline-lg text-balance text-brand-deep-navy">
            <AnimatedUnderline delay={0.12} wrap className="text-brand-deep-navy">
              {content.headline}
            </AnimatedUnderline>
          </h2>
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
