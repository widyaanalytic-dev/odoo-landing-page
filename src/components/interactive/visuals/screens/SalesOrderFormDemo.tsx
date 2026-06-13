import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../LangProvider';
import { ODOO_SCENARIO_FORM } from './erp.launcher.config';

interface SalesOrderFormDemoProps {
  visible: boolean;
  confirming: boolean;
}

function useTypewriter(text: string, active: boolean, speed = 45) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!active) {
      setValue('');
      return;
    }
    if (reducedMotion) {
      setValue(text);
      return;
    }

    setValue('');
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [active, reducedMotion, speed, text]);

  return value;
}

export function SalesOrderFormDemo({ visible, confirming }: SalesOrderFormDemoProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const customer = useTypewriter(ODOO_SCENARIO_FORM.customer, visible, 78);
  const product = useTypewriter(ODOO_SCENARIO_FORM.product, visible && customer.length >= 5, 72);
  const qty = useTypewriter(ODOO_SCENARIO_FORM.qty, visible && product.length >= 5, 160);

  if (!visible) return null;

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-end justify-center bg-[#212529]/25 p-3 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.45, 0.05, 0.55, 0.95] }}
    >
      <motion.div
        className="w-full max-w-sm rounded-lg border border-[#dee2e6] bg-white shadow-xl"
        initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.45, 0.05, 0.55, 0.95] }}
      >
        <div className="border-b border-[#dee2e6] px-3 py-2">
          <p className="text-[11px] font-semibold text-[#212529]">{ODOO_SCENARIO_FORM.title[locale]}</p>
        </div>

        <div className="space-y-2.5 px-3 py-3">
          <label className="block">
            <span className="mb-1 block text-[9px] font-medium uppercase tracking-wide text-[#6c757d]">
              {ODOO_SCENARIO_FORM.customerLabel[locale]}
            </span>
            <span className="flex min-h-[28px] items-center rounded border border-[#714b67]/40 bg-[#faf8fa] px-2 text-[11px] text-[#212529]">
              {customer}
              {visible && customer.length < ODOO_SCENARIO_FORM.customer.length && (
                <motion.span
                  className="ml-0.5 inline-block h-3 w-px bg-[#714b67]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </label>

          <label className="block">
            <span className="mb-1 block text-[9px] font-medium uppercase tracking-wide text-[#6c757d]">
              {ODOO_SCENARIO_FORM.productLabel[locale]}
            </span>
            <span className="flex min-h-[28px] items-center rounded border border-[#ced4da] bg-white px-2 text-[11px] text-[#212529]">
              {product}
              {product.length > 0 && product.length < ODOO_SCENARIO_FORM.product.length && (
                <motion.span
                  className="ml-0.5 inline-block h-3 w-px bg-[#714b67]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </label>

          <label className="block w-24">
            <span className="mb-1 block text-[9px] font-medium uppercase tracking-wide text-[#6c757d]">
              {ODOO_SCENARIO_FORM.qtyLabel[locale]}
            </span>
            <span className="flex min-h-[28px] items-center rounded border border-[#ced4da] bg-white px-2 text-[11px] text-[#212529]">
              {qty}
            </span>
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#dee2e6] px-3 py-2">
          <motion.button
            type="button"
            className={`rounded px-3 py-1 text-[10px] font-semibold text-white lg:text-[11px] ${confirming ? 'bg-[#5c3d55] ring-2 ring-[#714b67]/40' : 'bg-[#714b67]'
              }`}
            animate={confirming ? { scale: [1, 0.97, 1] } : { scale: 1 }}
            transition={{ duration: 0.55, ease: [0.45, 0.05, 0.55, 0.95] }}
          >
            {ODOO_SCENARIO_FORM.confirmLabel[locale]}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
