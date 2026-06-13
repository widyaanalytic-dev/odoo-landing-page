import { CONTACT_EMAIL, landingContent, t } from '../../data/landing';
import { getActiveNavSection, navSections } from '../../data/slides.config';
import { useLang } from './LangProvider';
import { useScrollState } from './ScrollContext';
import { cn } from '../../lib/cn';

export function HeaderNav() {
  const { locale, setLocale } = useLang();
  const { activeSlide, scrollToSlideById } = useScrollState();
  const activeSection = getActiveNavSection(activeSlide);
  const navAriaLabel = locale === 'id' ? 'Navigasi utama' : 'Main navigation';

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-6">
      <div className="pointer-events-auto flex w-full max-w-6xl items-center gap-3 rounded-2xl border border-white/60 bg-white/75 px-3 py-2 shadow-lg shadow-brand-navy/10 backdrop-blur-xl md:gap-4 md:px-5 md:py-3">
        <button
          type="button"
          onClick={() => scrollToSlideById('hero')}
          className="shrink-0 rounded-lg transition-opacity hover:opacity-85"
          aria-label="Widya Analytic — kembali ke awal"
        >
          <img
            src="/logo.png"
            alt="Widya Analytic"
            className="h-7 w-auto object-contain object-left md:h-8"
            width={160}
            height={32}
            decoding="async"
          />
        </button>

        <nav
          className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto lg:gap-1"
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
                  'shrink-0 rounded-full px-2 py-1 text-[11px] font-medium transition-colors sm:px-2.5 sm:py-1.5 sm:text-xs xl:px-3 xl:text-sm',
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

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={() => setLocale('id')}
            aria-pressed={locale === 'id'}
            lang="id"
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-all md:px-3 md:text-sm',
              locale === 'id' ? 'bg-brand-cyan text-white shadow-md shadow-brand-cyan/30' : 'text-brand-navy hover:bg-white/80',
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
              'rounded-full px-2.5 py-1 text-xs font-medium transition-all md:px-3 md:text-sm',
              locale === 'en' ? 'bg-brand-cyan text-white shadow-md shadow-brand-cyan/30' : 'text-brand-navy hover:bg-white/80',
            )}
          >
            EN
          </button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden rounded-full bg-brand-cyan px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-brand-cyan/25 transition-colors hover:bg-brand-mid-blue sm:inline-block md:px-4 md:text-sm"
          >
            {t(landingContent.hero, locale).ctaPrimary}
          </a>
        </div>
      </div>
    </header>
  );
}
