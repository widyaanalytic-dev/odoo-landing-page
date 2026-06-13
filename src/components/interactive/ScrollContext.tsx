import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type Lenis from 'lenis';
import { getSlideIndex, slideMetaList, type SlideId } from '../../data/slides.config';
import { useLenisScroll } from '../../hooks/useLenisScroll';
import {
  getScrollContainer,
  getScrollContent,
  getMobileHeaderOffset,
  getSectionScrollTarget,
  SCROLL_CONTAINER_ID,
  SLIDE_SCROLL_MEDIA,
  SLIDE_NEXT_KEYS,
  SLIDE_PREV_KEYS,
  shouldHandleSlideKeyboard,
} from '../../lib/scroll';

export interface ScrollState {
  activeSlide: number;
  globalProgress: number;
  slideCount: number;
  scrollToSlide: (index: number) => void;
  scrollToSlideById: (id: SlideId) => void;
}

const ScrollContext = createContext<ScrollState | null>(null);

export function ScrollProvider({
  children,
  containerId = SCROLL_CONTAINER_ID,
}: {
  children: ReactNode;
  containerId?: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  const slideCount = slideMetaList.length;

  const lenisRef = useRef<Lenis | null>(null);

  const updateFromScroll = useCallback((scrollTop: number) => {
    const container = getScrollContainer();
    const scrollEl = getScrollContent();
    if (!container || !scrollEl) return;

    const sections = scrollEl.querySelectorAll<HTMLElement>('[data-slide]');
    const vh = container.clientHeight;
    const maxScroll = container.scrollHeight - vh;
    setGlobalProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);

    const desktopSnap = window.matchMedia(SLIDE_SCROLL_MEDIA).matches;
    const anchor = desktopSnap
      ? scrollTop + vh * 0.5
      : scrollTop + getMobileHeaderOffset();

    let found = 0;
    sections.forEach((section, i) => {
      if (anchor >= section.offsetTop) found = i;
    });
    setActiveSlide(found);
  }, []);

  const onScroll = useCallback(() => {
    const wrapper = getScrollContainer();
    if (!wrapper) return;
    const scrollTop = lenisRef.current?.scroll ?? wrapper.scrollTop;
    updateFromScroll(scrollTop);
  }, [updateFromScroll]);

  useLenisScroll(containerId, onScroll, lenisRef);

  const scrollToSlide = useCallback((index: number) => {
    const container = getScrollContainer();
    const scrollEl = getScrollContent();
    const section = scrollEl?.querySelector<HTMLElement>(`[data-slide="${index}"]`);
    if (!section || !container) return;

    const lenis = lenisRef.current;
    if (lenis) {
      container.classList.add('is-nav-scrolling');
      lenis.scrollTo(section, {
        duration: 1,
        lock: true,
        programmatic: true,
        onComplete: () => {
          container.classList.remove('is-nav-scrolling');
        },
      });
      return;
    }

    const offset = getMobileHeaderOffset();
    container.scrollTo({
      top: getSectionScrollTarget(section, container, offset),
      behavior: 'smooth',
    });
  }, [lenisRef]);

  const scrollToSlideById = useCallback(
    (id: SlideId) => {
      const index = getSlideIndex(slideMetaList, id);
      if (index >= 0) scrollToSlide(index);
    },
    [scrollToSlide],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!window.matchMedia(SLIDE_SCROLL_MEDIA).matches) return;
      if (!shouldHandleSlideKeyboard(e.target)) return;

      if (SLIDE_NEXT_KEYS.has(e.key)) {
        e.preventDefault();
        scrollToSlide(Math.min(slideCount - 1, activeSlide + 1));
        return;
      }

      if (SLIDE_PREV_KEYS.has(e.key)) {
        e.preventDefault();
        scrollToSlide(Math.max(0, activeSlide - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSlide, slideCount, scrollToSlide]);

  return (
    <ScrollContext.Provider
      value={{ activeSlide, globalProgress, slideCount, scrollToSlide, scrollToSlideById }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollState() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollState must be used within ScrollProvider');
  return ctx;
}
