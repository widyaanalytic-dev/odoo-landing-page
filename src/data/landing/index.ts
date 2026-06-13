export * from './constants';
export * from './types';
export * from './content';

export function t<T extends Record<import('./types').Locale, unknown>>(obj: T, locale: import('./types').Locale): T[import('./types').Locale] {
  return obj[locale];
}
