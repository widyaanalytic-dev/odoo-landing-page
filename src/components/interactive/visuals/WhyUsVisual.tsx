import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, Globe2, Layers, RefreshCw, Route, type LucideIcon } from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import { assertFound } from '../../../lib/assert';
import { fadeUpTransition, fluidEase } from '../../../lib/motion';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import type { WhyUsPillarId } from './whyUs.visual.config';
import { WHY_US_PILLAR_ORDER } from './whyUs.visual.config';
import { WhyUsPillarScene } from './WhyUsPillarScene';
import { GridDetailExplorer } from '../ui/GridDetailExplorer';
import { NotepadFrame } from '../ui/NotepadFrame';

const pillarIcons: Record<WhyUsPillarId, LucideIcon> = {
  industry: Globe2,
  editions: Layers,
  versions: RefreshCw,
  workflow: Route,
};

interface WhyUsVisualProps {
  slideIndex: number;
}

const visualSlotClass = 'min-h-0 lg:min-h-[min(28rem,calc(100dvh-14rem))]';

function PartnershipLogoBar() {
  return (
    <div className="mb-4 flex shrink-0 items-center justify-center border-b border-brand-navy/8 pb-4 sm:mb-5 sm:pb-5">
      <div className="flex h-11 items-center gap-3 sm:h-12 sm:gap-3.5">
        <img
          src="/logo.png"
          alt="Widya Analytic"
          className="h-8 w-auto object-contain sm:h-9"
          width={120}
          height={36}
          decoding="async"
        />
        <span className="text-sm font-bold text-brand-cyan/45 sm:text-base">×</span>
        <img
          src="/odoo_logo.png"
          alt="Odoo"
          className="h-7 w-auto object-contain sm:h-8"
          width={80}
          height={32}
          decoding="async"
        />
      </div>
    </div>
  );
}

export function WhyUsVisual({ slideIndex }: WhyUsVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activePillar, setActivePillar] = useState<WhyUsPillarId>('industry');
  const [view, setView] = useState<'grid' | 'detail'>('grid');

  const content = t(landingContent.whyUs, locale);

  const pillars = useMemo(
    () =>
      WHY_US_PILLAR_ORDER.map((id) => {
        const bullet = assertFound(
          content.bullets.find((b) => b.iconId === id),
          `Why us bullet missing for pillar "${id}"`,
        );
        return { id, title: bullet.title, text: bullet.text };
      }),
    [content.bullets],
  );

  const activeDetail = pillars.find((p) => p.id === activePillar) ?? pillars[0];
  const activeScene = content.visual.scenes[activePillar];
  const ActiveIcon = pillarIcons[activeDetail.id] ?? Globe2;

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  const openPillar = (id: WhyUsPillarId) => {
    setActivePillar(id);
    setView('detail');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={fadeUpTransition}
      className={`mx-auto flex w-full max-w-lg items-center justify-center px-0 sm:px-1 ${visualSlotClass}`}
    >
      <NotepadFrame>
        <div className="relative flex w-full flex-col">
          <PartnershipLogoBar />

          <GridDetailExplorer
            view={view}
            ariaLabel={content.eyebrow}
            panelId={`why-us-panel-${activePillar}`}
            minHeightClass="relative min-h-0 sm:min-h-[13.5rem] lg:min-h-[14.5rem]"
            detailKey={`scene-${activePillar}`}
            header={
              <div className="mb-3 flex h-8 shrink-0 items-center">
                <AnimatePresence mode="wait" initial={false}>
                  {view === 'detail' && (
                    <motion.button
                      key="back"
                      type="button"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18, ease: fluidEase }}
                      onClick={() => setView('grid')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:text-brand-deep-navy"
                    >
                      <ArrowLeft size={14} />
                      {content.visual.hint}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            }
            grid={
              <>
                {pillars.map((pillar, i) => {
                  const Icon = pillarIcons[pillar.id];

                  return (
                    <motion.button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      aria-selected={activePillar === pillar.id}
                      aria-controls={`why-us-panel-${pillar.id}`}
                      onClick={() => openPillar(pillar.id)}
                      className="group relative flex h-full w-full min-h-[4.75rem] min-w-0 flex-col overflow-hidden rounded-lg border border-brand-navy/10 bg-white/95 p-2.5 text-left shadow-sm shadow-brand-navy/8 transition-all hover:border-brand-cyan/30 hover:shadow-md hover:shadow-brand-cyan/10 sm:min-h-0 sm:p-4"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
                      transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.04 + i * 0.04, ease: fluidEase }}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-brand-cyan/[0.08] via-transparent to-brand-navy/[0.05]" />
                      <div className="texture-grain pointer-events-none absolute inset-0 rounded-lg opacity-70" />
                      <div className="texture-dots pointer-events-none absolute inset-0 rounded-lg opacity-25" />
                      <span className="relative z-10 flex h-full min-w-0 flex-col items-start gap-1.5 sm:gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan sm:h-9 sm:w-9">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <span className="line-clamp-3 w-full min-w-0 text-xs font-semibold leading-snug text-brand-deep-navy sm:line-clamp-2 sm:min-h-[2.5rem] sm:text-sm">
                          {pillar.title}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </>
            }
            detail={
              <>
                <div className="flex shrink-0 items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan">
                    <ActiveIcon size={18} strokeWidth={2} />
                  </span>
                  <p className="text-sm leading-snug text-brand-navy/70">{activeDetail.text}</p>
                </div>
                <div className="min-h-0 flex-1">
                  <WhyUsPillarScene
                    pillarId={activePillar}
                    scene={activeScene}
                    active={visible}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </>
            }
          />
        </div>
      </NotepadFrame>
    </motion.div>
  );
}
