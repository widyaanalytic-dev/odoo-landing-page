import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { landingContent, t } from '../../../data/landing';
import { useLang } from '../LangProvider';
import { useSlideInView } from '../../../hooks/useSlideInView';
import { DesktopFrame } from '../ui/DesktopFrame';
import { ModulesOdooLauncher } from './ModulesOdooLauncher';

const visualSlotClass = 'min-h-0 lg:min-h-[min(24rem,calc(100dvh-14rem))]';

interface ModulesVisualProps {
  slideIndex: number;
}

export function ModulesVisual({ slideIndex }: ModulesVisualProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const content = t(landingContent.modules, locale);

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className={`mx-auto flex w-full max-w-xl items-center justify-center px-1 ${visualSlotClass}`}
    >
      <DesktopFrame>
        <ModulesOdooLauncher
          categories={content.categories}
          items={content.items}
          locale={locale}
          visible={visible}
          reducedMotion={reducedMotion}
        />
      </DesktopFrame>
    </motion.div>
  );
}
