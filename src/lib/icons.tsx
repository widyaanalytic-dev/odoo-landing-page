import {
  AlertTriangle,
  Award,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  CheckSquare,
  ClipboardList,
  Clock,
  CreditCard,
  Dna,
  Factory,
  Handshake,
  Hotel,
  Mail,
  MousePointerClick,
  Package,
  Pin,
  ShoppingCart,
  Sprout,
  Tractor,
  Truck,
  Users,
  UtensilsCrossed,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from './cn';
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

export const moduleIcons: Record<string, LucideIcon> = {
  'Sales Management': BarChart3,
  CRM: Handshake,
  'Accounting & Finance': Wallet,
  Inventory: Package,
  Purchase: ShoppingCart,
  'Manufacturing (MRP)': Factory,
  Attendance: Clock,
  Payroll: CreditCard,
  'Human Resources': Users,
  'Restaurant Management System': UtensilsCrossed,
  'Fleet Management System': Tractor,
  'Project Management': ClipboardList,
};

interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ icon: LucideIconComponent, className, size = 18, strokeWidth = 2 }: IconProps) {
  return <LucideIconComponent className={cn('shrink-0', className)} size={size} strokeWidth={strokeWidth} />;
}

export function PortfolioIcon({
  id,
  className,
  size = 16,
}: {
  id: PortfolioIconId;
  className?: string;
  size?: number;
}) {
  const LucideIconComponent = portfolioIcons[id];
  return <Icon icon={LucideIconComponent} className={className} size={size} />;
}

export function ModuleIcon({ name, className, size = 20 }: { name: string; className?: string; size?: number }) {
  const LucideIconComponent = moduleIcons[name] ?? Pin;
  return <Icon icon={LucideIconComponent} className={className} size={size} />;
}

export { Award, Check, CheckSquare, Mail, MousePointerClick, Package, ShoppingCart, Wallet, AlertTriangle, X };
