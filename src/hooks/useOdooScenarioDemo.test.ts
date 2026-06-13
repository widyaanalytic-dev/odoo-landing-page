import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOdooScenarioDemo } from './useOdooScenarioDemo';

describe('useOdooScenarioDemo', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not update state when inactive', () => {
    const onStateChange = vi.fn();

    renderHook(() =>
      useOdooScenarioDemo({
        enabled: true,
        active: false,
        reducedMotion: false,
        onStateChange,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(onStateChange).not.toHaveBeenCalled();
  });

  it('advances scenario when active', () => {
    const onStateChange = vi.fn();

    renderHook(() =>
      useOdooScenarioDemo({
        enabled: true,
        active: true,
        reducedMotion: true,
        onStateChange,
      }),
    );

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onStateChange).toHaveBeenCalled();
    const lastCall = onStateChange.mock.calls.at(-1)?.[0];
    expect(lastCall).toMatchObject({
      stepIndex: expect.any(Number),
      app: expect.any(String),
      stepId: expect.any(String),
    });
  });
});
