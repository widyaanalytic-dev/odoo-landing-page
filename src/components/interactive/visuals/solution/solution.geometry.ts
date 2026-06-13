import { SOLUTION_SCENE } from '../solution.visual.config';

export type SyncPhase = 'idle' | 'inbound' | 'synced' | 'outbound';

const { width, height } = SOLUTION_SCENE;

export function pctX(x: number) {
  return `${(x / width) * 100}%`;
}

export function pctY(y: number) {
  return `${(y / height) * 100}%`;
}

export function labelSide(angleDeg: number): 'above' | 'below' {
  return Math.sin((angleDeg * Math.PI) / 180) < -0.25 ? 'above' : 'below';
}
