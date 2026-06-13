import type { ReactNode } from 'react';
import type { SlideComponentProps } from '../../../data/slides.config';
import { CopyBlock } from './CopyBlock';
import { Eyebrow } from './Eyebrow';
import { ProofHeadline } from './ProofHeadline';
import { SlideLayout } from './SlideLayout';

interface ProofSlideContent {
  eyebrow: string;
  highlight: { lead?: string; accent: string };
  intro?: string;
}

interface ProofSlideProps extends SlideComponentProps {
  content: ProofSlideContent;
  visual: ReactNode;
  className?: string;
  headlineVariant?: 'default' | 'compact';
  accentOnly?: boolean;
  copyClassName?: string;
  introClassName?: string;
}

export function ProofSlide({
  index,
  meta,
  content,
  visual,
  className,
  headlineVariant = 'default',
  accentOnly = false,
  copyClassName = 'min-w-0 max-w-xl lg:max-w-2xl',
  introClassName = 'text-body-lg mt-4 text-brand-navy/75 sm:mt-6 lg:mt-7',
}: ProofSlideProps) {
  return (
    <SlideLayout index={index} backdrop={meta.backdrop} variant={meta.variant} className={className} sectionLabel={meta.label} visual={visual}>
      <div className={copyClassName}>
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <CopyBlock>
          {accentOnly ? (
            <ProofHeadline accent={content.highlight.accent} />
          ) : (
            <ProofHeadline
              variant={headlineVariant}
              lead={content.highlight.lead}
              accent={content.highlight.accent}
            />
          )}
        </CopyBlock>

        {content.intro ? (
          <CopyBlock delay={0.12}>
            <p className={introClassName}>{content.intro}</p>
          </CopyBlock>
        ) : null}
      </div>
    </SlideLayout>
  );
}
