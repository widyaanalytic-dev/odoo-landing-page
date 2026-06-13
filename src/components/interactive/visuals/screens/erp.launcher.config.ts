import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Factory,
  FileText,
  Handshake,
  Package,
  ShoppingCart,
  Users,
  Wallet,
} from 'lucide-react';
import type { ErpAppId } from './erp.types';

export interface LauncherApp {
  id: ErpAppId | 'crm' | 'purchase' | 'manufacturing';
  label: { id: string; en: string };
  icon: LucideIcon;
  iconBg: string;
  clickable: boolean;
}

export interface LauncherCategory {
  key: string;
  title: { id: string; en: string };
  apps: LauncherApp[];
}

export const launcherCategories: LauncherCategory[] = [
  {
    key: 'sales',
    title: { id: 'Sales', en: 'Sales' },
    apps: [
      {
        id: 'crm',
        label: { id: 'CRM', en: 'CRM' },
        icon: Handshake,
        iconBg: 'bg-[#875A7B]',
        clickable: false,
      },
      {
        id: 'sales',
        label: { id: 'Sales', en: 'Sales' },
        icon: ShoppingCart,
        iconBg: 'bg-[#00A09D]',
        clickable: true,
      },
    ],
  },
  {
    key: 'finance',
    title: { id: 'Keuangan', en: 'Finance' },
    apps: [
      {
        id: 'accounting',
        label: { id: 'Akuntansi', en: 'Accounting' },
        icon: Wallet,
        iconBg: 'bg-[#EB7851]',
        clickable: true,
      },
      {
        id: 'accounting',
        label: { id: 'Faktur', en: 'Invoicing' },
        icon: FileText,
        iconBg: 'bg-[#E46F78]',
        clickable: true,
      },
    ],
  },
  {
    key: 'supply',
    title: { id: 'Supply Chain', en: 'Supply Chain' },
    apps: [
      {
        id: 'inventory',
        label: { id: 'Inventaris', en: 'Inventory' },
        icon: Package,
        iconBg: 'bg-[#F4894B]',
        clickable: true,
      },
      {
        id: 'manufacturing',
        label: { id: 'Manufaktur', en: 'Manufacturing' },
        icon: Factory,
        iconBg: 'bg-[#5C5C5C]',
        clickable: false,
      },
      {
        id: 'purchase',
        label: { id: 'Purchase', en: 'Purchase' },
        icon: ShoppingCart,
        iconBg: 'bg-[#A24689]',
        clickable: false,
      },
    ],
  },
];

export function launcherTileKey(categoryKey: string, labelEn: string) {
  return `${categoryKey}-${labelEn}`;
}

export type OdooScenarioStepId = 'create-order' | 'confirm-order' | 'sync-inventory' | 'invoice-created';

export interface OdooScenarioStep {
  id: OdooScenarioStepId;
  app: ErpAppId;
  caption: { id: string; en: string };
  shortLabel: { id: string; en: string };
  benefits: { id: string[]; en: string[]; icons: LucideIcon[] };
  duration: number;
  highlightRow?: string;
  showForm?: boolean;
  showSyncToast?: boolean;
  stockAnimation?: { sku: string; from: number; to: number; unit: { id: string; en: string } };
}

export const ODOO_SCENARIO_FORM = {
  title: { id: 'Order Penjualan Baru', en: 'New Sales Order' },
  customerLabel: { id: 'Pelanggan', en: 'Customer' },
  productLabel: { id: 'Produk', en: 'Product' },
  qtyLabel: { id: 'Qty', en: 'Qty' },
  customer: 'PT Maju Jaya',
  product: 'Widget A',
  qty: '50',
  confirmLabel: { id: 'Konfirmasi', en: 'Confirm' },
};

export const ODOO_SCENARIO_STEPS: OdooScenarioStep[] = [
  {
    id: 'create-order',
    app: 'sales',
    caption: {
      id: 'Buat order penjualan — ketik pelanggan & produk langsung di Odoo',
      en: 'Create a sales order — type customer & product directly in Odoo',
    },
    shortLabel: { id: 'Sales', en: 'Sales' },
    benefits: {
      id: ['Input order dari satu form terpadu', 'Data pelanggan tersimpan otomatis'],
      en: ['Create orders from one unified form', 'Customer data saved automatically'],
      icons: [ShoppingCart, Users],
    },
    duration: 5200,
    showForm: true,
  },
  {
    id: 'confirm-order',
    app: 'sales',
    caption: {
      id: 'Order masuk — siap diproses gudang & keuangan',
      en: 'Order confirmed — ready for warehouse & finance',
    },
    shortLabel: { id: 'Konfirmasi', en: 'Confirm' },
    benefits: {
      id: ['Order langsung masuk pipeline operasional', 'Siap diproses gudang & keuangan'],
      en: ['Orders enter the ops pipeline instantly', 'Ready for warehouse & finance teams'],
      icons: [CheckCircle2, ClipboardList],
    },
    duration: 2400,
    highlightRow: 'SO/2024/1042',
  },
  {
    id: 'sync-inventory',
    app: 'inventory',
    caption: {
      id: 'Stok real-time berkurang otomatis — Widget A 142 → 92 unit',
      en: 'Real-time stock updates automatically — Widget A 142 → 92 units',
    },
    shortLabel: { id: 'Inventaris', en: 'Inventory' },
    benefits: {
      id: ['Stok berkurang otomatis saat order masuk', 'Visibilitas real-time tanpa Excel terpisah'],
      en: ['Stock drops automatically when orders confirm', 'Real-time visibility without separate spreadsheets'],
      icons: [Package, BarChart3],
    },
    duration: 3200,
    highlightRow: 'SKU/001',
    showSyncToast: true,
    stockAnimation: { sku: 'SKU/001', from: 142, to: 92, unit: { id: 'Unit', en: 'Units' } },
  },
  {
    id: 'invoice-created',
    app: 'accounting',
    caption: {
      id: 'Faktur terbuat otomatis — Sales, gudang, dan keuangan satu sistem',
      en: 'Invoice created automatically — sales, warehouse, and finance in one system',
    },
    shortLabel: { id: 'Akuntansi', en: 'Accounting' },
    benefits: {
      id: ['Faktur terbuat otomatis dari order', 'Sales, gudang & keuangan selalu selaras'],
      en: ['Invoices auto-generated from orders', 'Sales, warehouse & finance always in sync'],
      icons: [FileText, Wallet],
    },
    duration: 3200,
    highlightRow: 'INV/2024/0882',
  },
];

export const ODOO_SCENARIO_LOOP_PAUSE = 3500;

/** @deprecated Use ODOO_SCENARIO_STEPS instead */
export const ERP_DEMO_STEPS: {
  app: ErpAppId;
  tileKey: string;
  row: string;
}[] = [
  { app: 'sales', tileKey: launcherTileKey('sales', 'Sales'), row: 'SO/2024/1042' },
  { app: 'inventory', tileKey: launcherTileKey('supply', 'Inventory'), row: 'SKU/001' },
  { app: 'accounting', tileKey: launcherTileKey('finance', 'Accounting'), row: 'INV/2024/0882' },
];
