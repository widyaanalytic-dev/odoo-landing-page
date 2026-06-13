import { useScrollState } from '../ScrollContext';

export function NarrativeSpine() {
  const { activeSlide, globalProgress, slideCount } = useScrollState();
  const progressPct = ((activeSlide + globalProgress) / Math.max(slideCount - 1, 1)) * 100;

  return (
    <div
      className="pointer-events-none fixed left-4 top-28 z-30 hidden -translate-y-0 lg:block xl:left-8"
      aria-hidden
    >
      <div className="relative h-[min(60dvh,480px)] w-px bg-brand-navy/10">
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-brand-cyan via-brand-mid-blue to-brand-navy transition-all duration-500 ease-out"
          style={{ height: `${progressPct}%` }}
        />
        <div
          className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-white bg-brand-cyan shadow-md shadow-brand-cyan/40 transition-all duration-500"
          style={{ top: `calc(${progressPct}% - 5px)` }}
        />
      </div>
      <span className="mt-3 block text-[10px] font-semibold tracking-widest text-brand-navy/40">
        {String(activeSlide + 1).padStart(2, '0')}
      </span>
    </div>
  );
}
