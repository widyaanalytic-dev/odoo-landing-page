import { useState } from 'react';
import { ChevronDown, Filter, List, Plus, Search } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { assertFound } from '../../../../lib/assert';
import { useLang } from '../../LangProvider';
import type { OdooScenarioState } from '../../../../hooks/useOdooScenarioDemo';
import { OdooAppLauncher } from './OdooAppLauncher';
import { SalesOrderFormDemo } from './SalesOrderFormDemo';
import { SyncToast } from './SyncToast';
import type { ErpAppId } from './erp.types';
import { ERP_APPS } from './erp.apps.config';
import { ErpAppListPanel } from './panels/ErpAppListPanel';
import { detailShell, detailTabSwitch } from './erp.motion';

interface ErpDashboardProps {
  activeApp?: ErpAppId;
  onAppChange?: (app: ErpAppId) => void;
  autoPlay?: boolean;
  demoActive?: boolean;
  onUserInteract?: () => void;
  scenario?: OdooScenarioState | null;
}

export function ErpDashboard({
  activeApp: controlledApp,
  onAppChange,
  autoPlay = false,
  demoActive = true,
  onUserInteract,
  scenario,
}: ErpDashboardProps) {
  const [internalApp, setInternalApp] = useState<ErpAppId>('sales');
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [showApps, setShowApps] = useState(false);
  const [launcherKey, setLauncherKey] = useState(0);
  const { locale } = useLang();
  const reducedMotion = useReducedMotion();

  const activeApp = scenario?.app ?? controlledApp ?? internalApp;
  const highlightedRow = scenario?.highlightedRow ?? selectedRow;
  const orderConfirmed = scenario?.orderConfirmed ?? false;
  const showForm = scenario?.showForm ?? false;
  const formConfirming = scenario?.formConfirming ?? false;
  const showSyncToast = scenario?.showSyncToast ?? false;
  const stockValue = scenario?.stockValue;

  const pauseDemo = () => onUserInteract?.();

  const setActiveApp = (next: ErpAppId) => {
    if (next === activeApp) return;
    setSelectedRow(null);
    if (controlledApp === undefined && !scenario) setInternalApp(next);
    onAppChange?.(next);
  };

  const openLauncher = () => {
    pauseDemo();
    setLauncherKey((key) => key + 1);
    setShowApps(true);
  };

  const selectFromLauncher = (id: ErpAppId) => {
    setSelectedRow(null);
    setActiveApp(id);
    setShowApps(false);
  };

  const app = assertFound(
    ERP_APPS.find((entry) => entry.id === activeApp),
    `ERP app missing for id "${activeApp}"`,
  );
  const ActiveIcon = app.icon;

  const visibleRows =
    activeApp === 'sales'
      ? app.rows.filter((row) => !('scenarioRow' in row && row.scenarioRow) || orderConfirmed)
      : app.rows;

  const formatStock = (base: number, rowName: string) => {
    const value = stockValue !== null && rowName === 'SKU/001' ? stockValue : base;
    const unit = locale === 'id' ? 'Unit' : 'Units';
    return `${value} ${unit}`;
  };

  return (
    <div
      className="relative flex h-full min-h-[220px] flex-col text-[11px] text-[#212529]"
      onPointerDown={pauseDemo}
    >
      <AnimatePresence>
        {showApps && (
          <OdooAppLauncher
            key={`launcher-${launcherKey}`}
            activeApp={activeApp}
            onSelect={selectFromLauncher}
            onClose={() => setShowApps(false)}
            onManualInteract={pauseDemo}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && <SalesOrderFormDemo visible={showForm} confirming={formConfirming} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSyncToast && <SyncToast visible={showSyncToast} />}
      </AnimatePresence>

      <motion.div
        className="flex min-h-0 flex-1 flex-col"
        variants={detailShell}
        initial={false}
        animate={showApps ? 'behindLauncher' : 'idle'}
      >
        <ErpAppListPanel
          activeApp={activeApp}
          locale={locale}
          onOpenLauncher={openLauncher}
          onSelectApp={(id) => {
            pauseDemo();
            setActiveApp(id);
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp}
            className="flex min-h-0 flex-1 flex-col"
            variants={detailTabSwitch}
            initial={reducedMotion ? false : 'hidden'}
            animate="show"
            exit={reducedMotion ? undefined : 'exit'}
          >
            <div className="border-b border-[#dee2e6] bg-white px-3 py-1.5">
              <div className="flex items-center gap-1.5 text-[10px] text-[#6c757d] lg:text-[11px]">
                <ActiveIcon size={12} className="text-[#714b67]" strokeWidth={2} />
                <span className="font-medium text-[#714b67]">{app.breadcrumb[locale]}</span>
                <span>/</span>
                <span className="font-semibold text-[#212529]">{app.model[locale]}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 border-b border-[#dee2e6] bg-white px-3 py-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded bg-[#714b67] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-[#5c3d55] lg:text-[11px]"
              >
                <Plus size={12} strokeWidth={2.5} />
                {app.newLabel[locale]}
              </button>
              <div className="flex items-center gap-1.5">
                <div className="hidden items-center gap-1 rounded border border-[#ced4da] bg-white px-2 py-0.5 sm:flex">
                  <Search size={11} className="text-[#adb5bd]" />
                  <span className="text-[10px] text-[#adb5bd]">Search...</span>
                </div>
                <button type="button" className="rounded p-1 text-[#6c757d] hover:bg-[#f8f9fa]">
                  <Filter size={13} />
                </button>
                <button type="button" className="rounded bg-[#e9ecef] p-1 text-[#714b67]">
                  <List size={13} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-white">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#dee2e6] bg-[#f8f9fa]">
                    <th className="w-6 px-2 py-1.5">
                      <span className="inline-block h-3 w-3 rounded border border-[#ced4da] bg-white" />
                    </th>
                    {app.columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-2 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-[#6c757d] lg:text-[10px]"
                      >
                        <span className="inline-flex items-center gap-0.5">
                          {col.label[locale]}
                          <ChevronDown size={9} className="opacity-50" />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, i) => {
                    const isHighlighted = highlightedRow === row.name;
                    const isNewOrder =
                      orderConfirmed && row.name === 'SO/2024/1042' && scenario?.stepId === 'create-order';

                    return (
                      <motion.tr
                        key={row.name}
                        initial={isNewOrder && !reducedMotion ? { opacity: 0, y: -8 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => {
                          pauseDemo();
                          setSelectedRow(selectedRow === row.name ? null : row.name);
                        }}
                        className={`cursor-pointer border-b border-[#f1f3f5] transition-colors ${
                          isHighlighted
                            ? 'bg-[#f5f0f4] ring-1 ring-inset ring-[#714b67]/40'
                            : i % 2 === 1
                              ? 'bg-[#fafafa] hover:bg-[#f5f0f4]'
                              : 'hover:bg-[#f5f0f4]'
                        } ${isHighlighted && autoPlay && demoActive ? 'animate-pulse' : ''}`}
                      >
                        <td className="px-2 py-2">
                          <span
                            className={`inline-block h-3 w-3 rounded border ${
                              isHighlighted || selectedRow === row.name
                                ? 'border-[#714b67] bg-[#714b67]'
                                : 'border-[#ced4da] bg-white'
                            }`}
                          />
                        </td>
                        <td className="px-2 py-2 font-medium text-[#714b67]">{row.name}</td>
                        <td className="max-w-[80px] truncate px-2 py-2 text-[#495057] lg:max-w-none">
                          {row.partner}
                        </td>
                        <td className="px-2 py-2 font-medium text-[#212529]">
                          {'stockBase' in row ? (
                            <motion.span
                              key={formatStock(row.stockBase, row.name)}
                              initial={stockValue !== null && row.name === 'SKU/001' ? { opacity: 0.6, y: -2 } : false}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35 }}
                              className={stockValue !== null && row.name === 'SKU/001' ? 'text-[#714b67]' : ''}
                            >
                              {formatStock(row.stockBase, row.name)}
                            </motion.span>
                          ) : (
                            row.amount
                          )}
                        </td>
                        <td className="px-2 py-2">
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-medium lg:text-[10px] ${row.stateColor}`}
                          >
                            {row.state[locale]}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-end gap-1.5 border-t border-[#dee2e6] bg-[#f8f9fa] px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#28a745]" />
          <span className="text-[9px] text-[#6c757d]">
            {locale === 'id' ? 'Data tersinkron real-time' : 'Real-time synced data'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
