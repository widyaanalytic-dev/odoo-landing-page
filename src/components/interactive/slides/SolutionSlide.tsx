import { BadgeCheck, Layers, Settings2, type LucideIcon } from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { AnimatedUnderline } from '../ui/AnimatedUnderline';
import { CopyBlock } from '../ui/CopyBlock';
import { SplitSlide } from '../ui/SplitSlide';
import { SolutionVisual } from '../visuals/SolutionVisual';

const bulletIcons: Record<'layers' | 'settings' | 'badge', LucideIcon> = {
  layers: Layers,
  settings: Settings2,
  badge: BadgeCheck,
};

export function SolutionSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.solution, locale);

  return (
    <SplitSlide
      index={index}
      meta={meta}
      eyebrow={content.eyebrow}
      className="items-center justify-center pt-[var(--mobile-header-offset)] pb-12 sm:pb-16 lg:items-start lg:pt-32 lg:pb-36"
      visual={<SolutionVisual slideIndex={index} />}
      headline={
        <h2 className="text-headline-lg text-brand-deep-navy">
          <span className="block">{content.highlight.lead}</span>
          <span className="mt-1 block">
            <AnimatedUnderline delay={0.12} wrap className="text-brand-deep-navy">
              {content.highlight.accent}
            </AnimatedUnderline>
          </span>
        </h2>
      }
    >
      <CopyBlock delay={0.12}>
        <p className="text-body-lg mt-5 text-brand-navy/75 sm:mt-6 lg:mt-7">
          {content.description.before}
          <strong className="font-bold text-brand-deep-navy">{content.description.emphasis}</strong>
          {content.description.after}
        </p>
      </CopyBlock>

      <CopyBlock delay={0.2}>
        <ul className="mt-4 space-y-2.5 sm:mt-5 lg:mt-6 lg:space-y-4">
          {content.bullets.map((bullet) => {
            const Icon = bulletIcons[bullet.iconId];

            return (
              <li key={bullet.title} className="flex gap-3.5 sm:gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-cyan/25 bg-white/90 text-brand-cyan shadow-sm sm:h-11 sm:w-11">
                  <Icon size={17} strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-body font-bold text-brand-deep-navy sm:text-body-lg">{bullet.title}</p>
                  <p className="text-body mt-0.5 text-brand-navy/70 sm:mt-1">{bullet.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CopyBlock>
    </SplitSlide>
  );
}
