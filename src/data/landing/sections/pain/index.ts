import { painDataChecklist } from './data-checklist';
import { painLabels } from './labels';
import { painProcessChecklist } from './process-checklist';
import { painVisualContent } from './visual';

export const pain = {
  labels: painLabels,
  checklist1: painDataChecklist,
  checklist2: painProcessChecklist,
  visual: painVisualContent,
} as const;
