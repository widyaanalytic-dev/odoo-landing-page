export const SCROLL_CONTAINER_ID = 'scroll-container';
export const SCROLL_CONTENT_ID = 'scroll-content';

export function getScrollContainer(): HTMLElement | null {
  return document.getElementById(SCROLL_CONTAINER_ID);
}

export function getScrollContent(): HTMLElement | null {
  return document.getElementById(SCROLL_CONTENT_ID) ?? getScrollContainer();
}
