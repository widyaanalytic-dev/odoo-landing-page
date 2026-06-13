import { Bell, LayoutGrid, Search, User } from 'lucide-react';
import { ERP_APPS } from '../erp.apps.config';
import type { ErpAppId } from '../erp.types';

interface ErpAppListPanelProps {
  activeApp: ErpAppId;
  locale: 'id' | 'en';
  onOpenLauncher: () => void;
  onSelectApp: (app: ErpAppId) => void;
}

export function ErpAppListPanel({
  activeApp,
  locale,
  onOpenLauncher,
  onSelectApp,
}: ErpAppListPanelProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[#dee2e6] bg-white px-2 py-1.5 lg:px-3">
      <button
        type="button"
        onClick={onOpenLauncher}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#714b67] hover:bg-[#f5f0f4]"
        aria-label={locale === 'id' ? 'Aplikasi' : 'Apps'}
      >
        <LayoutGrid size={15} strokeWidth={2} />
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {ERP_APPS.map((app) => {
          const TabIcon = app.icon;
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => onSelectApp(app.id)}
              className={`inline-flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors lg:text-[11px] ${
                activeApp === app.id
                  ? 'bg-[#714b67] text-white'
                  : 'text-[#495057] hover:bg-[#f8f9fa]'
              }`}
            >
              <TabIcon size={12} strokeWidth={2} />
              {app.label}
            </button>
          );
        })}
      </div>

      <div className="hidden items-center gap-1.5 sm:flex">
        <Search size={13} className="text-[#6c757d]" />
        <Bell size={13} className="text-[#6c757d]" />
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#714b67] text-white">
          <User size={11} />
        </div>
      </div>
    </div>
  );
}
