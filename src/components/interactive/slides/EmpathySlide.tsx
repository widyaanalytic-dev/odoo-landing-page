import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { CopyBlock } from '../ui/CopyBlock';
import { ProofHeadline } from '../ui/ProofHeadline';
import { SplitSlide } from '../ui/SplitSlide';
import { EmpathyVisual } from '../visuals/EmpathyVisual';

export function EmpathySlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.empathy, locale);

  return (
    <SplitSlide
      index={index}
      meta={meta}
      eyebrow={content.eyebrow}
      className="items-center justify-center pt-[var(--mobile-header-offset)] pb-12 sm:pb-16 lg:items-start lg:pt-32 lg:pb-36"
      copyClassName="min-w-0 max-w-md overflow-x-clip lg:max-w-lg"
      visual={<EmpathyVisual slideIndex={index} />}
      headline={
        <ProofHeadline
          variant="compact"
          lead={content.highlight.lead}
          accent={content.highlight.accent}
        />
      }
    >
      <CopyBlock delay={0.12}>
        <p className="text-body mt-4 break-words text-brand-navy/75 sm:mt-5 lg:mt-6">
          {content.body.before}
          <strong className="font-semibold text-brand-deep-navy">{content.body.emphasis1}</strong>
          {content.body.middle}
          <strong className="font-semibold text-brand-deep-navy">{content.body.emphasis2}</strong>
          {content.body.after}
        </p>
      </CopyBlock>

      <CopyBlock delay={0.2}>
        <p className="text-body mt-4 text-brand-navy/80 sm:mt-5">{content.closing}</p>
      </CopyBlock>
    </SplitSlide>
  );
}
