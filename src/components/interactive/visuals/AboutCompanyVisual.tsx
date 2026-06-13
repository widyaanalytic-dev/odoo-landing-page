import { fluidEase } from '../../../lib/motion';
import { BarChart3, Brain, Layers, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { NotepadFrame } from '../ui/NotepadFrame';
import { useSlideVisibility } from '../../../hooks/useSlideVisibility';

const focusIcons: Record<string, LucideIcon> = {
  data: BarChart3,
  ai: Brain,
  odoo: Layers,
};

interface AboutCompanyVisualProps {
  slideIndex: number;
  focusAreas: ReadonlyArray<{ iconId: string; label: string; blurb: string }>;
}

export function AboutCompanyVisual({ slideIndex, focusAreas }: AboutCompanyVisualProps) {
  const visible = useSlideVisibility(slideIndex);


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className="mx-auto w-full max-w-sm lg:max-w-md"
    >
      <NotepadFrame className="shadow-[0_12px_32px_-20px_rgba(14,42,71,0.18)]">
        <ul className="divide-y divide-brand-navy/8">
          {focusAreas.map((area, i) => {
            const Icon = focusIcons[area.iconId] ?? BarChart3;

            return (
              <motion.li
                key={area.iconId}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: fluidEase }}
                className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0 sm:gap-3.5 sm:py-4"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-cyan/10 text-brand-cyan">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-semibold leading-snug text-brand-deep-navy">{area.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-navy/55">{area.blurb}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </NotepadFrame>
    </motion.div>
  );
}
