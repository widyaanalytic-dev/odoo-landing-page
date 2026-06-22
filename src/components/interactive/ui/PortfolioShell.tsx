import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

interface PortfolioShellProps {
  children: ReactNode;
  className?: string;
}

export function PortfolioShell({ children, className }: PortfolioShellProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(41,171,226,0.09),transparent_65%)] sm:-inset-8"
        aria-hidden
      />
      {children}
    </div>
  );
}
