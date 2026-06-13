import { Check } from 'lucide-react';
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
  caption: string;
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
  caption,
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
          className="mx-auto mt-4 min-h-[2.5rem] max-w-[18rem] text-center sm:max-w-[20rem]"
        >
          {showSyncDetail ? (
            <p className="text-sm leading-relaxed text-brand-navy/75">
              <span className="mr-1.5 inline-flex items-center gap-1 font-semibold text-brand-cyan">
                <Check size={13} strokeWidth={2.5} />
                {status.synced}
              </span>
              {syncEvent}
            </p>
          ) : syncPhase === 'inbound' ? (
            <p className="text-sm font-medium text-brand-cyan/80">{status.syncing}</p>
          ) : (
            <p className="text-sm text-brand-navy/45">{status.idle}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="mt-2 text-center text-[11px] leading-relaxed text-brand-navy/35 sm:text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.75, ease: fluidEase }}
      >
        {hint}
      </motion.p>

      <motion.p
        className="mt-2 text-center text-sm leading-relaxed text-brand-navy/55 sm:text-[15px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.85, ease: fluidEase }}
      >
        {caption}
      </motion.p>
    </>
  );
}
