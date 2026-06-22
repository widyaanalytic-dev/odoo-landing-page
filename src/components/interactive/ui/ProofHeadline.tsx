import { AnimatedUnderline } from './AnimatedUnderline';

interface ProofHeadlineProps {
  lead?: string;
  accent: string;
  accentClassName?: string;
  /** Smaller two-line headline */
  variant?: 'default' | 'compact';
}

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
