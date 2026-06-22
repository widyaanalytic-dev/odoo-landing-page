export const solution = {
    id: {
      eyebrow: 'Solusi',
      highlight: {
        lead: 'Satu platform',
        accent: 'semua modul terhubung',
      },
      description: {
        before: 'Odoo menyatukan penjualan, gudang, keuangan, produksi, dan SDM dalam ',
        emphasis: 'satu sistem',
        after: '. Tidak perlu input ganda, data tersebar, atau laporan yang tidak sinkron.',
      },
      bullets: [
        {
          iconId: 'layers' as const,
          title: 'Modular',
          text: 'Mulai dari modul yang paling dibutuhkan, tambahkan seiring bisnis berkembang',
        },
        {
          iconId: 'settings' as const,
          title: 'Fleksibel',
          text: 'Tersedia versi Community (open source) dan Enterprise',
        },
        {
          iconId: 'badge' as const,
          title: 'Terbukti',
          text: 'Digunakan jutaan pengguna di seluruh dunia',
        },
      ],
      visual: {
        hub: 'Odoo',
        hint: 'Pilih modul untuk melihat alur sinkronisasi data',
        status: {
          idle: 'Pilih modul untuk mulai',
          syncing: 'Sedang sinkron',
          synced: 'Tersinkron',
        },
        modules: [
          {
            id: 'sales' as const,
            label: 'Sales',
            iconId: 'sales' as const,
            syncEvent: 'Order #1042 terupdate, stok dan invoice ikut berubah',
          },
          {
            id: 'inventory' as const,
            label: 'Inventory',
            iconId: 'inventory' as const,
            syncEvent: 'Stok 48 unit tersinkron ke sales dan MRP',
          },
          {
            id: 'finance' as const,
            label: 'Finance',
            iconId: 'finance' as const,
            syncEvent: 'Jurnal otomatis dari penjualan dan payroll',
          },
          {
            id: 'mrp' as const,
            label: 'MRP',
            iconId: 'mrp' as const,
            syncEvent: 'Order produksi 77 selesai, biaya produksi masuk keuangan',
          },
          {
            id: 'hr' as const,
            label: 'HR',
            iconId: 'hr' as const,
            syncEvent: 'Payroll Agustus terposting ke jurnal HR',
          },
          {
            id: 'crm' as const,
            label: 'CRM',
            iconId: 'crm' as const,
            syncEvent: 'Deal menang jadi sales order',
          },
        ],
      },
    },
    en: {
      eyebrow: 'Solution',
      highlight: {
        lead: 'One platform',
        accent: 'all modules connected',
      },
      description: {
        before: 'Odoo brings sales, inventory, finance, manufacturing, and HR into ',
        emphasis: 'one system',
        after: '. No more double entry, scattered data, or reports that fall out of sync.',
      },
      bullets: [
        {
          iconId: 'layers' as const,
          title: 'Modular',
          text: 'Start with what you need most, then expand as you grow',
        },
        {
          iconId: 'settings' as const,
          title: 'Flexible',
          text: 'Available in Community (open source) and Enterprise editions',
        },
        {
          iconId: 'badge' as const,
          title: 'Proven',
          text: 'Used by millions of users worldwide',
        },
      ],
      visual: {
        hub: 'Odoo',
        hint: 'Select a module to see the data sync flow',
        status: {
          idle: 'Select a module to start',
          syncing: 'Syncing',
          synced: 'Synced',
        },
        modules: [
          {
            id: 'sales' as const,
            label: 'Sales',
            iconId: 'sales' as const,
            syncEvent: 'Order #1042 updated, stock and invoice follow automatically',
          },
          {
            id: 'inventory' as const,
            label: 'Inventory',
            iconId: 'inventory' as const,
            syncEvent: '48 units in stock synced to sales and MRP',
          },
          {
            id: 'finance' as const,
            label: 'Finance',
            iconId: 'finance' as const,
            syncEvent: 'Auto journal entries from sales and payroll',
          },
          {
            id: 'mrp' as const,
            label: 'MRP',
            iconId: 'mrp' as const,
            syncEvent: 'Production order 77 complete, cost posted to finance',
          },
          {
            id: 'hr' as const,
            label: 'HR',
            iconId: 'hr' as const,
            syncEvent: 'August payroll posted to the HR journal',
          },
          {
            id: 'crm' as const,
            label: 'CRM',
            iconId: 'crm' as const,
            syncEvent: 'Won deal becomes a sales order',
          },
        ],
      },
    },
  } as const;
