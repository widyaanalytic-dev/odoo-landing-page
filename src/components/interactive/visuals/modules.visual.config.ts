export type ModuleCategoryId = 'commercial' | 'finance' | 'hr' | 'operations';

export type ModuleId =
  | 'sales'
  | 'crm'
  | 'accounting'
  | 'inventory'
  | 'purchase'
  | 'mrp'
  | 'attendance'
  | 'payroll'
  | 'hr'
  | 'restaurant'
  | 'fleet'
  | 'project';

export const MODULE_CATEGORY_ORDER: ModuleCategoryId[] = [
  'commercial',
  'finance',
  'hr',
  'operations',
];

const ODOO_ICON_BASE = 'https://download.odoocdn.com/icons';

export const MODULE_ODOO_ICONS: Record<ModuleId, string> = {
  sales: `${ODOO_ICON_BASE}/sale_management/static/description/icon.png`,
  crm: `${ODOO_ICON_BASE}/crm/static/description/icon.png`,
  accounting: `${ODOO_ICON_BASE}/accountant/static/description/icon.png`,
  inventory: `${ODOO_ICON_BASE}/stock/static/description/icon.png`,
  purchase: `${ODOO_ICON_BASE}/purchase/static/description/icon.png`,
  mrp: `${ODOO_ICON_BASE}/mrp/static/description/icon.png`,
  attendance: `${ODOO_ICON_BASE}/hr_attendance/static/description/icon.png`,
  payroll: `${ODOO_ICON_BASE}/hr_payroll/static/description/icon.png`,
  hr: `${ODOO_ICON_BASE}/hr/static/description/icon.png`,
  restaurant: `${ODOO_ICON_BASE}/pos_restaurant/static/description/icon.png`,
  fleet: `${ODOO_ICON_BASE}/fleet/static/description/icon.png`,
  project: `${ODOO_ICON_BASE}/project/static/description/icon.png`,
};

export const MODULE_ODOO_ICON_FALLBACK = `${ODOO_ICON_BASE}/base/static/description/icon.png`;

export const MODULE_TRIAL_LABELS: Record<ModuleId, { id: string; en: string }> = {
  sales: { id: 'Sales', en: 'Sales' },
  crm: { id: 'CRM', en: 'CRM' },
  accounting: { id: 'Akuntansi', en: 'Accounting' },
  inventory: { id: 'Inventaris', en: 'Inventory' },
  purchase: { id: 'Purchase', en: 'Purchase' },
  mrp: { id: 'Manufaktur', en: 'Manufacturing' },
  attendance: { id: 'Kehadiran', en: 'Attendance' },
  payroll: { id: 'Daftar Gaji', en: 'Payroll' },
  hr: { id: 'Karyawan', en: 'Employees' },
  restaurant: { id: 'Restoran', en: 'Restaurant' },
  fleet: { id: 'Armada', en: 'Fleet' },
  project: { id: 'Project', en: 'Project' },
};
