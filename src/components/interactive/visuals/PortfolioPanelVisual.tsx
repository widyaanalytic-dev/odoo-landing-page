import { useCallback, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { PortfolioIcon, type PortfolioIconId } from '../../../lib/icons';
import { cn } from '../../../lib/cn';
import { fadeUpTransition, fluidEase } from '../../../lib/motion';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { GridDetailExplorer } from '../ui/GridDetailExplorer';
import { NotepadFrame } from '../ui/NotepadFrame';

const visualSlotClass = 'min-h-0 lg:min-h-[min(24rem,calc(100dvh-14rem))]';

export type PortfolioTheme = { chip: string; icon: string; glow: string };

export interface PortfolioPanelItem {
  id: string;
  iconId: string;
  industry: string;
  clients: string;
  description: string;
  modules: string[];
}

interface PortfolioPanelVisualProps {
  slideIndex: number;
  eyebrow: string;
  items: PortfolioPanelItem[];
  defaultItemId: string;
  themeById: Record<string, PortfolioTheme>;
  visual: {
    hint: string;
    sectorBadge: string;
    clientsLabel: string;
    modulesLabel: string;
  };
}

function parseClients(clients: string) {
  return clients.split(',').map((c) => c.trim()).filter(Boolean);
}

export function PortfolioPanelVisual({
  slideIndex,
  eyebrow,
  items,
  defaultItemId,
  themeById,
  visual,
}: PortfolioPanelVisualProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activeItemId, setActiveItemId] = useState(defaultItemId);
  const [view, setView] = useState<'grid' | 'detail'>('grid');

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeItemId) ?? items[0],
    [activeItemId, items],
  );

  const theme = themeById[activeItem.id] ?? themeById[defaultItemId];
  const clientList = parseClients(activeItem.clients);
  const compactGrid = items.length === 3;

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  const openItem = (id: string) => {
    setActiveItemId(id);
    setView('detail');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={fadeUpTransition}
      className={`mx-auto flex w-full max-w-lg items-center justify-center px-1 ${visualSlotClass}`}
    >
      <NotepadFrame className="shadow-[0_12px_32px_-20px_rgba(14,42,71,0.18)]">
        <div className="relative flex w-full flex-col">
          <GridDetailExplorer
            view={view}
            ariaLabel={eyebrow}
            panelId={`portfolio-panel-${activeItemId}`}
            minHeightClass="relative min-h-[9.5rem] sm:min-h-[11.5rem] lg:min-h-[12.5rem]"
            gridClassName="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3"
            detailClassName="absolute inset-0 flex min-h-0 flex-col gap-3 overflow-y-auto sm:gap-3.5"
            detailKey={`detail-${activeItemId}`}
            grid={
              <>
                {items.map((item, i) => {
                  const itemTheme = themeById[item.id];

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activeItemId === item.id}
                      aria-controls={`portfolio-panel-${item.id}`}
                      onClick={() => openItem(item.id)}
                      className={cn(
                        'group relative flex h-full w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-brand-navy/10 bg-white/95 p-3 text-center shadow-sm shadow-brand-navy/8 transition-all hover:border-brand-cyan/30 hover:shadow-md hover:shadow-brand-cyan/10 sm:p-3.5',
                        compactGrid && i === 2 && 'col-span-2',
                      )}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
                      transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.04 + i * 0.04, ease: fluidEase }}
                    >
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br opacity-25',
                          itemTheme.glow,
                        )}
                        aria-hidden
                      />
                      <div className="texture-grain pointer-events-none absolute inset-0 rounded-lg opacity-70" />
                      <div className="texture-dots pointer-events-none absolute inset-0 rounded-lg opacity-25" />
                      <span className="relative z-10 flex min-w-0 flex-col items-center gap-2">
                        <span
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border sm:h-10 sm:w-10',
                            itemTheme.icon,
                          )}
                        >
                          <PortfolioIcon id={item.iconId as PortfolioIconId} size={17} />
                        </span>
                        <span className="line-clamp-2 w-full text-sm font-semibold leading-snug text-brand-deep-navy">
                          {item.industry}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </>
            }
            detail={
              <>
                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className="inline-flex shrink-0 items-center gap-1.5 self-start text-xs font-semibold text-brand-cyan hover:text-brand-deep-navy"
                >
                  <ArrowLeft size={14} />
                  {visual.hint}
                </button>

                <div className="flex shrink-0 items-start gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border sm:h-11 sm:w-11',
                      theme.icon,
                    )}
                  >
                    <PortfolioIcon id={activeItem.iconId as PortfolioIconId} size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-deep-navy sm:text-base">{activeItem.industry}</p>
                    <p className="mt-1 line-clamp-3 text-sm leading-snug text-brand-navy/65">{activeItem.description}</p>
                  </div>
                </div>

                <div className="shrink-0">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand-navy/40">
                    {visual.clientsLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {clientList.map((client) => (
                      <span key={client} className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold', theme.chip)}>
                        {client}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand-navy/40">
                    {visual.modulesLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeItem.modules.map((mod) => (
                      <span
                        key={mod}
                        className="rounded-md border border-brand-cyan/15 bg-brand-cyan/8 px-2 py-0.5 text-xs text-brand-navy/60"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            }
          />
        </div>
      </NotepadFrame>
    </motion.div>
  );
}
