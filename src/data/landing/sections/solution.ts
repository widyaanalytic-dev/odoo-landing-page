export const solution = {
    id: {
      eyebrow: 'Solusinya',
      highlight: {
        lead: 'Satu Platform.',
        accent: 'Semua Terhubung.',
      },
      description: {
        before: 'Odoo menyatukan penjualan, gudang, keuangan, produksi, hingga SDM dalam ',
        emphasis: 'satu sistem terintegrasi',
        after: '. Tidak ada lagi input ganda, data tercecer, atau laporan yang tidak sinkron.',
      },
      bullets: [
        {
          iconId: 'layers' as const,
          title: 'Modular',
          text: 'mulai dari modul yang paling dibutuhkan, tambah seiring bisnis tumbuh',
        },
        {
          iconId: 'settings' as const,
          title: 'Fleksibel',
          text: 'tersedia versi Community (open source) dan Enterprise',
        },
        {
          iconId: 'badge' as const,
          title: 'Terbukti',
          text: 'digunakan jutaan pengguna di seluruh dunia',
        },
      ],
      visual: {
        hub: 'Odoo',
        hint: 'Ketuk modul untuk lihat alur sinkronisasi data',
        caption: 'Satu platform — semua modul terhubung dalam satu alur data',
        status: {
          idle: 'Pilih modul untuk mulai',
          syncing: 'Menyinkronkan…',
          synced: 'Tersinkron',
        },
        modules: [
          {
            id: 'sales' as const,
            label: 'Sales',
            iconId: 'sales' as const,
            syncEvent: 'Order #1042 → stok & invoice terupdate',
          },
          {
            id: 'inventory' as const,
            label: 'Inventory',
            iconId: 'inventory' as const,
            syncEvent: 'Stok 48 unit → tersinkron ke sales & MRP',
          },
          {
            id: 'finance' as const,
            label: 'Finance',
            iconId: 'finance' as const,
            syncEvent: 'Jurnal otomatis dari penjualan & payroll',
          },
          {
            id: 'mrp' as const,
            label: 'MRP',
            iconId: 'mrp' as const,
            syncEvent: 'MO-77 selesai → biaya produksi masuk keuangan',
          },
          {
            id: 'hr' as const,
            label: 'HR',
            iconId: 'hr' as const,
            syncEvent: 'Payroll Agustus → jurnal HR terposting',
          },
          {
            id: 'crm' as const,
            label: 'CRM',
            iconId: 'crm' as const,
            syncEvent: 'Deal menang → opportunity jadi sales order',
          },
        ],
      },
    },
    en: {
      eyebrow: 'The Solution',
      highlight: {
        lead: 'One Platform.',
        accent: 'Everything Connected.',
      },
      description: {
        before: 'Odoo unifies sales, inventory, finance, manufacturing, and HR into ',
        emphasis: 'one integrated system',
        after: '. No more double entry, scattered data, or out-of-sync reports.',
      },
      bullets: [
        {
          iconId: 'layers' as const,
          title: 'Modular',
          text: 'start with what you need most, expand as you grow',
        },
        {
          iconId: 'settings' as const,
          title: 'Flexible',
          text: 'available in Community (open source) and Enterprise editions',
        },
        {
          iconId: 'badge' as const,
          title: 'Proven',
          text: 'used by millions of users worldwide',
        },
      ],
      visual: {
        hub: 'Odoo',
        hint: 'Tap a module to see the data sync flow',
        caption: 'One platform — every module connected in a single data flow',
        status: {
          idle: 'Select a module to start',
          syncing: 'Syncing…',
          synced: 'Synced',
        },
        modules: [
          {
            id: 'sales' as const,
            label: 'Sales',
            iconId: 'sales' as const,
            syncEvent: 'Order #1042 → stock & invoice updated',
          },
          {
            id: 'inventory' as const,
            label: 'Inventory',
            iconId: 'inventory' as const,
            syncEvent: '48 units in stock → synced to sales & MRP',
          },
          {
            id: 'finance' as const,
            label: 'Finance',
            iconId: 'finance' as const,
            syncEvent: 'Auto journal entries from sales & payroll',
          },
          {
            id: 'mrp' as const,
            label: 'MRP',
            iconId: 'mrp' as const,
            syncEvent: 'MO-77 complete → production cost posted to finance',
          },
          {
            id: 'hr' as const,
            label: 'HR',
            iconId: 'hr' as const,
            syncEvent: 'August payroll → HR journal posted',
          },
          {
            id: 'crm' as const,
            label: 'CRM',
            iconId: 'crm' as const,
            syncEvent: 'Deal won → opportunity becomes sales order',
          },
        ],
      },
    },
  } as const;
