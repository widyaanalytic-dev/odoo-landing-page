import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

interface OdooBrowserFrameProps {
  children: ReactNode;
  className?: string;
}

export function OdooBrowserFrame({ children, className }: OdooBrowserFrameProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-hidden rounded-2xl border border-[#d8dadd]/80 bg-white shadow-[0_16px_40px_-14px_rgba(14,42,71,0.14)]">
        <div className="aspect-[16/10] overflow-hidden bg-[#f9f9f9]">{children}</div>
      </div>
    </div>
  );
}
