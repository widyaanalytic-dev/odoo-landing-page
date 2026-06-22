import type { PartnerLogo } from '../../../data/partners';
import { partnerLogoImgClass } from '../../../lib/partner-logo';

interface ClientLogoSliderProps {
  label: string;
  items: PartnerLogo[];
  /** Slower marquee for long partner lists */
  slow?: boolean;
}

export function ClientLogoSlider({ label, items, slow = false }: ClientLogoSliderProps) {
  const track = [...items, ...items];

  return (
    <div className="trusted-by-band relative left-1/2 -mb-10 w-screen max-w-[100vw] -translate-x-1/2 px-5 py-7 sm:-mb-14 sm:px-8 sm:py-9 md:px-12 lg:-mb-20 lg:px-20 lg:py-10 xl:px-24">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy/45 sm:mb-5">
          {label}
        </p>
        <div className="logo-marquee-mask relative overflow-hidden py-1">
          <div
            className={`flex w-max items-center gap-4 pr-4 sm:gap-5 sm:pr-5 ${slow ? 'animate-logo-marquee-slow' : 'animate-logo-marquee'}`}
          >
            {track.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="flex h-12 w-[5.5rem] shrink-0 items-center justify-center sm:h-14 sm:w-[6.25rem]"
                title={item.name}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className={partnerLogoImgClass(item.src, item.status)}
                  width={100}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
