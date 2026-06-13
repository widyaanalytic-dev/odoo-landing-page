export const problem = {
    id: {
      lead: 'Mengelola operasional bisnis dengan sistem yang terpisah-pisah',
      highlight: 'ITU MELELAHKAN.',
      visual: {
        phases: {
          chaos: {
            hint: 'Data beda-beda di setiap sistem — tidak pernah cocok',
            title: 'Tidak sinkron',
          },
          manual: {
            hint: 'Copy-paste, cek ulang, koordinasi manual — setiap hari',
            steps: ['Copy ke Excel', 'Kirim WA ke gudang', 'Rekap ulang ke keuangan'],
          },
          seamless: {
            hint: 'Bayangkan semua terhubung — real-time, tanpa rekap manual',
            label: 'Real-time sync',
          },
        },
        silos: {
          excel: 'Excel',
          warehouse: 'Gudang',
          finance: 'Keuangan',
          payroll: 'Payroll',
        },
        metrics: {
          stockExcel: 'Stok: 142',
          stockWarehouse: 'Stok: 98',
          stockUnified: 'Stok: 142',
          revenueFinance: 'Omzet: Rp 24jt',
          revenuePayroll: 'Gaji: ???',
        },
        phaseLabels: {
          chaos: 'Kacau',
          manual: 'Manual',
          seamless: 'Seamless',
        },
        conflictCallout: '142 ≠ 98',
        alertChips: {
          mismatch: 'Data tidak cocok',
          manualExport: 'Export manual',
        },
      },
    },
    en: {
      lead: 'Running your business on disconnected systems',
      highlight: 'IS EXHAUSTING.',
      visual: {
        phases: {
          chaos: {
            hint: 'Different data in every system — never matches',
            title: 'Out of sync',
          },
          manual: {
            hint: 'Copy-paste, double-check, manual coordination — every day',
            steps: ['Copy to Excel', 'Message warehouse on WhatsApp', 'Reconcile finance again'],
          },
          seamless: {
            hint: 'Imagine everything connected — real-time, no manual reports',
            label: 'Real-time sync',
          },
        },
        silos: {
          excel: 'Excel',
          warehouse: 'Warehouse',
          finance: 'Finance',
          payroll: 'Payroll',
        },
        metrics: {
          stockExcel: 'Stock: 142',
          stockWarehouse: 'Stock: 98',
          stockUnified: 'Stock: 142',
          revenueFinance: 'Revenue: $24k',
          revenuePayroll: 'Payroll: ???',
        },
        phaseLabels: {
          chaos: 'Chaos',
          manual: 'Manual',
          seamless: 'Seamless',
        },
        conflictCallout: '142 ≠ 98',
        alertChips: {
          mismatch: 'Data mismatch',
          manualExport: 'Manual export',
        },
      },
    },
  } as const;
