import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

interface NotepadFrameProps {
  children: ReactNode;
  className?: string;
}

export function NotepadFrame({ children, className }: NotepadFrameProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-[0_16px_40px_-24px_rgba(14,42,71,0.2)]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(20, 70, 127, 0.045) 31px, rgba(20, 70, 127, 0.045) 32px)',
        }}
        aria-hidden
      />
      <div className="relative px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </div>
  );
}
