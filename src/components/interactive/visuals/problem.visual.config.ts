import type { LucideIcon } from 'lucide-react';
import { FileSpreadsheet, Package, Users, Wallet } from 'lucide-react';

export type ProblemVisualPhaseId = 'chaos' | 'manual' | 'seamless';

/** Logical scene — positions are fractions of half-width / half-height from center */
export const PROBLEM_SCENE = {
  width: 560,
  height: 380,
  centerX: 280,
  centerY: 190,
  halfWidthScale: 0.9,
  halfHeightScale: 0.78,
} as const;

export interface SiloLayout {
  /** -1 … 1 relative to scene half-width */
  x: number;
  /** -1 … 1 relative to scene half-height */
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

export interface ProblemSiloConfig {
  id: string;
  labelKey: 'excel' | 'warehouse' | 'finance' | 'payroll';
  icon: LucideIcon;
  color: string;
  metricKey: 'stockExcel' | 'stockWarehouse' | 'revenueFinance' | 'revenuePayroll';
  chaosPosition: SiloLayout;
  seamlessPosition: SiloLayout;
}

export const PROBLEM_VISUAL_PHASES: ProblemVisualPhaseId[] = ['chaos', 'manual', 'seamless'];

/** Phase hold times — tuned for hint + visual reading (~200 wpm) */
export const PROBLEM_VISUAL_TIMING = {
  chaos: 5800,
  manual: 7200,
  seamless: 5600,
  loopPause: 2400,
} as const;

export const PROBLEM_SILOS: ProblemSiloConfig[] = [
  {
    id: 'excel',
    labelKey: 'excel',
    icon: FileSpreadsheet,
    color: 'bg-green-100 text-green-800 border-green-200/80',
    metricKey: 'stockExcel',
    chaosPosition: { x: -0.78, y: -0.58, rotate: -5, scale: 1.1, zIndex: 3 },
    seamlessPosition: { x: -0.72, y: -0.18, rotate: 0, scale: 1.02, zIndex: 2 },
  },
  {
    id: 'warehouse',
    labelKey: 'warehouse',
    icon: Package,
    color: 'bg-orange-100 text-orange-800 border-orange-200/80',
    metricKey: 'stockWarehouse',
    chaosPosition: { x: 0.62, y: -0.5, rotate: 4, scale: 1.05, zIndex: 4 },
    seamlessPosition: { x: -0.24, y: -0.18, rotate: 0, scale: 1.02, zIndex: 2 },
  },
  {
    id: 'finance',
    labelKey: 'finance',
    icon: Wallet,
    color: 'bg-blue-100 text-blue-800 border-blue-200/80',
    metricKey: 'revenueFinance',
    chaosPosition: { x: -0.65, y: 0.55, rotate: 3, scale: 1.08, zIndex: 2 },
    seamlessPosition: { x: 0.24, y: -0.18, rotate: 0, scale: 1.02, zIndex: 2 },
  },
  {
    id: 'payroll',
    labelKey: 'payroll',
    icon: Users,
    color: 'bg-purple-100 text-purple-800 border-purple-200/80',
    metricKey: 'revenuePayroll',
    chaosPosition: { x: 0.72, y: 0.58, rotate: -4, scale: 1, zIndex: 1 },
    seamlessPosition: { x: 0.72, y: -0.18, rotate: 0, scale: 1.02, zIndex: 2 },
  },
];

/** Only the two conflict links — not a full loop */
export const PROBLEM_CHAOS_CURVES: { from: number; to: number; cpX: number; cpY: number }[] = [
  { from: 0, to: 1, cpX: 0.08, cpY: -0.72 },
  { from: 2, to: 3, cpX: 0.1, cpY: 0.72 },
];

export const PROBLEM_CONFLICT_CALLOUT = { x: -0.06, y: -0.52 };

export const MANUAL_STEP_ACCENTS = [
  'border-amber-200/70 bg-amber-50/80',
  'border-orange-200/70 bg-orange-50/80',
  'border-brand-cyan/20 bg-brand-cyan/6',
] as const;

export function layoutOffset(layout: SiloLayout) {
  const halfW = (PROBLEM_SCENE.width / 2) * PROBLEM_SCENE.halfWidthScale;
  const halfH = (PROBLEM_SCENE.height / 2) * PROBLEM_SCENE.halfHeightScale;
  return { x: layout.x * halfW, y: layout.y * halfH };
}

export function siloAnchor(layout: SiloLayout) {
  const { x, y } = layoutOffset(layout);
  return { x: PROBLEM_SCENE.centerX + x, y: PROBLEM_SCENE.centerY + y };
}

export function fractionPoint(fx: number, fy: number) {
  const halfW = (PROBLEM_SCENE.width / 2) * PROBLEM_SCENE.halfWidthScale;
  const halfH = (PROBLEM_SCENE.height / 2) * PROBLEM_SCENE.halfHeightScale;
  return { x: PROBLEM_SCENE.centerX + fx * halfW, y: PROBLEM_SCENE.centerY + fy * halfH };
}

/** Approximate half-width of silo card in scene units for connector endpoints */
export const SILO_CONNECTOR_INSET = 52;
