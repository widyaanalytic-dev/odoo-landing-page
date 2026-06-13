import { useEffect } from 'react';
import Lenis from 'lenis';
import { SCROLL_CONTENT_ID, SLIDE_SCROLL_MEDIA } from '../lib/scroll';

export function useLenisScroll(
  containerId: string,
  onScroll: () => void,
  lenisRef: React.MutableRefObject<Lenis | null>,
): void {

  useEffect(() => {
    const wrapper = document.getElementById(containerId);
    const content = document.getElementById(SCROLL_CONTENT_ID);
    if (!wrapper || !content) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slideScrollMq = window.matchMedia(SLIDE_SCROLL_MEDIA);
    let raf = 0;
    let teardown: (() => void) | undefined;

    const mount = () => {
      teardown?.();
      teardown = undefined;

      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        document.documentElement.classList.remove('lenis', 'lenis-smooth');
      }

      const useLenis = !reducedMotion && slideScrollMq.matches;

      if (useLenis) {
        const lenis = new Lenis({
          wrapper,
          content,
          duration: 0.9,
          smoothWheel: true,
          syncTouch: false,
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

        teardown = () => {
          unsubscribe();
          cancelAnimationFrame(raf);
          lenis.destroy();
          lenisRef.current = null;
          document.documentElement.classList.remove('lenis', 'lenis-smooth');
        };
        return;
      }

      wrapper.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      teardown = () => wrapper.removeEventListener('scroll', onScroll);
    };

    mount();
    slideScrollMq.addEventListener('change', mount);

    return () => {
      slideScrollMq.removeEventListener('change', mount);
      teardown?.();
    };
  }, [containerId, onScroll, lenisRef]);
}
