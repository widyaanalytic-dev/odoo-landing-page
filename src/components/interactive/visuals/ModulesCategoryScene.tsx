import { Fragment } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion } from 'motion/react';
import {
  ClipboardList,
  Clock,
  CreditCard,
  Factory,
  Handshake,
  Package,
  ShoppingCart,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import type { ModuleSceneStep } from '../../../data/landing';
import type { ModuleCategoryId } from './modules.visual.config';

export interface ModulesCategorySceneContent {
  caption: string;
  steps: ModuleSceneStep[];
}

const categoryStepIcons: Record<ModuleCategoryId, LucideIcon[]> = {
  commercial: [Handshake, ShoppingCart, Package],
  finance: [Package, Wallet, ClipboardList],
  hr: [Clock, CreditCard],
  operations: [ClipboardList, Factory, Package],
};

interface ModulesCategorySceneProps {
  categoryId: ModuleCategoryId;
  scene: ModulesCategorySceneContent;
  active: boolean;
  reducedMotion: boolean | null;
}

function StepConnector({
  active,
  delay,
  reducedMotion,
}: {
  active: boolean;
  delay: number;
  reducedMotion: boolean | null;
}) {
  return (
    <div className="flex min-w-[0.75rem] flex-1 items-center self-start pt-4">
      <div className="h-0.5 w-full rounded-full bg-brand-navy/10">
        <motion.div
          className="h-full origin-left rounded-full bg-brand-cyan"
          initial={{ scaleX: reducedMotion ? 1 : 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.45, delay: reducedMotion ? 0 : delay, ease: fluidEase }}
        />
      </div>
    </div>
  );
}

export function ModulesCategoryScene({
  categoryId,
  scene,
  active,
  reducedMotion,
}: ModulesCategorySceneProps) {
  const icons = categoryStepIcons[categoryId];
  const steps = scene.steps.slice(0, icons.length);

  return (
    <div>
      <div className="flex w-full items-start">
        {steps.map((step, i) => {
          const Icon = icons[i] ?? Package;
          const isLast = i === steps.length - 1;

          return (
            <Fragment key={step.label}>
              {i > 0 && (
                <StepConnector
                  active={active}
                  delay={0.12 + i * 0.12}
                  reducedMotion={reducedMotion}
                />
              )}
              <motion.div
                className="flex w-[4.5rem] shrink-0 flex-col items-center text-center sm:w-[5rem]"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
                transition={{
                  duration: 0.32,
                  delay: reducedMotion ? 0 : 0.1 + i * 0.1,
                  ease: fluidEase,
                }}
              >
                <motion.span
                  className={`relative z-10 mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm ${
                    isLast
                      ? 'border-brand-cyan/30 bg-brand-cyan text-white shadow-brand-cyan/15'
                      : 'border-brand-cyan/20 bg-white text-brand-cyan'
                  }`}
                  initial={{ scale: reducedMotion ? 1 : 0.9 }}
                  animate={{ scale: active ? 1 : 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: reducedMotion ? 0 : 0.14 + i * 0.1,
                    ease: fluidEase,
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                </motion.span>
                <span className="text-[10px] font-bold leading-snug text-brand-deep-navy">{step.label}</span>
                <span className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-brand-navy/50 sm:text-[10px]">
                  {step.detail}
                </span>
              </motion.div>
            </Fragment>
          );
        })}
      </div>

      <motion.p
        className="mt-3 text-center text-[11px] font-medium text-brand-navy/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.28, delay: reducedMotion ? 0 : 0.45, ease: fluidEase }}
      >
        {scene.caption}
      </motion.p>
    </div>
  );
}
