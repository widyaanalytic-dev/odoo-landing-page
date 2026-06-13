import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

interface DesktopFrameProps {
  children: ReactNode;
  className?: string;
}

export function DesktopFrame({ children, className }: DesktopFrameProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-xl', className)}>
      <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-[#2a2a2a] p-1.5 shadow-[0_20px_48px_-20px_rgba(14,42,71,0.4)] sm:rounded-[1.25rem] sm:p-2">
        <div className="overflow-hidden rounded-xl border border-black/25 bg-[#f0f0f0] sm:rounded-2xl">
          <div className="relative aspect-[16/10]">
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
