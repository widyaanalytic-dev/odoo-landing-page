import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { portfolioIcons, type PortfolioIconId } from '../../../lib/icons';

interface EmpathyVisualProps {
  slideIndex: number;
}

export function EmpathyVisual({ slideIndex }: EmpathyVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const content = t(landingContent.empathy, locale).visual;

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.55, ease: fluidEase }}
      className="relative w-full min-w-0 py-2"
    >
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-cyan/[0.08] via-brand-muted/40 to-transparent blur-2xl sm:-inset-x-8 sm:-inset-y-6"
        aria-hidden
      />

      <div className="relative px-1 sm:px-2">
        <div className="relative mb-6 pt-2 sm:mb-10">
          <svg
            className="pointer-events-none absolute left-[10%] right-[10%] top-[1.75rem] h-px overflow-visible sm:top-8"
            viewBox="0 0 400 4"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="0"
              y1="2"
              x2="400"
              y2="2"
              stroke="url(#empathyGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 0 }}
              animate={{ pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: fluidEase }}
            />
            <defs>
              <linearGradient id="empathyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#29abe2" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#29abe2" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#29abe2" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {content.journey.map((stop, i) => {
              const Icon = portfolioIcons[stop.iconId as PortfolioIconId] ?? portfolioIcons.briefcase;

              return (
                <motion.div
                  key={stop.label}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
                  transition={{
                    duration: 0.5,
                    delay: reducedMotion ? 0 : 0.2 + i * 0.16,
                    ease: fluidEase,
                  }}
                >
                  <motion.span
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-brand-cyan/25 bg-white/90 text-brand-cyan shadow-md shadow-brand-cyan/10 sm:mb-3 sm:h-16 sm:w-16"
                    initial={{ scale: reducedMotion ? 1 : 0.88 }}
                    animate={{ scale: visible ? 1 : 0.88 }}
                    transition={{
                      duration: 0.45,
                      delay: reducedMotion ? 0 : 0.25 + i * 0.16,
                      ease: fluidEase,
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </motion.span>
                  <span className="text-xs font-semibold text-brand-navy/85 sm:text-sm">{stop.label}</span>
                  <span className="mt-0.5 text-[10px] text-brand-navy/45 sm:mt-1 sm:text-[11px]">{stop.context}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="mb-6 flex items-end justify-center gap-6 sm:mb-6 sm:gap-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.75, ease: fluidEase }}
        >
          {content.stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="text-4xl font-extrabold tabular-nums tracking-tight text-brand-cyan sm:text-5xl"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.92 }}
                transition={{
                  duration: 0.45,
                  delay: reducedMotion ? 0 : 0.85 + i * 0.1,
                  ease: fluidEase,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-brand-navy/45">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-sm leading-relaxed text-brand-navy/55 sm:text-[15px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : 1, ease: fluidEase }}
        >
          {content.caption}
        </motion.p>

        <motion.p
          className="mt-4 text-center text-[11px] leading-relaxed text-brand-navy/35 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : 1.15, ease: fluidEase }}
        >
          {content.breadth}
        </motion.p>
      </div>
    </motion.div>
  );
}
