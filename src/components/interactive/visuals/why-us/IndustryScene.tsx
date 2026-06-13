import { Globe2 } from 'lucide-react';
import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';
import type { WhyUsIndustryScene } from './types';

interface IndustrySceneProps {
  scene: WhyUsIndustryScene;
  active: boolean;
  reducedMotion: boolean | null;
}

export function IndustryScene({ scene, active, reducedMotion }: IndustrySceneProps) {
  return (
    <div className="flex min-h-0 flex-col py-1">
      <motion.div
        className="mx-auto"
        initial={{ opacity: 0, scale: 0.85, rotate: reducedMotion ? 0 : -12 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85, rotate: 0 }}
        transition={{ duration: 0.5, ease: fluidEase }}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-cyan/20 bg-brand-cyan/8 text-brand-cyan">
          <Globe2 size={20} strokeWidth={2} />
          <motion.span
            className="absolute inset-0 rounded-full border border-brand-cyan/20"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: active ? 1.55 : 1, opacity: active ? 0 : 0.6 }}
            transition={{ duration: 0.85, ease: fluidEase }}
            aria-hidden
          />
        </span>
      </motion.div>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {scene.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className="rounded-full border border-brand-cyan/15 bg-white/80 px-2.5 py-1 text-xs font-medium text-brand-navy/65 shadow-sm"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8, scale: active ? 1 : 0.92 }}
            transition={{
              duration: 0.35,
              delay: reducedMotion ? 0 : 0.12 + i * 0.06,
              ease: fluidEase,
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="mt-3 shrink-0 text-center text-xs font-medium leading-snug text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.55, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
