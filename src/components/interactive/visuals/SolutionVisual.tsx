import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BarChart3,
  Check,
  Factory,
  Handshake,
  Package,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { useSolutionVisualDemo } from '../../../hooks/useSolutionVisualDemo';
import {
  SOLUTION_DEMO_PAUSE_AFTER_TAP,
  SOLUTION_MODULE_RELATIONS,
  SOLUTION_NODES,
  SOLUTION_SCENE,
  type SolutionModuleId,
} from './solution.visual.config';

const { width, height, hub: hubPoint, orbitRadius } = SOLUTION_SCENE;
const nodes = SOLUTION_NODES;

const moduleIcons: Record<SolutionModuleId, LucideIcon> = {
  sales: BarChart3,
  inventory: Package,
  finance: Wallet,
  mrp: Factory,
  hr: Users,
  crm: Handshake,
};

type SyncPhase = 'idle' | 'inbound' | 'synced' | 'outbound';

interface SolutionVisualProps {
  slideIndex: number;
}

function pctX(x: number) {
  return `${(x / width) * 100}%`;
}

function pctY(y: number) {
  return `${(y / height) * 100}%`;
}

function labelSide(angleDeg: number): 'above' | 'below' {
  return Math.sin((angleDeg * Math.PI) / 180) < -0.25 ? 'above' : 'below';
}

function DataPulse({
  from,
  to,
  reducedMotion,
  delay = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  reducedMotion: boolean | null;
  delay?: number;
}) {
  if (reducedMotion) return null;

  const path = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <motion.circle
      r="4"
      fill="#29ABE2"
      initial={{ opacity: 0, offsetDistance: '0%' }}
      animate={{ opacity: [0, 1, 1, 0], offsetDistance: '100%' }}
      transition={{ duration: 0.65, delay, ease: fluidEase, times: [0, 0.08, 0.82, 1] }}
      style={{ offsetPath: `path('${path}')` }}
    />
  );
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

  const showSyncDetail = syncPhase === 'synced' || syncPhase === 'outbound' || Boolean(reducedMotion);

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
        <div
          className="relative mx-auto w-full"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden
          >
            <motion.circle
              cx={hubPoint.x}
              cy={hubPoint.y}
              r={orbitRadius}
              fill="none"
              stroke="#29ABE2"
              strokeWidth="1"
              strokeOpacity="0.12"
              strokeDasharray="4 6"
              initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
              animate={{
                scale: visible ? 1 : 0.92,
                opacity: visible ? 1 : 0,
                strokeOpacity: syncPhase === 'inbound' ? 0.22 : 0.12,
              }}
              transition={{ duration: 0.5, delay: 0.45, ease: fluidEase }}
            />
            <motion.circle
              cx={hubPoint.x}
              cy={hubPoint.y}
              r="34"
              fill="none"
              stroke="#29ABE2"
              strokeWidth="1.5"
              strokeOpacity="0.18"
              initial={{ scale: reducedMotion ? 1 : 0.92, opacity: 0 }}
              animate={{
                scale: visible ? 1 : 0.92,
                opacity: visible ? 1 : 0,
                strokeOpacity: syncPhase === 'inbound' ? 0.35 : 0.18,
              }}
              transition={{ duration: 0.5, delay: 0.45, ease: fluidEase }}
            />

            {content.modules.map((mod, i) => {
              const from = nodes[mod.id];
              const active = isActiveLine(mod.id);

              return (
                <motion.line
                  key={mod.id}
                  x1={from.x}
                  y1={from.y}
                  x2={hubPoint.x}
                  y2={hubPoint.y}
                  stroke="#29ABE2"
                  strokeWidth={active ? 2 : 1.25}
                  strokeLinecap="round"
                  strokeOpacity={active ? 0.55 : 0.18}
                  initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 0 }}
                  animate={{
                    pathLength: visible ? 1 : 0,
                    opacity: visible ? 1 : 0,
                    strokeOpacity: active ? 0.55 : 0.18,
                  }}
                  transition={{
                    pathLength: { duration: 0.5, delay: reducedMotion ? 0 : 0.1 + i * 0.06, ease: fluidEase },
                    opacity: { duration: 0.35, delay: reducedMotion ? 0 : 0.1 + i * 0.06 },
                    strokeOpacity: { duration: 0.25, ease: fluidEase },
                  }}
                />
              );
            })}

            {syncPhase === 'inbound' && (
              <DataPulse key={`in-${syncKey}`} from={nodes[activeId]} to={hubPoint} reducedMotion={reducedMotion} />
            )}

            {syncPhase === 'outbound' &&
              content.modules
                .filter((mod) => mod.id !== activeId)
                .map((mod, i) => (
                  <DataPulse
                    key={`out-${syncKey}-${mod.id}`}
                    from={hubPoint}
                    to={nodes[mod.id]}
                    reducedMotion={reducedMotion}
                    delay={i * 0.08}
                  />
                ))}
          </svg>

          <motion.div
            className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: pctX(hubPoint.x), top: pctY(hubPoint.y) }}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.88 }}
            animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.88 }}
            transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.5, ease: fluidEase }}
          >
            <motion.span
              className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-cyan text-sm font-bold text-white shadow-lg shadow-brand-cyan/30 sm:h-[3.75rem] sm:w-[3.75rem] sm:text-base"
              animate={{
                boxShadow:
                  syncPhase === 'inbound'
                    ? '0 0 0 6px rgba(41, 171, 226, 0.15), 0 10px 25px rgba(41, 171, 226, 0.25)'
                    : '0 10px 25px rgba(41, 171, 226, 0.25)',
              }}
              transition={{ duration: 0.35, ease: fluidEase }}
            >
              {content.hub}
            </motion.span>
          </motion.div>

          {content.modules.map((mod, i) => {
            const Icon = moduleIcons[mod.id] ?? Package;
            const isSelected = mod.id === activeId;
            const point = nodes[mod.id];
            const placement = labelSide(SOLUTION_SCENE.moduleAngles[mod.id]);

            return (
              <motion.button
                key={mod.id}
                type="button"
                onClick={() => handleSelect(mod.id)}
                className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
                style={{ left: pctX(point.x), top: pctY(point.y) }}
                initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.88 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? (isSelected ? 1.05 : 1) : 0.88 }}
                transition={{
                  duration: 0.45,
                  delay: reducedMotion ? 0 : 0.16 + i * 0.07,
                  ease: fluidEase,
                }}
                aria-pressed={isSelected}
              >
                {placement === 'above' && (
                  <span
                    className={`mb-1.5 text-[11px] font-semibold sm:text-xs ${
                      isSelected ? 'text-brand-deep-navy' : 'text-brand-navy/70'
                    }`}
                  >
                    {mod.label}
                  </span>
                )}
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 text-brand-cyan shadow-md transition-all sm:h-12 sm:w-12 ${
                    isSelected
                      ? 'border-brand-cyan/40 shadow-brand-cyan/20 ring-[3px] ring-brand-cyan/15'
                      : 'border-brand-cyan/20 shadow-brand-cyan/10 hover:border-brand-cyan/35 hover:shadow-brand-cyan/15'
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                </span>
                {placement === 'below' && (
                  <span
                    className={`mt-1.5 text-[11px] font-semibold sm:text-xs ${
                      isSelected ? 'text-brand-deep-navy' : 'text-brand-navy/70'
                    }`}
                  >
                    {mod.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

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
                  {content.status.synced}
                </span>
                {activeModule.syncEvent}
              </p>
            ) : syncPhase === 'inbound' ? (
              <p className="text-sm font-medium text-brand-cyan/80">{content.status.syncing}</p>
            ) : (
              <p className="text-sm text-brand-navy/45">{content.status.idle}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="mt-2 text-center text-[11px] leading-relaxed text-brand-navy/35 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.75, ease: fluidEase }}
        >
          {content.hint}
        </motion.p>

        <motion.p
          className="mt-2 text-center text-sm leading-relaxed text-brand-navy/55 sm:text-[15px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.85, ease: fluidEase }}
        >
          {content.caption}
        </motion.p>
      </div>
    </motion.div>
  );
}
