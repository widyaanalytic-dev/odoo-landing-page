import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { partnerLogos } from '../../../data/partners';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { fluidEase, smoothEase } from '../../../lib/motion';
import { useLang } from '../LangProvider';
import { PartnerLogoGrid } from '../ui/PartnerLogoGrid';
import { PortfolioShell } from '../ui/PortfolioShell';

interface PortfolioVisualProps {
  slideIndex: number;
}

export function PortfolioVisual({ slideIndex }: PortfolioVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const content = t(landingContent.portfolio, locale);
  const [visible, setVisible] = useState(false);
  const [partnersPage, setPartnersPage] = useState(1);

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
      transition={{ duration: 0.6, ease: smoothEase }}
      className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl"
    >
      <PortfolioShell>
        <div className="flex flex-col gap-7 sm:gap-8">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
            {content.visual.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reducedMotion ? 0 : i * 0.08,
                  ease: fluidEase,
                }}
                className="flex items-baseline gap-1.5 rounded-full bg-brand-cyan/[0.07] px-3.5 py-2 sm:px-4 sm:py-2.5"
              >
                <span className="text-lg font-bold text-brand-deep-navy sm:text-xl">{stat.value}</span>
                <span className="text-[0.6875rem] font-medium text-brand-navy/50 sm:text-xs">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent"
            aria-hidden
          />

          <PartnerLogoGrid
            items={partnerLogos}
            showNames
            pagination={{
              page: partnersPage,
              pageSize: 8,
              onPageChange: setPartnersPage,
              prevLabel: content.visual.pagination.prev,
              nextLabel: content.visual.pagination.next,
            }}
          />
        </div>
      </PortfolioShell>
    </motion.div>
  );
}
