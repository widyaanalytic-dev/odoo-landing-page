import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../LangProvider';
import type { ErpAppId } from './erp.types';
import { launcherCategories, launcherTileKey } from './erp.launcher.config';
import { launcherCategory, launcherOverlay, launcherTile } from './erp.motion';

interface OdooAppLauncherProps {
  activeApp: ErpAppId;
  onSelect: (app: ErpAppId) => void;
  onClose: () => void;
  onManualInteract?: () => void;
}

export function OdooAppLauncher({
  activeApp,
  onSelect,
  onClose,
  onManualInteract,
}: OdooAppLauncherProps) {
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleSelect = (app: (typeof launcherCategories)[number]['apps'][number], tileKey: string) => {
    if (!app.clickable) return;
    if (app.id === 'crm' || app.id === 'purchase' || app.id === 'manufacturing') return;

    onManualInteract?.();

    if (reducedMotion) {
      onSelect(app.id as ErpAppId);
      return;
    }

    setSelectedKey(tileKey);
    window.setTimeout(() => onSelect(app.id as ErpAppId), 280);
  };

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col overflow-hidden bg-[#f0f0f0]"
      variants={launcherOverlay}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div
        className="flex items-center justify-between border-b border-[#dee2e6] bg-white px-3 py-2"
        initial={reducedMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
      >
        <img src="/odoo_logo.png" alt="Odoo" className="h-5 w-auto" />
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-[#6c757d] hover:bg-[#f8f9fa]"
          aria-label={locale === 'id' ? 'Tutup' : 'Close'}
        >
          <X size={16} />
        </button>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {launcherCategories.map((cat, catIndex) => (
          <motion.div
            key={cat.key}
            className="mb-4 last:mb-0"
            variants={launcherCategory}
            initial={reducedMotion ? false : 'hidden'}
            animate="show"
            transition={{ delay: reducedMotion ? 0 : 0.08 + catIndex * 0.06 }}
          >
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-[#6c757d]">
              {cat.title[locale]}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {cat.apps.map((app) => {
                const Icon = app.icon;
                const tileKey = launcherTileKey(cat.key, app.label.en);
                const isActive = app.clickable && app.id === activeApp;
                const isDisabled = !app.clickable;
                const isSelected = selectedKey === tileKey;

                return (
                  <motion.button
                    key={tileKey}
                    type="button"
                    disabled={isDisabled || (selectedKey !== null && !isSelected)}
                    variants={launcherTile}
                    initial={reducedMotion ? false : 'hidden'}
                    animate={isSelected ? 'selected' : 'show'}
                    whileTap={isDisabled || selectedKey !== null ? undefined : 'tap'}
                    transition={{
                      delay: reducedMotion ? 0 : 0.12 + catIndex * 0.06 + cat.apps.indexOf(app) * 0.04,
                    }}
                    onClick={() => handleSelect(app, tileKey)}
                    className={`relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors ${
                      isDisabled ? 'cursor-default opacity-45' : 'hover:bg-white/80'
                    } ${isActive ? 'bg-white ring-2 ring-[#714b67]/40' : ''}`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${app.iconBg}`}
                    >
                      <Icon size={18} className="text-white" strokeWidth={2} />
                    </span>
                    <span className="text-center text-[9px] font-medium leading-tight text-[#212529]">
                      {app.label[locale]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
