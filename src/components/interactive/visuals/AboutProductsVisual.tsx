import { useCallback, useState } from 'react';
import { fluidEase } from '../../../lib/motion';
import { BarChart3, Brain, Layers, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useSlideInView } from '../../../hooks/useSlideInView';

const productIcons: Record<string, LucideIcon> = {
  data: BarChart3,
  ai: Brain,
  odoo: Layers,
};

interface AboutProductsVisualProps {
  slideIndex: number;
  products: ReadonlyArray<{ iconId: string; name: string; blurb: string }>;
}

export function AboutProductsVisual({ slideIndex, products }: AboutProductsVisualProps) {
  const [visible, setVisible] = useState(false);

  const onEnter = useCallback(() => setVisible(true), []);
  const onLeave = useCallback(() => setVisible(false), []);

  useSlideInView(onEnter, onLeave, { slideIndex, threshold: 0.45 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.5, ease: fluidEase }}
      className="flex w-full max-w-xs justify-center sm:max-w-none"
    >
      <ul className="grid w-full max-w-[17rem] grid-cols-3 gap-3 sm:max-w-none sm:gap-10 lg:gap-14">
        {products.map((product, i) => {
          const Icon = productIcons[product.iconId] ?? Layers;

          return (
            <motion.li
              key={product.iconId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.06, ease: fluidEase }}
              className="flex flex-col items-center gap-3 text-center sm:gap-3.5"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-navy/10 bg-white/90 text-brand-cyan shadow-sm shadow-brand-navy/8 sm:h-16 sm:w-16">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.75} />
              </span>
              <p className="w-full text-[0.6875rem] font-semibold leading-snug text-brand-deep-navy sm:text-sm">
                {product.name}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
