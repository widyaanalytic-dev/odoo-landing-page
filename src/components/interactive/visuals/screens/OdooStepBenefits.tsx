import type { LucideIcon } from 'lucide-react';
import { fluidEase } from '../../../../lib/motion';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../LangProvider';
import { ODOO_SCENARIO_STEPS } from './erp.launcher.config';

interface OdooStepBenefitsProps {
  stepIndex: number;
}

function BenefitRow({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan/14 ring-1 ring-brand-cyan/25">
        <Icon size={11} className="text-brand-cyan" strokeWidth={2.2} />
      </span>
      <span className="text-[10px] leading-snug text-brand-deep-navy/82 sm:text-[11px]">{text}</span>
    </li>
  );
}

export function OdooStepBenefits({ stepIndex }: OdooStepBenefitsProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const step = ODOO_SCENARIO_STEPS[stepIndex] ?? ODOO_SCENARIO_STEPS[0];
  const points = step.benefits[locale];
  const icons = step.benefits.icons;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        className="pointer-events-none absolute right-0 -bottom-4 z-30 max-w-[min(100%,12.5rem)] sm:-right-2 sm:-bottom-5 sm:max-w-[15rem]"
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.42, ease: fluidEase }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/35 bg-white/40 shadow-[0_12px_32px_-10px_rgba(14,42,71,0.18)] backdrop-blur-[12px]">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/[0.08] via-white/10 to-brand-mid-blue/[0.05]" />
          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-brand-cyan/70 via-brand-cyan/40 to-brand-mid-blue/30" />

          <div className="relative px-3.5 py-3 pl-4 sm:px-4 sm:py-3.5 sm:pl-[1.125rem]">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-cyan">
                {step.shortLabel[locale]}
              </span>

              <div className="flex items-center gap-1">
                {ODOO_SCENARIO_STEPS.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-1 w-1 rounded-full transition-colors duration-300 ${i === stepIndex ? 'bg-brand-cyan' : 'bg-brand-navy/15'
                      }`}
                  />
                ))}
              </div>
            </div>

            <ul className="space-y-1.5">
              {points.map((point, index) => (
                <BenefitRow key={point} icon={icons[index] ?? icons[0]} text={point} />
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
