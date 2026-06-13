import { Check } from 'lucide-react';
import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';
import type { WhyUsEditionsScene } from './types';

interface EditionsSceneProps {
  scene: WhyUsEditionsScene;
  active: boolean;
  reducedMotion: boolean | null;
}

export function EditionsScene({ scene, active, reducedMotion }: EditionsSceneProps) {
  const editions = [
    { key: 'community', ...scene.community },
    { key: 'enterprise', ...scene.enterprise },
  ] as const;

  return (
    <div className="flex min-h-0 flex-col py-1">
      <div className="relative grid grid-cols-2 gap-2.5">
        {editions.map((edition, i) => (
          <motion.div
            key={edition.key}
            className="relative overflow-hidden rounded-xl border border-brand-navy/8 bg-white/80 px-3 py-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : 0.08 + i * 0.12,
              ease: fluidEase,
            }}
          >
            <motion.span
              className="absolute inset-x-0 top-0 h-0.5 origin-left bg-brand-cyan"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{
                duration: 0.45,
                delay: reducedMotion ? 0 : 0.2 + i * 0.14,
                ease: fluidEase,
              }}
            />
            <p className="text-xs font-bold uppercase tracking-wide text-brand-deep-navy">{edition.label}</p>
            <p className="mt-1 text-[11px] leading-snug text-brand-navy/55">{edition.note}</p>
          </motion.div>
        ))}

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-cyan/30 bg-white text-brand-cyan shadow-sm"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
          transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.38, ease: fluidEase }}
          aria-hidden
        >
          <span className="text-[10px] font-bold">vs</span>
        </motion.div>
      </div>

      <motion.div
        className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-cyan"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.48, ease: fluidEase }}
      >
        <Check size={14} strokeWidth={2.5} />
        {scene.verdict}
      </motion.div>

      <motion.p
        className="mt-2 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.58, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
