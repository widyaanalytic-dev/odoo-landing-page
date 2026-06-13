import { Package, ShoppingCart, Wallet } from 'lucide-react';

export const ERP_APPS = [
  {
    id: 'sales',
    label: 'Sales',
    icon: ShoppingCart,
    breadcrumb: { id: 'Penjualan', en: 'Sales' },
    model: { id: 'Order Penjualan', en: 'Sales Orders' },
    newLabel: { id: 'Baru', en: 'New' },
    columns: [
      { key: 'name', label: { id: 'Nomor', en: 'Number' } },
      { key: 'partner', label: { id: 'Pelanggan', en: 'Customer' } },
      { key: 'amount', label: { id: 'Total', en: 'Total' } },
      { key: 'state', label: { id: 'Status', en: 'Status' } },
    ],
    rows: [
      {
        name: 'SO/2024/1042',
        partner: 'PT Maju Jaya',
        amount: 'Rp 24.500.000',
        state: { id: 'Konfirmasi', en: 'Sale Order' },
        stateColor: 'bg-[#d4edda] text-[#155724]',
        scenarioRow: true,
      },
      {
        name: 'SO/2024/1043',
        partner: 'CV Sinar Abadi',
        amount: 'Rp 8.200.000',
        state: { id: 'Quotation', en: 'Quotation' },
        stateColor: 'bg-[#cce5ff] text-[#004085]',
        scenarioRow: false,
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    breadcrumb: { id: 'Persediaan', en: 'Inventory' },
    model: { id: 'Produk', en: 'Products' },
    newLabel: { id: 'Baru', en: 'New' },
    columns: [
      { key: 'name', label: { id: 'Referensi', en: 'Reference' } },
      { key: 'partner', label: { id: 'Nama', en: 'Name' } },
      { key: 'amount', label: { id: 'Stok', en: 'On Hand' } },
      { key: 'state', label: { id: 'Lokasi', en: 'Location' } },
    ],
    rows: [
      {
        name: 'SKU/001',
        partner: 'Widget A',
        amount: '142 Unit',
        amountEn: '142 Units',
        state: { id: 'Gudang Utama', en: 'Main Stock' },
        stateColor: 'bg-[#e2e3e5] text-[#383d41]',
        stockBase: 142,
      },
      {
        name: 'SKU/002',
        partner: 'Widget B',
        amount: '38 Unit',
        amountEn: '38 Units',
        state: { id: 'Gudang Utama', en: 'Main Stock' },
        stateColor: 'bg-[#e2e3e5] text-[#383d41]',
        stockBase: 38,
      },
    ],
  },
  {
    id: 'accounting',
    label: 'Accounting',
    icon: Wallet,
    breadcrumb: { id: 'Akuntansi', en: 'Accounting' },
    model: { id: 'Faktur', en: 'Invoices' },
    newLabel: { id: 'Baru', en: 'New' },
    columns: [
      { key: 'name', label: { id: 'Nomor', en: 'Number' } },
      { key: 'partner', label: { id: 'Partner', en: 'Partner' } },
      { key: 'amount', label: { id: 'Jumlah', en: 'Amount' } },
      { key: 'state', label: { id: 'Status', en: 'Status' } },
    ],
    rows: [
      {
        name: 'INV/2024/0882',
        partner: 'PT Maju Jaya',
        amount: 'Rp 45.100.000',
        state: { id: 'Posted', en: 'Posted' },
        stateColor: 'bg-[#d4edda] text-[#155724]',
      },
      {
        name: 'BILL/2024/0441',
        partner: 'Supplier ABC',
        amount: 'Rp 12.300.000',
        state: { id: 'Draft', en: 'Draft' },
        stateColor: 'bg-[#fff3cd] text-[#856404]',
      },
    ],
  },
] as const;

export type ErpAppConfig = (typeof ERP_APPS)[number];
