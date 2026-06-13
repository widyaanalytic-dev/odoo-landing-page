export const painVisualContent = {
  data: {
    id: {
      hint: 'Tiga spreadsheet terpisah — angka tidak pernah sama',
      tableHeaders: { system: 'Sistem', metric: 'Data', status: 'Status' },
      rows: [
        { system: 'Excel Penjualan', metric: 'Stok: 142', status: 'Tidak sinkron', updated: '09:12' },
        { system: 'Excel Gudang', metric: 'Stok: 98', status: 'Tidak sinkron', updated: '08:45' },
        { system: 'Excel Keuangan', metric: 'Omzet: Rp 24jt', status: 'Tidak sinkron', updated: 'Kemarin' },
      ],
      footer: 'Tidak ada sumber kebenaran — stok real-time mustahil',
    },
    en: {
      hint: 'Three separate spreadsheets — numbers never match',
      tableHeaders: { system: 'System', metric: 'Data', status: 'Status' },
      rows: [
        { system: 'Sales Excel', metric: 'Stock: 142', status: 'Out of sync', updated: '09:12' },
        { system: 'Warehouse Excel', metric: 'Stock: 98', status: 'Out of sync', updated: '08:45' },
        { system: 'Finance Excel', metric: 'Revenue: $24k', status: 'Out of sync', updated: 'Yesterday' },
      ],
      footer: 'No single source of truth — real-time stock is impossible',
    },
  },
  process: {
    id: {
      hint: 'Laporan, payroll, ERP — semua masih manual & tidak pas',
      scenes: [
        { label: 'Laporan bulanan', badge: '3 hari', detail: 'Rekap manual dari banyak file' },
        { label: 'Payroll & absensi', badge: 'Manual', detail: 'Input ulang, rawan salah hitung' },
        { label: 'ERP lama', badge: 'Tidak pas', detail: 'Tidak mengikuti alur kerja tim' },
      ],
    },
    en: {
      hint: 'Reports, payroll, ERP — still manual and misfit',
      scenes: [
        { label: 'Monthly reports', badge: '3 days', detail: 'Manual consolidation from many files' },
        { label: 'Payroll & attendance', badge: 'Manual', detail: 'Re-entry, prone to calculation errors' },
        { label: 'Legacy ERP', badge: 'Misfit', detail: "Doesn't follow your team's workflow" },
      ],
    },
  },
} as const;
