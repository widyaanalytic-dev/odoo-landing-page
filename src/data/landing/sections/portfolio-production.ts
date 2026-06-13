export const portfolioProduction = {
    id: {
      eyebrow: 'Portofolio',
      highlight: {
        lead: 'Implementasi nyata.',
        accent: 'Industri Produksi',
      },
      intro: 'Manufaktur, agritech, alat berat, konstruksi — modul Odoo yang tepat.',
      visual: {
        hint: 'Pilih sektor untuk detail klien',
        sectorBadge: 'Industri produksi',
        clientsLabel: 'Klien',
        modulesLabel: 'Modul utama',
      },
      items: [
        {
          id: 'manufacturing' as const,
          iconId: 'factory' as const,
          industry: 'Manufaktur',
          clients: 'Frogs, MSMB, INAGI',
          description:
            'Implementasi modul Manufacturing, Inventory, dan Purchase untuk operasional produksi terintegrasi.',
          modules: ['Manufacturing (MRP)', 'Inventory', 'Purchase'],
        },
        {
          id: 'agritech' as const,
          iconId: 'sprout' as const,
          industry: 'Agritech',
          clients: 'MSMB',
          description: 'Digitalisasi proses bisnis perusahaan teknologi pertanian.',
          modules: ['Inventory', 'Sales', 'Accounting'],
        },
        {
          id: 'heavy-equipment' as const,
          iconId: 'truck' as const,
          industry: 'Alat Berat',
          clients: 'Maximus, UMG Indonesia',
          description: 'Pengelolaan armada dan aset dengan Fleet Management System.',
          modules: ['Fleet Management', 'Maintenance', 'Inventory'],
        },
        {
          id: 'construction' as const,
          iconId: 'building' as const,
          industry: 'Konstruksi',
          clients: 'Autoconz',
          description: 'Integrasi proses penjualan dan operasional perusahaan konstruksi.',
          modules: ['Sales', 'Project', 'Purchase'],
        },
      ],
    },
    en: {
      eyebrow: 'Portfolio',
      highlight: {
        lead: 'Proven deployments.',
        accent: 'Production Industries',
      },
      intro: 'Manufacturing, agritech, heavy equipment, construction — the right Odoo modules.',
      visual: {
        hint: 'Select a sector for client details',
        sectorBadge: 'Production industries',
        clientsLabel: 'Clients',
        modulesLabel: 'Key modules',
      },
      items: [
        {
          id: 'manufacturing' as const,
          iconId: 'factory' as const,
          industry: 'Manufacturing',
          clients: 'Frogs, MSMB, INAGI',
          description:
            'Manufacturing, Inventory, and Purchase modules for integrated production operations.',
          modules: ['Manufacturing (MRP)', 'Inventory', 'Purchase'],
        },
        {
          id: 'agritech' as const,
          iconId: 'sprout' as const,
          industry: 'Agritech',
          clients: 'MSMB',
          description: 'Digitalizing business processes for an agriculture technology company.',
          modules: ['Inventory', 'Sales', 'Accounting'],
        },
        {
          id: 'heavy-equipment' as const,
          iconId: 'truck' as const,
          industry: 'Heavy Equipment',
          clients: 'Maximus, UMG Indonesia',
          description: 'Fleet and asset management with Fleet Management System.',
          modules: ['Fleet Management', 'Maintenance', 'Inventory'],
        },
        {
          id: 'construction' as const,
          iconId: 'building' as const,
          industry: 'Construction',
          clients: 'Autoconz',
          description: 'Integrating sales and operational processes for a construction company.',
          modules: ['Sales', 'Project', 'Purchase'],
        },
      ],
    },
  } as const;
