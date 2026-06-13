import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle, ClipboardList, Clock, FileText, Puzzle, Users } from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { PainVisualShell } from './PainVisualShell';

const sceneIcons = [FileText, Users, Puzzle] as const;
const sceneAccents = [
  'border-amber-200/70 bg-amber-50/80',
  'border-orange-200/70 bg-orange-50/80',
  'border-red-200/60 bg-red-50/70',
] as const;
const badgeStyles = [
  'bg-amber-100 text-amber-700 ring-amber-200/70',
  'bg-orange-100 text-orange-700 ring-orange-200/70',
  'bg-red-100 text-red-700 ring-red-200/70',
] as const;
const sceneShift = [0, 18, 36] as const;

interface PainProcessVisualProps {
  slideIndex: number;
}

export function PainProcessVisual({ slideIndex }: PainProcessVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const content = t(landingContent.painVisual.process, locale);

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <PainVisualShell
      hint={content.hint}
      icon={ClipboardList}
      boxClassName="border-amber-200/70 bg-amber-50/45 text-amber-950/85"
      iconClassName="bg-amber-100/90 text-amber-600 ring-amber-200/60"
    >
      <div className="relative flex min-h-[220px] items-center justify-center px-0 py-2 sm:min-h-[300px] sm:px-4 sm:py-4">
        <div className="relative w-full max-w-md">
          <div className="flex flex-col gap-5">
            {content.scenes.map((scene, i) => {
              const Icon = sceneIcons[i] ?? FileText;
              const accent = sceneAccents[i] ?? sceneAccents[0];
              const badge = badgeStyles[i] ?? badgeStyles[0];
              const shift = sceneShift[i] ?? 0;

              return (
                <motion.div
                  key={scene.label}
                  className="relative flex items-start gap-4"
                  style={{ marginLeft: `${shift}px` }}
                  initial={{ opacity: 0, x: reducedMotion ? shift : shift + 20 }}
                  animate={{ opacity: visible ? 1 : 0, x: shift }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.18, ease: fluidEase }}
                >
                  <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-navy/10 bg-white shadow-sm">
                    <Icon size={18} className="text-brand-mid-blue" strokeWidth={2} />
                  </span>

                  <div className={`min-w-0 flex-1 rounded-2xl border px-4 py-3.5 shadow-sm ${accent}`}>
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-brand-navy/85">{scene.label}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${badge}`}
                      >
                        {i === 0 && <Clock size={10} strokeWidth={2.5} />}
                        {i === 1 && <AlertTriangle size={10} strokeWidth={2.5} />}
                        {i === 2 && <Puzzle size={10} strokeWidth={2.5} />}
                        {scene.badge}
                      </span>
                    </div>
                    <p className="text-xs leading-snug text-brand-navy/65 sm:text-[13px]">{scene.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PainVisualShell>
  );
}
