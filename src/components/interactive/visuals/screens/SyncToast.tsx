import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../LangProvider';
import { RefreshCw } from 'lucide-react';

interface SyncToastProps {
  visible: boolean;
}

export function SyncToast({ visible }: SyncToastProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();

  if (!visible) return null;

  const message =
    locale === 'id' ? 'Stok tersinkron ke Inventaris' : 'Stock synced to Inventory';

  return (
    <motion.div
      className="pointer-events-none absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#28a745]/30 bg-white px-3 py-1.5 shadow-lg"
      initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <RefreshCw size={12} className="text-[#28a745]" strokeWidth={2.5} />
      <span className="whitespace-nowrap text-[10px] font-medium text-[#155724]">{message}</span>
    </motion.div>
  );
}
