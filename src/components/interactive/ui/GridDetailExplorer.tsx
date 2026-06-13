import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { gridPanelTransition } from '../../../lib/motion';

export type GridDetailView = 'grid' | 'detail';

interface GridDetailExplorerProps {
  view: GridDetailView;
  ariaLabel: string;
  panelId: string;
  minHeightClass: string;
  gridClassName?: string;
  detailClassName?: string;
  detailKey: string;
  header?: ReactNode;
  grid: ReactNode;
  detail: ReactNode;
}

export function GridDetailExplorer({
  view,
  ariaLabel,
  panelId,
  minHeightClass,
  gridClassName = 'grid grid-cols-2 grid-rows-2 gap-2 sm:absolute sm:inset-0 sm:gap-3',
  detailClassName = 'absolute inset-0 flex min-h-0 flex-col gap-3 sm:gap-4',
  detailKey,
  header,
  grid,
  detail,
}: GridDetailExplorerProps) {
  return (
    <>
      {header}
      <div className={minHeightClass}>
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={gridPanelTransition}
              className={gridClassName}
              role="tablist"
              aria-label={ariaLabel}
            >
              {grid}
            </motion.div>
          ) : (
            <motion.div
              key={detailKey}
              id={panelId}
              role="tabpanel"
              aria-label={ariaLabel}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={gridPanelTransition}
              className={detailClassName}
            >
              {detail}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
