import { motion } from 'motion/react';
import { fluidEase } from '../../../lib/motion';
import { User } from 'lucide-react';
import type { ModuleCatalogItem } from '../../../data/landing';
import type { Locale } from '../../../data/landing';
import {
  MODULE_CATEGORY_ORDER,
  MODULE_ODOO_ICON_FALLBACK,
  MODULE_ODOO_ICONS,
  MODULE_TRIAL_LABELS,
  type ModuleCategoryId,
  type ModuleId,
} from './modules.visual.config';

interface ModulesOdooLauncherProps {
  categories: Record<ModuleCategoryId, string>;
  items: ModuleCatalogItem[];
  locale: Locale;
  visible: boolean;
  reducedMotion: boolean | null;
}

export function ModulesOdooLauncher({
  categories,
  items,
  locale,
  visible,
  reducedMotion,
}: ModulesOdooLauncherProps) {
  const groups = MODULE_CATEGORY_ORDER.map((categoryId) => ({
    categoryId,
    title: categories[categoryId],
    items: items.filter((item) => item.category === categoryId),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="odoo-trial-launcher relative flex h-full min-h-0 flex-col overflow-hidden">
      <header className="odoo-trial-launcher__header">
        <img
          src="/odoo-logo.svg"
          alt="Odoo"
          className="odoo-trial-launcher__header-logo"
          width={72}
          height={22}
          decoding="async"
        />
        <span className="odoo-trial-launcher__header-profile" aria-hidden>
          <User size={12} strokeWidth={2.25} />
        </span>
      </header>

      <div
        data-lenis-prevent
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:thin] sm:px-4 sm:py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#adb5bd]/80 [&::-webkit-scrollbar-track]:bg-transparent"
      >
        {groups.map((group, groupIndex) => (
          <motion.section
            key={group.categoryId}
            className="odoo-trial-launcher__section"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
            transition={{
              duration: 0.35,
              delay: reducedMotion ? 0 : 0.05 + groupIndex * 0.04,
              ease: fluidEase,
            }}
          >
            <h6 className="odoo-trial-launcher__section-title">{group.title}</h6>
            <div className="odoo-trial-launcher__grid">
              {group.items.map((mod, itemIndex) => (
                <motion.div
                  key={mod.id}
                  className="odoo-trial-launcher__app"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
                  transition={{
                    duration: 0.28,
                    delay: reducedMotion ? 0 : 0.08 + groupIndex * 0.04 + itemIndex * 0.02,
                    ease: fluidEase,
                  }}
                >
                  <img
                    src={MODULE_ODOO_ICONS[mod.id as ModuleId]}
                    alt=""
                    width={32}
                    height={32}
                    loading="lazy"
                    decoding="async"
                    className="odoo-trial-launcher__app-icon"
                    onError={(event) => {
                      event.currentTarget.src = MODULE_ODOO_ICON_FALLBACK;
                    }}
                  />
                  <div className="odoo-trial-launcher__app-name">
                    {MODULE_TRIAL_LABELS[mod.id as ModuleId][locale]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
        <div className="h-2 shrink-0" aria-hidden />
      </div>
    </div>
  );
}
