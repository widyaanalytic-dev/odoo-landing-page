import type { PortfolioIconId } from '../../../lib/icons';
import { PortfolioIcon } from '../../../lib/icons';

export interface TrustedLogo {
  name: string;
  iconId: PortfolioIconId;
}

interface ClientLogoSliderProps {
  label: string;
  items: TrustedLogo[];
}

export function ClientLogoSlider({ label, items }: ClientLogoSliderProps) {
  const track = [...items, ...items];

  return (
    <div className="w-full">
      <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy/40 sm:mb-5">
        {label}
      </p>
      <div className="logo-marquee-mask relative overflow-hidden">
        <div className="flex w-max animate-logo-marquee items-center gap-12 pr-12">
          {track.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex shrink-0 items-center gap-3 opacity-60 grayscale transition-opacity hover:opacity-90"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white shadow-sm">
                <PortfolioIcon id={item.iconId} size={22} className="text-brand-navy/55" />
              </div>
              <span className="whitespace-nowrap text-sm font-semibold text-brand-navy/50">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
