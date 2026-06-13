import { CONTACT_EMAIL, landingContent, t } from '../../data/landing';
import { getActiveNavSection, navSections } from '../../data/slides.config';
import { useLang } from './LangProvider';
import { useScrollState } from './ScrollContext';
import { cn } from '../../lib/cn';

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLang();

  return (
    <div
      className={cn(
        'flex shrink-0 items-center rounded-full bg-brand-navy/[0.05] p-0.5',
        compact ? 'gap-0' : 'gap-1.5 md:gap-2 md:bg-transparent md:p-0',
      )}
      role="group"
      aria-label={locale === 'id' ? 'Pilih bahasa' : 'Choose language'}
    >
      <button
        type="button"
        onClick={() => setLocale('id')}
        aria-pressed={locale === 'id'}
        lang="id"
        className={cn(
          'rounded-full font-medium transition-all',
          compact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-xs md:px-3 md:text-sm',
          locale === 'id'
            ? 'bg-brand-cyan text-white shadow-sm shadow-brand-cyan/25'
            : 'text-brand-navy/60 hover:text-brand-navy',
        )}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        lang="en"
        className={cn(
          'rounded-full font-medium transition-all',
          compact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1 text-xs md:px-3 md:text-sm',
          locale === 'en'
            ? 'bg-brand-cyan text-white shadow-sm shadow-brand-cyan/25'
            : 'text-brand-navy/60 hover:text-brand-navy',
        )}
      >
        EN
      </button>
      {!compact && (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="hidden rounded-full bg-brand-cyan px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-brand-cyan/25 transition-colors hover:bg-brand-mid-blue sm:ml-1 sm:inline-block md:px-4 md:text-sm"
        >
          {t(landingContent.hero, locale).ctaPrimary}
        </a>
      )}
    </div>
  );
}

export function HeaderNav() {
  const { locale } = useLang();
  const { activeSlide, scrollToSlideById } = useScrollState();
  const activeSection = getActiveNavSection(activeSlide);
  const navAriaLabel = locale === 'id' ? 'Navigasi utama' : 'Main navigation';

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2 z-50 flex justify-center px-3 sm:top-3 sm:px-4 md:top-6">
      <div className="pointer-events-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-lg shadow-brand-navy/10 backdrop-blur-xl md:px-5 md:py-3">
        {/* Mobile: logo + bahasa, lalu tab 4 kolom */}
        <div className="px-3 py-2.5 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => scrollToSlideById('hero')}
              className="min-w-0 shrink rounded-lg transition-opacity hover:opacity-85"
              aria-label="Widya Analytic — kembali ke awal"
            >
              <img
                src="/logo.png"
                alt="Widya Analytic"
                className="h-6 w-auto max-w-[6.5rem] object-contain object-left sm:h-7 sm:max-w-[7.5rem]"
                width={160}
                height={32}
                decoding="async"
              />
            </button>
            <LangToggle compact />
          </div>

          <nav
            className="mt-2.5 grid grid-cols-4 gap-0.5 rounded-xl bg-brand-navy/[0.05] p-0.5"
            aria-label={navAriaLabel}
          >
            {navSections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSlideById(section.slideId)}
                  className={cn(
                    'rounded-[0.65rem] px-1 py-2 text-center text-[10px] font-semibold leading-tight transition-all sm:py-2.5 sm:text-[11px]',
                    isActive
                      ? 'bg-white text-brand-deep-navy shadow-sm shadow-brand-navy/8'
                      : 'text-brand-navy/50 hover:text-brand-cyan',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {section.label[locale]}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop: satu baris */}
        <div className="hidden items-center gap-3 px-0 py-0 md:flex md:gap-4">
          <button
            type="button"
            onClick={() => scrollToSlideById('hero')}
            className="shrink-0 rounded-lg transition-opacity hover:opacity-85"
            aria-label="Widya Analytic — kembali ke awal"
          >
            <img
              src="/logo.png"
              alt="Widya Analytic"
              className="h-8 w-auto object-contain object-left"
              width={160}
              height={32}
              decoding="async"
            />
          </button>

          <nav className="flex min-w-0 flex-1 items-center justify-center gap-2" aria-label={navAriaLabel}>
            {navSections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSlideById(section.slideId)}
                  className={cn(
                    'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-cyan/12 text-brand-deep-navy'
                      : 'text-brand-navy/55 hover:bg-white/80 hover:text-brand-cyan',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {section.label[locale]}
                </button>
              );
            })}
          </nav>

          <LangToggle />
        </div>
      </div>
    </header>
  );
}
