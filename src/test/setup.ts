import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

class MockIntersectionObserver {
  constructor(_callback: IntersectionObserverCallback) {}
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [];
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

vi.stubGlobal('ResizeObserver', MockResizeObserver);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
