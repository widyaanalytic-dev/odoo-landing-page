import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle, FileSpreadsheet } from 'lucide-react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { PainVisualShell } from './PainVisualShell';

interface PainDataVisualProps {
  slideIndex: number;
}

export function PainDataVisual({ slideIndex }: PainDataVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const content = t(landingContent.pain.visual.data, locale);

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <PainVisualShell
      hint={content.hint}
      icon={FileSpreadsheet}
      boxClassName="border-brand-navy/12 bg-brand-muted/50 text-brand-navy/85"
      iconClassName="bg-green-100/90 text-green-700 ring-green-200/60"
    >
      <div className="px-1 sm:px-2">
        <motion.div
          className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white/80 shadow-md shadow-brand-navy/[0.05] backdrop-blur-sm"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ duration: 0.5, ease: fluidEase }}
        >
          <div className="hidden grid-cols-[1.4fr_1fr_auto] gap-3 border-b border-brand-navy/8 bg-brand-muted/40 px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-brand-navy/45 sm:grid sm:px-5">
            <span>{content.tableHeaders.system}</span>
            <span>{content.tableHeaders.metric}</span>
            <span className="text-right">{content.tableHeaders.status}</span>
          </div>

          <div className="divide-y divide-brand-navy/[0.06]">
            {content.rows.map((row, i) => (
              <motion.div
                key={row.system}
                className="px-4 py-3.5 sm:grid sm:grid-cols-[1.4fr_1fr_auto] sm:items-center sm:gap-3 sm:px-5 sm:py-4"
                initial={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                animate={{ opacity: visible ? 1 : 0, x: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.16, ease: fluidEase }}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-navy/85 sm:truncate">{row.system}</p>
                  <p className="mt-0.5 text-[10px] text-brand-navy/40">
                    {locale === 'id' ? 'Diperbarui' : 'Updated'} · {row.updated}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 sm:mt-0 sm:contents">
                  <p className="text-sm font-medium tabular-nums text-brand-navy/75">{row.metric}</p>
                  <span className="inline-flex items-center gap-1 self-start rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200/70 sm:px-2.5 sm:py-1 sm:text-[10px]">
                    <AlertCircle size={11} strokeWidth={2.5} />
                    {row.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-center text-xs font-medium leading-snug text-brand-navy/50 sm:text-[13px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.45, delay: 0.75, ease: fluidEase }}
        >
          {content.footer}
        </motion.p>
      </div>
    </PainVisualShell>
  );
}
