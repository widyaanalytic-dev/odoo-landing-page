import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { CONTACT_EMAIL, landingContent, t } from '../../../data/landing';
import type { SlideComponentProps } from '../../../data/slides.config';
import { cn } from '../../../lib/cn';
import { useLang } from '../LangProvider';
import { Button } from '../ui/Button';
import { CopyBlock } from '../ui/CopyBlock';
import { Eyebrow } from '../ui/Eyebrow';
import { ProofHeadline } from '../ui/ProofHeadline';
import { contactProofClass, SlideLayout } from '../ui/SlideLayout';
import { CtaVisual } from '../visuals/CtaVisual';

export function ContactSlide({ index, meta }: SlideComponentProps) {
  const { locale } = useLang();
  const content = t(landingContent.contact, locale);
  const visual = content.visual;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <SlideLayout
      index={index}
      sectionLabel={meta.label}
      backdrop={meta.backdrop}
      variant={meta.variant}
      className={contactProofClass}
      visual={<CtaVisual slideIndex={index} />}
    >
      <div className="mx-auto w-full min-w-0 max-w-md text-center lg:max-w-lg lg:text-left">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <CopyBlock>
          <ProofHeadline variant="compact" lead={content.highlight.lead} accent={content.highlight.accent} />
        </CopyBlock>

        <CopyBlock delay={0.1}>
          <p className="text-body mt-4 max-w-sm text-brand-navy/70 sm:mt-5 lg:mt-6">{content.description}</p>
        </CopyBlock>

        <CopyBlock delay={0.16}>
          <div className="mt-5 rounded-xl border border-brand-navy/10 bg-white/70 p-4 backdrop-blur-sm sm:mt-7 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/40">{visual.emailLabel}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block break-all text-lg font-semibold text-brand-deep-navy transition-colors hover:text-brand-cyan sm:text-xl"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className={cn(
                  'inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors',
                  copied ? 'text-emerald-600' : 'text-brand-navy/50 hover:text-brand-cyan',
                )}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? visual.copiedLabel : visual.copyLabel}
              </button>

              <Button
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex w-full items-center justify-center gap-2 !px-6 !py-3.5 !text-sm sm:w-fit"
              >
                {content.cta}
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </CopyBlock>

        <CopyBlock delay={0.22}>
          <p className="mt-4 text-sm text-brand-navy/55 sm:mt-5 lg:mt-6">{content.response}</p>
        </CopyBlock>
      </div>
    </SlideLayout>
  );
}
