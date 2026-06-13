export const SCROLL_CONTAINER_ID = 'scroll-container';
export const SCROLL_CONTENT_ID = 'scroll-content';

/** Viewport at or above this width uses full-viewport slide snap + Lenis */
export const SLIDE_SCROLL_MEDIA = '(min-width: 1024px)';

export function isSlideScrollMode(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(SLIDE_SCROLL_MEDIA).matches;
}

/** Skip slide keyboard nav when focus is inside form fields or tab widgets */
export function shouldHandleSlideKeyboard(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return true;
  if (target.closest('input, textarea, select, [contenteditable="true"]')) return false;
  if (target.closest('[role="tablist"], [role="tab"]')) return false;
  return true;
}

export const SLIDE_NEXT_KEYS = new Set(['ArrowDown', 'ArrowRight', 'PageDown']);
export const SLIDE_PREV_KEYS = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);

export function getScrollContainer(): HTMLElement | null {
  return document.getElementById(SCROLL_CONTAINER_ID);
}

export function getScrollContent(): HTMLElement | null {
  return document.getElementById(SCROLL_CONTENT_ID) ?? getScrollContainer();
}

/** Extra clearance below the fixed mobile header when scrolling to a slide */
export const MOBILE_SCROLL_BUFFER_PX = 16;

/** Measured fixed header bottom + buffer; 0 on desktop snap mode */
export function getMobileHeaderOffset(): number {
  if (typeof window === 'undefined' || isSlideScrollMode()) return 0;

  const header = document.querySelector('header');
  if (!header) return 120;

  return header.getBoundingClientRect().bottom + MOBILE_SCROLL_BUFFER_PX;
}

export function getSectionScrollTarget(
  section: HTMLElement,
  container: HTMLElement,
  offset = 0,
): number {
  const containerRect = container.getBoundingClientRect();
  const sectionRect = section.getBoundingClientRect();
  return Math.max(0, container.scrollTop + (sectionRect.top - containerRect.top) - offset);
}
