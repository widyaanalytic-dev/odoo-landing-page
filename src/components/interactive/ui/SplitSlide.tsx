import type { ReactNode } from 'react';
import type { SlideComponentProps } from '../../../data/slides.config';
import { CopyBlock } from './CopyBlock';
import { Eyebrow } from './Eyebrow';
import { SlideLayout } from './SlideLayout';

interface SplitSlideProps extends SlideComponentProps {
  eyebrow: string;
  visual: ReactNode;
  headline: ReactNode;
  children?: ReactNode;
  className?: string;
  copyClassName?: string;
}

export function SplitSlide({
  index,
  meta,
  eyebrow,
  visual,
  headline,
  children,
  className,
  copyClassName = 'min-w-0 max-w-xl lg:max-w-2xl',
}: SplitSlideProps) {
  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      className={className}
      visual={visual}
    >
      <div className={copyClassName}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <CopyBlock>{headline}</CopyBlock>
        {children}
      </div>
    </SlideLayout>
  );
}
