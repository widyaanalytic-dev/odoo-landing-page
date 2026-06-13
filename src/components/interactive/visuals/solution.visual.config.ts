export type SolutionModuleId = 'sales' | 'inventory' | 'finance' | 'mrp' | 'hr' | 'crm';

export const SOLUTION_MODULE_ORDER: SolutionModuleId[] = [
  'sales',
  'inventory',
  'finance',
  'mrp',
  'hr',
  'crm',
];

export const SOLUTION_DEMO_INTERVAL = 2800;
export const SOLUTION_DEMO_PAUSE_AFTER_TAP = 5200;

/** Regular hex orbit — all modules equidistant from hub */
export const SOLUTION_SCENE = {
  width: 320,
  height: 320,
  hub: { x: 160, y: 160 },
  orbitRadius: 112,
  /** Degrees: 0 = right, 90 = down (SVG coords) */
  moduleAngles: {
    crm: -90,
    finance: -30,
    mrp: 30,
    hr: 90,
    inventory: 150,
    sales: 210,
  } satisfies Record<SolutionModuleId, number>,
} as const;

export function solutionNodePosition(moduleId: SolutionModuleId) {
  const angleDeg = SOLUTION_SCENE.moduleAngles[moduleId];
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: SOLUTION_SCENE.hub.x + Math.cos(rad) * SOLUTION_SCENE.orbitRadius,
    y: SOLUTION_SCENE.hub.y + Math.sin(rad) * SOLUTION_SCENE.orbitRadius,
  };
}

export const SOLUTION_NODES: Record<SolutionModuleId, { x: number; y: number }> = {
  crm: solutionNodePosition('crm'),
  sales: solutionNodePosition('sales'),
  finance: solutionNodePosition('finance'),
  inventory: solutionNodePosition('inventory'),
  hr: solutionNodePosition('hr'),
  mrp: solutionNodePosition('mrp'),
};

export const SOLUTION_MODULE_RELATIONS: Record<SolutionModuleId, SolutionModuleId[]> = {
  sales: ['inventory', 'finance', 'crm'],
  inventory: ['sales', 'mrp', 'finance'],
  finance: ['sales', 'inventory', 'hr'],
  mrp: ['inventory', 'finance'],
  hr: ['finance', 'crm'],
  crm: ['sales', 'finance'],
};
