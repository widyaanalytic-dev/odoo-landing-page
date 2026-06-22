import { fluidEase } from '../../../../lib/motion';
import { AnimatePresence, motion } from 'motion/react';
import type { SyncPhase } from './solution.geometry';
import type { SolutionModuleId } from '../solution.visual.config';

interface SolutionSyncStatusProps {
  visible: boolean;
  reducedMotion: boolean | null;
  activeId: SolutionModuleId;
  syncPhase: SyncPhase;
  syncKey: number;
  syncEvent: string;
  status: {
    synced: string;
    syncing: string;
    idle: string;
  };
  hint: string;
}

export function SolutionSyncStatus({
  visible,
  reducedMotion,
  activeId,
  syncPhase,
  syncKey,
  syncEvent,
  status,
  hint,
}: SolutionSyncStatusProps) {
  const showSyncDetail = syncPhase === 'synced' || syncPhase === 'outbound' || Boolean(reducedMotion);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeId}-${syncPhase}-${syncKey}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: fluidEase }}
          className="mx-auto mt-3 min-h-[2.25rem] max-w-[16rem] text-center sm:max-w-[18rem]"
        >
          {showSyncDetail ? (
            <p className="text-xs leading-relaxed text-brand-navy/70 sm:text-sm">
              <span className="font-medium text-brand-cyan">{status.synced}.</span> {syncEvent}
            </p>
          ) : syncPhase === 'inbound' ? (
            <p className="text-xs font-medium text-brand-cyan/80 sm:text-sm">{status.syncing}</p>
          ) : (
            <p className="text-xs text-brand-navy/45 sm:text-sm">{status.idle}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="mt-2 text-center text-[11px] leading-relaxed text-brand-navy/40 sm:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.75, ease: fluidEase }}
      >
        {hint}
      </motion.p>
    </>
  );
}
