import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { partnerLogos } from '../../../data/partners';
import type { PartnerLogo } from '../../../data/partners';
import { partnerLogoImgClass, partnerLogoNeedsBlend } from '../../../lib/partner-logo';
import { cn } from '../../../lib/cn';
import { fluidEase, smoothEase } from '../../../lib/motion';

const DEFAULT_PAGE_SIZE = 8;

interface PartnerLogoGridPagination {
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  prevLabel: string;
  nextLabel: string;
}

interface PartnerLogoGridProps {
  label?: string;
  items?: PartnerLogo[];
  showNames?: boolean;
  pagination?: PartnerLogoGridPagination;
}

function PartnerLogoSlot({
  item,
  showNames,
  index,
}: {
  item: (typeof partnerLogos)[number];
  showNames: boolean;
  index: number;
}) {
  const needsBlend = partnerLogoNeedsBlend(item.src, item.status);
  const floatClass = index % 4 === 1 ? 'sm:mt-2' : index % 4 === 3 ? 'sm:-mt-1' : '';

  return (
    <motion.div
      className={cn('group flex min-w-0 flex-col items-center', floatClass)}
      title={item.name}
      whileHover={showNames ? { y: -2 } : undefined}
      transition={{ duration: 0.2, ease: smoothEase }}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden',
          'h-12 w-[5.75rem] sm:h-14 sm:w-[7rem] lg:h-16 lg:w-[7.5rem]',
        )}
      >
        <img
          src={item.src}
          alt={item.name}
          className={partnerLogoImgClass(
            item.src,
            item.status,
            cn(
              'pointer-events-none max-h-full max-w-full select-none object-contain opacity-90 transition duration-300',
              'group-hover:scale-[1.05] group-hover:opacity-100',
              needsBlend && 'scale-[1.08] sm:scale-[1.1]',
            ),
          )}
          width={120}
          height={48}
          loading="lazy"
          decoding="async"
        />
      </div>

      {showNames && (
        <span className="mt-2 max-w-[6.75rem] truncate px-1 text-center text-[0.6875rem] font-medium text-brand-navy/40 transition duration-300 group-hover:text-brand-navy/65 sm:max-w-[7.5rem] sm:text-xs">
          {item.name}
        </span>
      )}
    </motion.div>
  );
}

export function PartnerLogoGrid({
  label,
  items = partnerLogos,
  showNames = false,
  pagination,
}: PartnerLogoGridProps) {
  const reducedMotion = useReducedMotion();
  const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
  const page = pagination?.page ?? 1;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const visibleItems = pagination
    ? items.slice((safePage - 1) * pageSize, safePage * pageSize)
    : items;

  return (
    <div className="flex w-full flex-col items-center">
      {label && (
        <p className="mb-5 self-start text-sm font-medium text-brand-navy/45 sm:mb-6">{label}</p>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={pagination ? safePage : 'all'}
          initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
          transition={{ duration: 0.32, ease: smoothEase }}
          className="flex w-full flex-wrap items-end justify-center gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-9 lg:gap-x-10"
        >
          {visibleItems.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: reducedMotion ? 0 : i * 0.04, ease: fluidEase }}
            >
              <PartnerLogoSlot item={item} showNames={showNames} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {pagination && totalPages > 1 && (
        <nav
          className="mt-8 inline-flex items-center gap-1 rounded-full bg-brand-navy/[0.045] p-1 sm:mt-9"
          aria-label={label ?? 'Partners pagination'}
        >
          <button
            type="button"
            onClick={() => pagination.onPageChange(safePage - 1)}
            disabled={safePage <= 1}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full text-brand-deep-navy/70 transition duration-200',
              safePage <= 1
                ? 'cursor-not-allowed opacity-30'
                : 'hover:bg-white/70 hover:text-brand-cyan',
            )}
            aria-label={pagination.prevLabel}
          >
            <ChevronLeft size={18} aria-hidden />
          </button>

          <span className="min-w-[3.5rem] px-1 text-center text-xs font-medium tabular-nums text-brand-navy/45">
            {safePage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => pagination.onPageChange(safePage + 1)}
            disabled={safePage >= totalPages}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full text-brand-deep-navy/70 transition duration-200',
              safePage >= totalPages
                ? 'cursor-not-allowed opacity-30'
                : 'hover:bg-white/70 hover:text-brand-cyan',
            )}
            aria-label={pagination.nextLabel}
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </nav>
      )}
    </div>
  );
}
