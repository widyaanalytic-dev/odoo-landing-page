import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { AnimatedUnderline } from '../ui/AnimatedUnderline';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { SlideLayout } from '../ui/SlideLayout';
import { EmpathyVisual } from '../visuals/EmpathyVisual';

export function EmpathySlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.empathy, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<EmpathyVisual slideIndex={index} />}
    >
      <div className="min-w-0 max-w-xl lg:max-w-2xl">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <CopyBlock>
          <h2 className="text-headline-lg text-brand-deep-navy">
            {content.highlight.lead}{' '}
            <AnimatedUnderline delay={0.12} className="text-brand-deep-navy">
              {content.highlight.accent}
            </AnimatedUnderline>
          </h2>
        </CopyBlock>

        <CopyBlock delay={0.12}>
          <p className="text-body-lg mt-4 text-brand-navy/75 sm:mt-6 lg:mt-8">
            {content.body.before}
            <strong className="font-bold text-brand-deep-navy">{content.body.emphasis1}</strong>
            {content.body.middle}
            <strong className="font-bold text-brand-deep-navy">{content.body.emphasis2}</strong>
            {content.body.after}
          </p>
        </CopyBlock>

        <CopyBlock delay={0.2}>
          <p className="text-body-lg mt-4 font-medium text-brand-navy sm:mt-6 md:mt-10">{content.closing}</p>
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
