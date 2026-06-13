import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { Award } from '../../../lib/icons';
import { useLang } from '../LangProvider';
import { AnimatedUnderline } from '../ui/AnimatedUnderline';
import { CopyBlock } from '../ui/CopyBlock';
import { aboutSlideClass, SlideLayout } from '../ui/SlideLayout';
import { AboutCompanyVisual } from '../visuals/AboutCompanyVisual';

export function AboutCompanySlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.aboutCompany, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      className={aboutSlideClass}
      visual={<AboutCompanyVisual slideIndex={index} focusAreas={content.focusAreas ?? []} />}
    >
      <div className="mx-auto min-w-0 w-full max-w-md lg:max-w-lg">
        <CopyBlock>
          <img
            src="/logo.png"
            alt="Widya Analytic"
            className="mb-4 h-9 w-auto object-contain object-left sm:mb-6 sm:h-10"
            width={160}
            height={40}
            decoding="async"
          />
        </CopyBlock>

        <CopyBlock delay={0.04}>
          <h2 className="text-headline-lg text-brand-deep-navy">
            <AnimatedUnderline delay={0.12} className="text-brand-deep-navy">
              {content.headline}
            </AnimatedUnderline>
          </h2>
        </CopyBlock>

        <CopyBlock delay={0.06}>
          <p className="mt-3 text-sm text-brand-navy/45">{content.legalSubtitle}</p>
        </CopyBlock>

        <CopyBlock delay={0.12}>
          <p className="text-body mt-4 text-brand-navy/75 sm:mt-6 lg:mt-7">
            {content.body.before}
            <strong className="font-bold text-brand-deep-navy">{content.body.emphasis}</strong>
            {content.body.after}
          </p>
        </CopyBlock>

        <CopyBlock delay={0.18}>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-brand-navy/65 sm:mt-6 lg:mt-7">
            <Award className="mt-0.5 shrink-0 text-brand-cyan" size={18} strokeWidth={2} />
            <span>{content.trustLine}</span>
          </p>
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
