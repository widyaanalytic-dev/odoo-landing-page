import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import type { BackdropVariant, SlideVariant } from '../../../data/slide-layout.types';
import { cn } from '../../../lib/cn';

export type { BackdropVariant, SlideVariant };

/** Proof slides (7–14): padding + visual height cap via grid child */
export const proofSlideClass =
  'items-center justify-center pt-[var(--mobile-header-offset)] pb-12 sm:pb-16 lg:pt-32 lg:pb-36 [&_.grid]:min-h-0 [&_.grid]:w-full [&_.grid]:items-center [&_.grid]:justify-items-center [&_.grid>*:last-child]:min-h-0 lg:[&_.grid>*:last-child]:max-h-[min(32rem,calc(100dvh-12rem))]';

/** Centers the visual column on proof slides with interactive panels */
export const proofVisualCenterClass = `${proofSlideClass} [&_.grid>*:last-child]:flex [&_.grid>*:last-child]:items-center [&_.grid>*:last-child]:justify-center`;

/** About slides: balanced copy + visual alignment */
export const aboutSlideClass = `${proofSlideClass} lg:items-center [&_.grid]:lg:gap-16 [&_.grid]:xl:gap-20 [&_.grid>*:first-child]:flex [&_.grid>*:first-child]:justify-center [&_.grid>*:last-child]:flex [&_.grid>*:last-child]:items-center [&_.grid>*:last-child]:justify-center`;

/** Portfolio proof slides */
export const portfolioProofClass = proofVisualCenterClass;

/** Contact slide: visual aligned start on large screens */
export const contactProofClass = `${proofVisualCenterClass} lg:[&_.grid>*:last-child]:justify-start`;

interface SlideLayoutProps {
  index: number;
  children: ReactNode;
  visual?: ReactNode;
  footer?: ReactNode;
  className?: string;
  dark?: boolean;
  variant?: SlideVariant;
  backdrop?: BackdropVariant;
  sectionLabel?: string;
}

const backdropStyles: Record<BackdropVariant, string> = {
  light: 'from-white via-[#fafcfe] to-[#eef4f8]',
  muted: 'from-brand-muted via-[#f0f7fb] to-[#e8f2f8]',
  dark: 'from-brand-deep-navy via-[#0f3050] to-brand-deep-navy',
  glow: 'from-[#e8f6fc] via-white to-brand-muted',
};

const gridVariants: Record<SlideVariant, string> = {
  hero: 'grid-cols-1 gap-6 min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-10 xl:gap-14',
  split: 'grid-cols-1 gap-6 w-full min-h-0 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:gap-28',
  'split-reverse':
    'grid-cols-1 gap-6 w-full min-h-0 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:gap-28 lg:[&>*:first-child]:order-2',
  'visual-wide':
    'grid-cols-1 gap-6 w-full min-h-0 items-start sm:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-20 xl:gap-24',
  centered: 'grid-cols-1 place-items-center text-center gap-8 min-h-0 sm:gap-10 lg:gap-16',
  'text-only': 'grid-cols-1 max-w-3xl min-h-0',
};

const copyVariants: Partial<Record<SlideVariant, string>> = {
  hero: 'max-w-xl lg:py-2 min-h-0',
  centered: 'max-w-2xl min-h-0',
};

const visualVariants: Partial<Record<SlideVariant, string>> = {
  centered: 'w-full max-w-3xl min-h-0',
};

export function SlideLayout({
  index,
  children,
  visual,
  footer,
  className,
  dark = false,
  variant = visual ? 'split' : 'text-only',
  backdrop = 'light',
  sectionLabel,
}: SlideLayoutProps) {
  const resolvedVariant = visual ? variant : 'text-only';
  const isCenteredSection = resolvedVariant === 'centered';

  return (
    <section
      data-slide={index}
      role="region"
      aria-label={sectionLabel}
      className={cn(
        'slide-section relative isolate flex flex-col px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24',
        dark && 'text-white',
        resolvedVariant === 'hero' &&
          'items-center justify-center pb-12 pt-[var(--mobile-header-offset)] sm:pb-20 lg:pb-32 lg:pt-32',
        isCenteredSection &&
          'items-center justify-center pb-12 pt-[var(--mobile-header-offset)] sm:pb-20 lg:pb-32 lg:pt-32',
        !['hero', 'centered'].includes(resolvedVariant) &&
          'items-center justify-center pb-12 pt-[var(--mobile-header-offset)] sm:pb-16 lg:pb-36 lg:pt-36',
        className,
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br',
          backdropStyles[dark ? 'dark' : backdrop],
        )}
      />
      <div className={cn('texture-dots pointer-events-none absolute inset-0', dark ? 'opacity-10' : 'opacity-30')} />
      <div className="texture-grain pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col justify-center">
        <div className={cn('grid min-h-0 w-full flex-1 items-center justify-items-center', gridVariants[resolvedVariant])}>
          <motion.div
            className={cn(
              'min-h-0 min-w-0 w-full',
              resolvedVariant === 'centered' ? 'max-w-2xl' : 'mx-auto max-w-xl lg:mx-0 lg:max-w-none',
              copyVariants[resolvedVariant],
            )}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>

          {visual &&
            (resolvedVariant === 'hero' ? (
              <div className="flex min-h-0 min-w-0 w-full justify-center lg:justify-end">{visual}</div>
            ) : (
              <motion.div
                className={cn(
                  'min-w-0 w-full mx-auto flex justify-center lg:mx-0 lg:block',
                  resolvedVariant === 'visual-wide' ? 'min-h-min lg:min-h-0' : 'min-h-0',
                  visualVariants[resolvedVariant],
                )}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {visual}
              </motion.div>
            ))}
        </div>

        {footer && <div className="relative z-10 mt-6 shrink-0 sm:mt-8 lg:mt-10">{footer}</div>}
      </div>
    </section>
  );
}
