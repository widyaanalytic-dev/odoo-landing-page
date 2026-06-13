import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { AtSign, Briefcase, Building2, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { NotepadFrame } from '../ui/NotepadFrame';
import { useSlideInView } from '../../../hooks/useSlideInView';

const identityIcons: Record<string, LucideIcon> = {
  company: Building2,
  address: MapPin,
  phone: Phone,
  email: Mail,
  instagram: AtSign,
  linkedin: Briefcase,
};

interface CtaVisualProps {
  slideIndex: number;
}

export function CtaVisual({ slideIndex }: CtaVisualProps) {
  const { locale } = useLang();
  const [visible, setVisible] = useState(false);

  const visual = t(landingContent.cta, locale).visual;
  const identity = visual?.identity ?? [];

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  const companyItem = identity.find((item) => item.iconId === 'company');
  const addressItem = identity.find((item) => item.iconId === 'address');
  const contactItems = identity.filter((item) => item.iconId !== 'company' && item.iconId !== 'address');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className="w-full max-w-sm mx-auto lg:max-w-md"
    >
      <NotepadFrame className="shadow-[0_12px_32px_-20px_rgba(14,42,71,0.18)]">
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex items-center gap-3 border-b border-brand-navy/8 pb-4 sm:pb-5">
            <img
              src="/logo.png"
              alt="Widya Analytic"
              className="h-8 w-auto object-contain sm:h-9"
              width={120}
              height={36}
              decoding="async"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand-deep-navy">Widya Analytic</p>
              <p className="text-xs text-brand-navy/50">{visual.tagline}</p>
            </div>
          </div>

          {identity.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/40">{visual.identityTitle}</p>

              {companyItem && (
                <p className="mt-2 text-sm font-semibold text-brand-deep-navy">{companyItem.value}</p>
              )}

              {addressItem && (
                <p className="mt-2 text-xs leading-relaxed text-brand-navy/60">{addressItem.value}</p>
              )}

              {contactItems.length > 0 && (
                <ul className="mt-4 divide-y divide-brand-navy/8 border-t border-brand-navy/8 pt-1">
                  {contactItems.map((item, i) => {
                    const Icon = identityIcons[item.iconId] ?? Mail;

                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
                        transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: fluidEase }}
                        className="flex gap-3 py-3.5 first:pt-3 last:pb-0 sm:gap-3.5 sm:py-4"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-cyan/10 text-brand-cyan">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-brand-navy/40">
                            {item.label}
                          </p>
                          {'href' in item && item.href ? (
                            <a
                              href={item.href}
                              className="mt-0.5 block break-all text-sm text-brand-navy/75 transition-colors hover:text-brand-cyan"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-0.5 break-words text-sm text-brand-navy/75">{item.value}</p>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </NotepadFrame>
    </motion.div>
  );
}
