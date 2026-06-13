import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLang } from './LangProvider';
import { useScrollState } from './ScrollContext';
import { cn } from '../../lib/cn';

const arrowButtonClass =
  'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/75 text-brand-navy/55 shadow-lg shadow-brand-navy/10 backdrop-blur-xl transition-colors hover:bg-white hover:text-brand-cyan disabled:pointer-events-none disabled:opacity-35';

export function SlideNavArrows() {
  const { locale } = useLang();
  const { activeSlide, slideCount, scrollToSlide } = useScrollState();

  const navLabel = locale === 'id' ? 'Navigasi slide' : 'Slide navigation';
  const prevLabel = locale === 'id' ? 'Slide sebelumnya' : 'Previous slide';
  const nextLabel = locale === 'id' ? 'Slide berikutnya' : 'Next slide';

  const atStart = activeSlide === 0;
  const atEnd = activeSlide >= slideCount - 1;

  return (
    <nav
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex xl:right-6"
      aria-label={navLabel}
    >
      <button
        type="button"
        className={cn(arrowButtonClass)}
        aria-label={prevLabel}
        disabled={atStart}
        onClick={() => scrollToSlide(activeSlide - 1)}
      >
        <ChevronUp size={22} strokeWidth={2.25} aria-hidden />
      </button>

      <span
        className="pointer-events-none rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold tabular-nums tracking-wider text-brand-navy/40 shadow-sm backdrop-blur-sm"
        aria-hidden
      >
        {String(activeSlide + 1).padStart(2, '0')}
      </span>

      <button
        type="button"
        className={cn(arrowButtonClass)}
        aria-label={nextLabel}
        disabled={atEnd}
        onClick={() => scrollToSlide(activeSlide + 1)}
      >
        <ChevronDown size={22} strokeWidth={2.25} aria-hidden />
      </button>
    </nav>
  );
}
