import { fluidEase } from '../../../lib/motion';
import { motion } from 'motion/react';
import { NotepadFrame } from '../ui/NotepadFrame';
import { useSlideVisibility } from '../../../hooks/useSlideVisibility';

interface AboutVisionVisualProps {
  slideIndex: number;
  missionLabel: string;
  missions: ReadonlyArray<string>;
}

export function AboutVisionVisual({ slideIndex, missionLabel, missions }: AboutVisionVisualProps) {
  const visible = useSlideVisibility(slideIndex);


  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className="mx-auto w-full max-w-sm lg:max-w-md"
    >
      <NotepadFrame className="shadow-[0_12px_32px_-20px_rgba(14,42,71,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/40">{missionLabel}</p>
        <ol
          className="mt-4 max-h-[min(24rem,calc(100dvh-16rem))] divide-y divide-brand-navy/8 overflow-y-auto sm:mt-5"
          data-lenis-prevent
        >
          {missions.map((mission, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.04, ease: fluidEase }}
              className="flex gap-3 py-3.5 first:pt-0 last:pb-0 sm:gap-3.5 sm:py-4"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-cyan/10 text-xs font-semibold tabular-nums text-brand-cyan">
                {i + 1}
              </span>
              <p className="min-w-0 pt-0.5 text-xs leading-relaxed text-brand-navy/70 sm:text-[0.8125rem]">{mission}</p>
            </motion.li>
          ))}
        </ol>
      </NotepadFrame>
    </motion.div>
  );
}
