import { AnimatedUnderline } from './AnimatedUnderline';

interface ProofHeadlineProps {
  lead?: string;
  accent: string;
  accentClassName?: string;
  /** Smaller two-line headline — for long copy on proof slides */
  variant?: 'default' | 'compact';
}

/** Matches Solution/Empathy headline — inline lead + underline accent, with safe wrap */
export function ProofHeadline({
  lead,
  accent,
  accentClassName = 'text-brand-deep-navy',
  variant = 'default',
}: ProofHeadlineProps) {
  if (variant === 'compact') {
    return (
      <h2 className="text-brand-deep-navy">
        {lead ? <span className="text-lead block font-semibold text-brand-navy/45">{lead}</span> : null}
        <span className={`text-headline block ${lead ? 'mt-1' : ''}`}>
          <AnimatedUnderline delay={0.12} wrap className={accentClassName}>
            {accent}
          </AnimatedUnderline>
        </span>
      </h2>
    );
  }

  return (
    <h2 className="text-headline-lg text-brand-deep-navy">
      {lead ? `${lead} ` : null}
      <AnimatedUnderline delay={0.12} wrap className={accentClassName}>
        {accent}
      </AnimatedUnderline>
    </h2>
  );
}
