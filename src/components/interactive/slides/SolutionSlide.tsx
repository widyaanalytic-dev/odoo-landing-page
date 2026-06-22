import { BadgeCheck, Layers, Settings2, type LucideIcon } from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { useLang } from '../LangProvider';
import { CopyBlock } from '../ui/CopyBlock';
import { ProofHeadline } from '../ui/ProofHeadline';
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
      copyClassName="min-w-0 max-w-md lg:max-w-lg"
      visual={<SolutionVisual slideIndex={index} />}
      headline={
        <ProofHeadline
          variant="compact"
          lead={content.highlight.lead}
          accent={content.highlight.accent}
        />
      }
    >
      <CopyBlock delay={0.12}>
        <p className="text-body mt-4 text-brand-navy/75 sm:mt-5 lg:mt-6">
          {content.description.before}
          <strong className="font-semibold text-brand-deep-navy">{content.description.emphasis}</strong>
          {content.description.after}
        </p>
      </CopyBlock>

      <CopyBlock delay={0.2}>
        <ul className="mt-4 space-y-3 sm:mt-5 lg:space-y-3.5">
          {content.bullets.map((bullet) => {
            const Icon = bulletIcons[bullet.iconId];

            return (
              <li key={bullet.title} className="flex gap-3 sm:gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-cyan/25 bg-white/90 text-brand-cyan shadow-sm sm:h-10 sm:w-10">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold text-brand-deep-navy sm:text-base">{bullet.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-brand-navy/65">{bullet.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CopyBlock>
    </SplitSlide>
  );
}
