import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSlideInView } from './useSlideInView';

describe('useSlideInView', () => {
  it('does not throw when scroll container is missing', () => {
    expect(() => {
      renderHook(() => useSlideInView(() => {}, undefined, { slideIndex: 0 }));
    }).not.toThrow();
  });

  it('calls onEnter when observed element intersects', () => {
    const onEnter = vi.fn();
    const el = document.createElement('section');
    el.setAttribute('data-slide', '0');
    document.body.appendChild(el);

    let observerCallback: IntersectionObserverCallback = () => {};
    const observe = vi.fn();

    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }
      observe = observe;
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    renderHook(() => useSlideInView(onEnter, undefined, { slideIndex: 0, threshold: 0.45 }));

    observerCallback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(onEnter).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(el);

    document.body.removeChild(el);
    vi.unstubAllGlobals();
  });
});
