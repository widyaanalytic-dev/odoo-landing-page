import {
  Award,
  Briefcase,
  Building2,
  CheckSquare,
  Dna,
  Factory,
  Hotel,
  Sprout,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import type { PortfolioIconId } from '../data/visual-ids';

export type { PortfolioIconId };

export const portfolioIcons: Record<PortfolioIconId, LucideIcon> = {
  factory: Factory,
  sprout: Sprout,
  truck: Truck,
  building: Building2,
  dna: Dna,
  hotel: Hotel,
  briefcase: Briefcase,
};

export { Award, CheckSquare };
