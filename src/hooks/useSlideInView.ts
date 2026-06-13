import { useEffect } from 'react';
import { getScrollContainer } from '../lib/scroll';

interface UseSlideInViewOptions {
  threshold?: number;
  slideIndex?: number;
}

export function useSlideInView(
  onEnter: () => void,
  onLeave?: () => void,
  { threshold = 0.5, slideIndex }: UseSlideInViewOptions = {},
) {
  useEffect(() => {
    const root = getScrollContainer() ?? undefined;
    const selector = slideIndex !== undefined ? `[data-slide="${slideIndex}"]` : '[data-slide]';
    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter();
        else onLeave?.();
      },
      { threshold, root },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onEnter, onLeave, threshold, slideIndex]);
}
