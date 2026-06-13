import {
  BarChart3,
  Factory,
  Handshake,
  Package,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { fluidEase } from '../../../../lib/motion';
import { motion } from 'motion/react';
import {
  SOLUTION_NODES,
  SOLUTION_SCENE,
  type SolutionModuleId,
} from '../solution.visual.config';
import { DataPulse } from './DataPulse';
import { labelSide, pctX, pctY, type SyncPhase } from './solution.geometry';

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

interface SolutionModule {
  id: SolutionModuleId;
  label: string;
}

interface SolutionSceneCanvasProps {
  visible: boolean;
  reducedMotion: boolean | null;
  syncPhase: SyncPhase;
  syncKey: number;
  activeId: SolutionModuleId;
  hubLabel: string;
  modules: SolutionModule[];
  isActiveLine: (moduleId: SolutionModuleId) => boolean;
  onSelect: (moduleId: SolutionModuleId) => void;
}

export function SolutionSceneCanvas({
  visible,
  reducedMotion,
  syncPhase,
  syncKey,
  activeId,
  hubLabel,
  modules,
  isActiveLine,
  onSelect,
}: SolutionSceneCanvasProps) {
  return (
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

        {modules.map((mod, i) => {
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
          modules
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
          {hubLabel}
        </motion.span>
      </motion.div>

      {modules.map((mod, i) => {
        const Icon = moduleIcons[mod.id] ?? Package;
        const isSelected = mod.id === activeId;
        const point = nodes[mod.id];
        const placement = labelSide(SOLUTION_SCENE.moduleAngles[mod.id]);

        return (
          <motion.button
            key={mod.id}
            type="button"
            onClick={() => onSelect(mod.id)}
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
  );
}
