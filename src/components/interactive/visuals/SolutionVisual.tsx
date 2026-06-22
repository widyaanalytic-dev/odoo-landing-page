import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { useSolutionVisualDemo } from '../../../hooks/useSolutionVisualDemo';
import {
  SOLUTION_DEMO_PAUSE_AFTER_TAP,
  SOLUTION_MODULE_RELATIONS,
  type SolutionModuleId,
} from './solution.visual.config';
import { SolutionSceneCanvas } from './solution/SolutionSceneCanvas';
import { SolutionSyncStatus } from './solution/SolutionSyncStatus';
import type { SyncPhase } from './solution/solution.geometry';

interface SolutionVisualProps {
  slideIndex: number;
}

export function SolutionVisual({ slideIndex }: SolutionVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<SolutionModuleId>('sales');
  const [syncPhase, setSyncPhase] = useState<SyncPhase>('idle');
  const [demoPaused, setDemoPaused] = useState(false);
  const [syncKey, setSyncKey] = useState(0);
  const pauseTimerRef = useRef<number | null>(null);

  const content = t(landingContent.solution, locale).visual;
  const modulesById = useMemo(
    () => Object.fromEntries(content.modules.map((mod) => [mod.id, mod])),
    [content.modules],
  );
  const activeModule = modulesById[activeId] ?? content.modules[0];

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => {
    setVisible(false);
    setSyncPhase('idle');
  }, []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  const triggerSync = useCallback((moduleId: SolutionModuleId) => {
    setActiveId(moduleId);
    setSyncKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!visible) return;

    if (reducedMotion) {
      setSyncPhase('synced');
      return;
    }

    setSyncPhase('inbound');
    const syncedTimer = window.setTimeout(() => setSyncPhase('synced'), 680);
    const outboundTimer = window.setTimeout(() => setSyncPhase('outbound'), 1180);
    const idleTimer = window.setTimeout(() => setSyncPhase('idle'), 2100);

    return () => {
      window.clearTimeout(syncedTimer);
      window.clearTimeout(outboundTimer);
      window.clearTimeout(idleTimer);
    };
  }, [visible, syncKey, reducedMotion]);

  const handleSelect = useCallback(
    (moduleId: SolutionModuleId) => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
      setDemoPaused(true);
      triggerSync(moduleId);
      pauseTimerRef.current = window.setTimeout(() => {
        setDemoPaused(false);
        pauseTimerRef.current = null;
      }, SOLUTION_DEMO_PAUSE_AFTER_TAP);
    },
    [triggerSync],
  );

  useEffect(
    () => () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    },
    [],
  );

  useSolutionVisualDemo({
    enabled: visible,
    active: visible,
    reducedMotion,
    paused: demoPaused || syncPhase === 'inbound' || syncPhase === 'outbound',
    onSelect: triggerSync,
  });

  const relatedModules = SOLUTION_MODULE_RELATIONS[activeId] ?? [];
  const isActiveLine = (moduleId: SolutionModuleId) =>
    moduleId === activeId || (syncPhase === 'outbound' && relatedModules.includes(moduleId));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.55, ease: fluidEase }}
      className="relative flex w-full min-w-0 flex-col justify-center py-1 lg:-mt-1 lg:py-0"
    >
      <div
        className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-cyan/[0.08] via-brand-muted/40 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[min(100%,20rem)] px-1 sm:max-w-[min(100%,24rem)] sm:px-2">
        <SolutionSceneCanvas
          visible={visible}
          reducedMotion={reducedMotion}
          syncPhase={syncPhase}
          syncKey={syncKey}
          activeId={activeId}
          hubLabel={content.hub}
          modules={content.modules}
          isActiveLine={isActiveLine}
          onSelect={handleSelect}
        />

        <SolutionSyncStatus
          visible={visible}
          reducedMotion={reducedMotion}
          activeId={activeId}
          syncPhase={syncPhase}
          syncKey={syncKey}
          syncEvent={activeModule.syncEvent}
          status={content.status}
          hint={content.hint}
        />
      </div>
    </motion.div>
  );
}
