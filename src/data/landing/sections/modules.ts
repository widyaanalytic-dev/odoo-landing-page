import { modulesCatalogEn, modulesCatalogId } from '../modules-catalog';

export const modules = {
    id: {
      eyebrow: 'Kapabilitas',
      highlight: {
        lead: 'Dari penjualan hingga payroll.',
        accent: 'Modul yang Kami Kuasai',
      },
      intro:
        'Kami implementasikan modul Odoo sesuai kebutuhan operasional — mulai dari yang paling kritis, berkembang seiring bisnis Anda.',
      footnote: '…dan modul lainnya sesuai kebutuhan bisnis Anda.',
      countBadge: '12+ modul',
      categories: {
        commercial: 'Penjualan & CRM',
        finance: 'Keuangan & Stok',
        hr: 'SDM',
        operations: 'Operasi',
      },
      visual: {
        hint: 'Pilih modul untuk melihat detail',
        flowLabel: 'Alur integrasi modul',
      },
      scenes: {
        commercial: {
          caption: 'Alur penjualan terintegrasi dari prospek hingga order',
          steps: [
            { label: 'Prospek', detail: 'Lead masuk ke pipeline CRM' },
            { label: 'Deal', detail: 'Quotation disetujui pelanggan' },
            { label: 'Order', detail: 'SO terhubung stok & invoice' },
          ],
        },
        finance: {
          caption: 'Transaksi operasional langsung tercermin di keuangan',
          steps: [
            { label: 'Transaksi', detail: 'Penjualan / pembelian tercatat' },
            { label: 'Stok', detail: 'Qty & valuasi update otomatis' },
            { label: 'Jurnal', detail: 'Entry keuangan tanpa input ulang' },
          ],
        },
        hr: {
          caption: 'Data kehadiran mengalir langsung ke perhitungan gaji',
          steps: [
            { label: 'Absensi', detail: 'Check-in, shift & overtime tercatat' },
            { label: 'Payroll', detail: 'Slip gaji dihitung otomatis' },
          ],
        },
        operations: {
          caption: 'Perencanaan operasional hingga output ke stok atau billing',
          steps: [
            { label: 'Rencana', detail: 'MO, task, atau jadwal dibuat' },
            { label: 'Eksekusi', detail: 'Produksi / proyek berjalan' },
            { label: 'Selesai', detail: 'Output ke stok atau invoice klien' },
          ],
        },
      },
      items: modulesCatalogId,
    },
    en: {
      eyebrow: 'Capabilities',
      highlight: {
        lead: 'From sales to payroll.',
        accent: 'Modules We Master',
      },
      intro:
        'We implement the Odoo modules you need most — starting with what matters, expanding as you grow.',
      footnote: '…and other modules tailored to your business needs.',
      countBadge: '12+ modules',
      categories: {
        commercial: 'Sales & CRM',
        finance: 'Finance & Stock',
        hr: 'HR',
        operations: 'Operations',
      },
      visual: {
        hint: 'Select a module for details',
        flowLabel: 'Module integration flow',
      },
      scenes: {
        commercial: {
          caption: 'Integrated sales flow from prospect to order',
          steps: [
            { label: 'Lead', detail: 'Enters the CRM pipeline' },
            { label: 'Deal', detail: 'Quotation approved by customer' },
            { label: 'Order', detail: 'SO linked to stock & invoice' },
          ],
        },
        finance: {
          caption: 'Operational transactions reflected in finance instantly',
          steps: [
            { label: 'Transaction', detail: 'Sales / purchase recorded' },
            { label: 'Stock', detail: 'Qty & valuation updated' },
            { label: 'Journal', detail: 'Finance entries without re-entry' },
          ],
        },
        hr: {
          caption: 'Attendance data flows directly into payroll',
          steps: [
            { label: 'Attendance', detail: 'Check-in, shifts & overtime logged' },
            { label: 'Payroll', detail: 'Payslip calculated automatically' },
          ],
        },
        operations: {
          caption: 'Operational planning through to stock or billing output',
          steps: [
            { label: 'Plan', detail: 'MO, task, or schedule created' },
            { label: 'Execute', detail: 'Production / project in progress' },
            { label: 'Done', detail: 'Output to stock or client invoice' },
          ],
        },
      },
      items: modulesCatalogEn,
    },
  } as const;
