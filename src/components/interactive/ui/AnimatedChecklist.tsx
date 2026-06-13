import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { CheckSquare } from '../../../lib/icons';
import { useLang } from '../LangProvider';

export interface PainChecklistItem {
  before: string;
  emphasis: string;
  after: string;
}

interface AnimatedChecklistProps {
  items: { id: PainChecklistItem[]; en: PainChecklistItem[] };
  slideIndex: number;
}

const CHECKLIST_INTERVAL_MS = 2000;

function itemKey(item: PainChecklistItem) {
  return `${item.before}${item.emphasis}${item.after}`;
}

export function AnimatedChecklist({ items, slideIndex }: AnimatedChecklistProps) {
  const { locale } = useLang();
  const list = items[locale];
  const [activeIndex, setActiveIndex] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const reducedMotion = useReducedMotion();

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const startAnimation = useCallback(() => {
    clearTimer();
    if (reducedMotion) {
      setActiveIndex(list.length);
      return;
    }
    setActiveIndex(0);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i += 1;
      if (i >= list.length) {
        clearTimer();
        setActiveIndex(list.length);
        return;
      }
      setActiveIndex(i);
    }, CHECKLIST_INTERVAL_MS);
  }, [clearTimer, list.length, reducedMotion]);

  const stopAnimation = useCallback(() => {
    clearTimer();
    setActiveIndex(-1);
  }, [clearTimer]);

  useSlideInView(startAnimation, stopAnimation, { slideIndex, threshold: 0.5 });

  useEffect(() => () => clearTimer(), [clearTimer]);

  return (
    <ul className="mt-4 space-y-4 sm:mt-6 sm:space-y-5 md:space-y-8 lg:mt-10" aria-live="polite">
      {list.map((item, i) => {
        const isPast = i < activeIndex;
        const isActive = i === activeIndex && activeIndex < list.length;
        const isFuture = i > activeIndex && activeIndex < list.length;

        return (
          <motion.li
            key={itemKey(item)}
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: isFuture ? 0.25 : isPast ? 0.4 : 1,
              y: 0,
            }}
            transition={{ duration: 0.4 }}
            className={`text-checklist flex min-w-0 items-start gap-4 sm:gap-5 ${
              isPast ? 'line-through decoration-brand-navy/30' : ''
            } ${isActive ? 'font-medium text-brand-deep-navy' : 'text-brand-navy/70'}`}
          >
            <CheckSquare className="mt-1 shrink-0 text-brand-cyan sm:hidden" size={24} strokeWidth={2} />
            <CheckSquare className="mt-1 hidden shrink-0 text-brand-cyan sm:block" size={30} strokeWidth={2} />
            <span className="min-w-0 break-words">
              {item.before}
              <strong className={isPast ? 'font-semibold' : 'font-bold text-brand-deep-navy'}>
                {item.emphasis}
              </strong>
              {item.after}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
