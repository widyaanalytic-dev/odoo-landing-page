export const problem = {
    id: {
      lead: 'Mengelola operasional bisnis dengan sistem yang terpisah-pisah',
      highlight: 'MELELAHKAN.',
      visual: {
        phases: {
          chaos: {
            hint: 'Data di tiap sistem beda sendiri. Angkanya jarang pernah sama.',
            title: 'Tidak sinkron',
          },
          manual: {
            hint: 'Copy-paste, cek ulang, koordinasi manual. Setiap hari.',
            steps: ['Copy ke Excel', 'Koordinasi manual ke gudang', 'Rekap ulang ke keuangan'],
          },
          seamless: {
            hint: 'Semua terhubung real-time, tanpa rekap manual.',
            label: 'Sinkron real-time',
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
          seamless: 'Terintegrasi',
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
            hint: 'Every system shows different numbers. They rarely match.',
            title: 'Out of sync',
          },
          manual: {
            hint: 'Copy-paste, double-checks, and manual coordination. Every day.',
            steps: ['Copy to Excel', 'Message warehouse on WhatsApp', 'Reconcile finance again'],
          },
          seamless: {
            hint: 'Everything connected in real time, without manual reports.',
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
