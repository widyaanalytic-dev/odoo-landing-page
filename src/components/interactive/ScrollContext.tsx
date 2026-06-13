import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { getSlideIndex, slideMetaList, type SlideId } from '../../data/slides.config';
import {
  getScrollContainer,
  getScrollContent,
  SCROLL_CONTAINER_ID,
  SCROLL_CONTENT_ID,
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
  const lenisRef = useRef<Lenis | null>(null);

  const slideCount = slideMetaList.length;

  const updateFromScroll = useCallback((scrollTop: number) => {
    const container = getScrollContainer();
    const scrollEl = getScrollContent();
    if (!container || !scrollEl) return;

    const sections = scrollEl.querySelectorAll<HTMLElement>('[data-slide]');
    const vh = container.clientHeight;
    const maxScroll = container.scrollHeight - vh;
    setGlobalProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);

    let found = 0;
    sections.forEach((section, i) => {
      if (scrollTop >= section.offsetTop - vh * 0.5) found = i;
    });
    setActiveSlide(found);
  }, []);

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

    container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
  }, []);

  const scrollToSlideById = useCallback(
    (id: SlideId) => {
      const index = getSlideIndex(slideMetaList, id);
      if (index >= 0) scrollToSlide(index);
    },
    [scrollToSlide],
  );

  useEffect(() => {
    const wrapper = document.getElementById(containerId);
    const content = document.getElementById(SCROLL_CONTENT_ID);
    if (!wrapper || !content) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const onScroll = () => {
      const scrollTop = lenisRef.current?.scroll ?? wrapper.scrollTop;
      updateFromScroll(scrollTop);
    };

    if (!reducedMotion) {
      const lenis = new Lenis({
        wrapper,
        content,
        duration: 0.9,
        smoothWheel: true,
        syncTouch: true,
      });
      lenisRef.current = lenis;
      document.documentElement.classList.add('lenis', 'lenis-smooth');

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const unsubscribe = lenis.on('scroll', onScroll);
      onScroll();

      return () => {
        unsubscribe();
        cancelAnimationFrame(raf);
        lenis.destroy();
        lenisRef.current = null;
        document.documentElement.classList.remove('lenis', 'lenis-smooth');
      };
    }

    wrapper.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => wrapper.removeEventListener('scroll', onScroll);
  }, [containerId, updateFromScroll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSlide(Math.min(slideCount - 1, activeSlide + 1));
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
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
