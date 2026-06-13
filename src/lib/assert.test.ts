import { describe, expect, it } from 'vitest';
import { assertFound } from './assert';

describe('assertFound', () => {
  it('returns the value when defined', () => {
    expect(assertFound('ok', 'missing')).toBe('ok');
  });

  it('throws with message when undefined', () => {
    expect(() => assertFound(undefined, 'Item not found')).toThrow('Item not found');
  });
});
