import { CONTACT_EMAIL, landingContent, t } from '../../../data/landing';
import { partnerLogos } from '../../../data/partners';
import type { SlideComponentProps } from '../../../data/slides.config';
import { Award } from '../../../lib/icons';
import { useLang } from '../LangProvider';
import { useScrollState } from '../ScrollContext';
import { AnimatedUnderline } from '../ui/AnimatedUnderline';
import { Button } from '../ui/Button';
import { ClientLogoSlider } from '../ui/ClientLogoSlider';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { SlideLayout } from '../ui/SlideLayout';
import { HeroVisual } from '../visuals/HeroVisual';

export function HeroSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const { scrollToSlideById } = useScrollState();
  const content = t(landingContent.hero, locale);

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      visual={<HeroVisual slideIndex={index} />}
      footer={<ClientLogoSlider label={content.trustedLogosLabel} items={partnerLogos} slow />}
    >
      <CopyBlock>
        <Eyebrow>{content.eyebrow}</Eyebrow>
      </CopyBlock>

      <CopyBlock delay={0.05}>
        <h1 className="text-display-hero text-balance text-brand-deep-navy">
          {content.h1.before}
          <AnimatedUnderline delay={0.2}>{content.h1.highlight}</AnimatedUnderline>
          {content.h1.after}
        </h1>
      </CopyBlock>

      <CopyBlock delay={0.1}>
        <p className="mt-3 max-w-md text-[0.8125rem] leading-[1.7] text-brand-navy/70 sm:mt-4 sm:text-sm md:text-[0.9375rem]">
          {content.description}
        </p>
      </CopyBlock>

      <CopyBlock delay={0.12}>
        <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-brand-navy/65 sm:mt-4">
          <Award className="mt-0.5 shrink-0 text-brand-cyan" size={18} strokeWidth={2} />
          <span>{content.trust}</span>
        </p>
      </CopyBlock>

      <CopyBlock delay={0.18}>
        <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
          <Button variant="primary" href={`mailto:${CONTACT_EMAIL}`} className="!px-6 !py-3 !text-sm sm:!px-7 sm:!py-3.5">
            {content.ctaPrimary}
          </Button>
          <Button
            variant="secondary"
            onClick={() => scrollToSlideById('portfolio')}
            className="!px-6 !py-3 !text-sm sm:!px-7 sm:!py-3.5"
          >
            {content.ctaSecondary}
          </Button>
        </div>
      </CopyBlock>

      <p className="mt-4 hidden text-xs tracking-wide text-brand-navy/40 sm:mt-6 sm:block">{content.badge}</p>
    </SlideLayout>
  );
}
