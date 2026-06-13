import { useEffect, useRef } from 'react';
import { wait } from '../lib/async';
import type { ErpAppId } from '../components/interactive/visuals/screens/erp.types';
import {
  ODOO_SCENARIO_LOOP_PAUSE,
  ODOO_SCENARIO_STEPS,
  type OdooScenarioStepId,
} from '../components/interactive/visuals/screens/erp.launcher.config';

export interface OdooScenarioState {
  stepIndex: number;
  stepId: OdooScenarioStepId;
  app: ErpAppId;
  showForm: boolean;
  formConfirming: boolean;
  orderConfirmed: boolean;
  highlightedRow: string | null;
  showSyncToast: boolean;
  stockValue: number | null;
}

interface UseOdooScenarioDemoOptions {
  enabled: boolean;
  active: boolean;
  reducedMotion: boolean | null;
  onStateChange: (state: OdooScenarioState) => void;
}

const TIMING = {
  stepIntro: 900,
  formTyping: 4600,
  formConfirm: 1500,
  formClose: 1000,
  highlight: 4000,
  stockSettle: 900,
  stockAnimate: 3000,
  syncToast: 2400,
  invoice: 4400,
  loopPause: ODOO_SCENARIO_LOOP_PAUSE,
} as const;

function buildState(partial: Partial<OdooScenarioState> & Pick<OdooScenarioState, 'stepIndex'>): OdooScenarioState {
  const step = ODOO_SCENARIO_STEPS[partial.stepIndex] ?? ODOO_SCENARIO_STEPS[0];
  return {
    stepId: step.id,
    app: step.app,
    showForm: false,
    formConfirming: false,
    orderConfirmed: false,
    highlightedRow: null,
    showSyncToast: false,
    stockValue: null,
    ...partial,
  };
}

export function useOdooScenarioDemo({
  enabled,
  active,
  reducedMotion,
  onStateChange,
}: UseOdooScenarioDemoOptions) {
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  useEffect(() => {
    if (!enabled || !active) return;

    const controller = new AbortController();
    const { signal } = controller;

    const emit = (state: OdooScenarioState) => onStateChangeRef.current(state);

    async function runCreateOrder(stepIndex: number) {
      emit(buildState({ stepIndex, showForm: true }));
      await wait(reducedMotion ? 400 : TIMING.formTyping, signal);
      emit(buildState({ stepIndex, showForm: true, formConfirming: true }));
      await wait(reducedMotion ? 200 : TIMING.formConfirm, signal);
      emit(
        buildState({
          stepIndex,
          showForm: false,
          formConfirming: false,
          orderConfirmed: true,
        }),
      );
      await wait(reducedMotion ? 200 : TIMING.formClose, signal);
    }

    async function runHighlightStep(stepIndex: number, row: string, duration: number) {
      emit(buildState({ stepIndex, highlightedRow: row, orderConfirmed: true }));
      await wait(reducedMotion ? 600 : duration, signal);
      emit(buildState({ stepIndex, highlightedRow: null, orderConfirmed: true }));
    }

    async function runInventoryStep(stepIndex: number) {
      const step = ODOO_SCENARIO_STEPS[stepIndex];
      emit(
        buildState({
          stepIndex,
          highlightedRow: step.highlightRow ?? null,
          orderConfirmed: true,
          stockValue: step.stockAnimation?.from ?? null,
        }),
      );
      await wait(reducedMotion ? 400 : TIMING.stockSettle, signal);
      emit(
        buildState({
          stepIndex,
          highlightedRow: step.highlightRow ?? null,
          orderConfirmed: true,
          showSyncToast: true,
          stockValue: step.stockAnimation?.from ?? null,
        }),
      );
      await wait(reducedMotion ? 500 : TIMING.syncToast, signal);
      emit(
        buildState({
          stepIndex,
          highlightedRow: step.highlightRow ?? null,
          orderConfirmed: true,
          showSyncToast: false,
          stockValue: step.stockAnimation?.to ?? null,
        }),
      );
      await wait(reducedMotion ? 500 : TIMING.stockAnimate, signal);
    }

    async function loop() {
      while (!signal.aborted) {
        for (let i = 0; i < ODOO_SCENARIO_STEPS.length; i += 1) {
          const step = ODOO_SCENARIO_STEPS[i];

          if (step.id === 'create-order') {
            emit(buildState({ stepIndex: i }));
            await wait(reducedMotion ? 300 : TIMING.stepIntro, signal);
            await runCreateOrder(i);
            continue;
          }

          if (step.id === 'confirm-order' && step.highlightRow) {
            emit(buildState({ stepIndex: i, orderConfirmed: true }));
            await wait(reducedMotion ? 300 : TIMING.stepIntro, signal);
            await runHighlightStep(i, step.highlightRow, TIMING.highlight);
            continue;
          }

          if (step.id === 'sync-inventory') {
            emit(buildState({ stepIndex: i, orderConfirmed: true }));
            await wait(reducedMotion ? 300 : TIMING.stepIntro, signal);
            await runInventoryStep(i);
            continue;
          }

          if (step.id === 'invoice-created' && step.highlightRow) {
            emit(buildState({ stepIndex: i, orderConfirmed: true }));
            await wait(reducedMotion ? 300 : TIMING.stepIntro, signal);
            await runHighlightStep(i, step.highlightRow, TIMING.invoice);
          }
        }

        emit(buildState({ stepIndex: 0, orderConfirmed: false }));
        await wait(reducedMotion ? 800 : TIMING.loopPause, signal);
      }
    }

    if (reducedMotion) {
      emit(
        buildState({
          stepIndex: ODOO_SCENARIO_STEPS.length - 1,
          orderConfirmed: true,
          highlightedRow: 'INV/2024/0882',
          stockValue: 92,
        }),
      );
      return;
    }

    loop().catch((error) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      throw error;
    });

    return () => controller.abort();
  }, [enabled, active, reducedMotion]);
}
