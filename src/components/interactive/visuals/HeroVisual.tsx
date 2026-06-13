import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { OdooBrowserFrame } from '../ui/OdooBrowserFrame';
import { ErpDashboard } from './screens/ErpDashboard';
import { OdooStepBenefits } from './screens/OdooStepBenefits';
import type { ErpAppId } from './screens/erp.types';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { useOdooScenarioDemo, type OdooScenarioState } from '../../../hooks/useOdooScenarioDemo';

const initialScenarioState: OdooScenarioState = {
  stepIndex: 0,
  stepId: 'create-order',
  app: 'sales',
  showForm: false,
  formConfirming: false,
  orderConfirmed: false,
  highlightedRow: null,
  showSyncToast: false,
  stockValue: null,
};

interface HeroVisualProps {
  slideIndex: number;
}

export function HeroVisual({ slideIndex }: HeroVisualProps) {
  const reducedMotion = useReducedMotion();
  const [activeApp, setActiveApp] = useState<ErpAppId>('sales');
  const [demoActive, setDemoActive] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [scenario, setScenario] = useState<OdooScenarioState>(initialScenarioState);

  const onEnter = useCallback(() => setDemoActive(true), []);
  const onLeave = useCallback(() => setDemoActive(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  useOdooScenarioDemo({
    enabled: !userPaused,
    active: demoActive,
    reducedMotion,
    onStateChange: setScenario,
  });

  useEffect(() => {
    if (!userPaused && scenario.app) setActiveApp(scenario.app);
  }, [scenario.app, userPaused]);

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[88%] w-[95%] -translate-x-1/2 -translate-y-[42%] rounded-[2rem] bg-gradient-to-br from-brand-cyan/10 via-brand-muted/30 to-brand-mid-blue/8 blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-x-clip px-1 pb-14 pt-2 sm:px-4 sm:pb-20 sm:pt-3 lg:overflow-visible lg:px-6">
        <div className="relative z-10 mx-auto w-full">
          <OdooBrowserFrame>
            <ErpDashboard
              activeApp={activeApp}
              onAppChange={setActiveApp}
              autoPlay={!userPaused}
              demoActive={demoActive}
              onUserInteract={() => setUserPaused(true)}
              scenario={userPaused ? null : scenario}
            />
          </OdooBrowserFrame>

          <OdooStepBenefits stepIndex={scenario.stepIndex} />
        </div>
      </div>
    </div>
  );
}
