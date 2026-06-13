export const portfolioServices = {
    id: {
      eyebrow: 'Portofolio',
      highlight: {
        lead: 'Berlanjut ke',
        accent: 'Industri Layanan',
      },
      intro: 'Healthcare, hospitality, jasa — Odoo selaras alur operasional.',
      visual: {
        hint: 'Pilih sektor untuk detail klien',
        sectorBadge: 'Industri layanan',
        clientsLabel: 'Klien',
        modulesLabel: 'Modul utama',
      },
      items: [
        {
          id: 'healthcare' as const,
          iconId: 'dna' as const,
          industry: 'Healthcare',
          clients: 'Genomic',
          description: 'Sistem terintegrasi untuk perusahaan layanan kesehatan.',
          modules: ['CRM', 'Sales', 'Inventory'],
        },
        {
          id: 'hospitality' as const,
          iconId: 'hotel' as const,
          industry: 'Hotel & Restoran',
          clients: 'Svarnabumi',
          description: 'Restaurant Management System untuk operasional hospitality.',
          modules: ['Restaurant (POS)', 'Inventory', 'Accounting'],
        },
        {
          id: 'services' as const,
          iconId: 'briefcase' as const,
          industry: 'Jasa & Layanan',
          clients: 'AICI, Skilloka, Edspert',
          description: 'CRM, Sales, dan Accounting untuk perusahaan jasa dan edukasi.',
          modules: ['CRM', 'Sales', 'Accounting'],
        },
      ],
    },
    en: {
      eyebrow: 'Portfolio',
      highlight: {
        lead: 'Continuing to',
        accent: 'Service Industries',
      },
      intro: 'Healthcare, hospitality, services — Odoo aligned to your workflow.',
      visual: {
        hint: 'Select a sector for client details',
        sectorBadge: 'Service industries',
        clientsLabel: 'Clients',
        modulesLabel: 'Key modules',
      },
      items: [
        {
          id: 'healthcare' as const,
          iconId: 'dna' as const,
          industry: 'Healthcare',
          clients: 'Genomic',
          description: 'Integrated systems for a healthcare services company.',
          modules: ['CRM', 'Sales', 'Inventory'],
        },
        {
          id: 'hospitality' as const,
          iconId: 'hotel' as const,
          industry: 'Hotel & Restaurant',
          clients: 'Svarnabumi',
          description: 'Restaurant Management System for hospitality operations.',
          modules: ['Restaurant (POS)', 'Inventory', 'Accounting'],
        },
        {
          id: 'services' as const,
          iconId: 'briefcase' as const,
          industry: 'Services',
          clients: 'AICI, Skilloka, Edspert',
          description: 'CRM, Sales, and Accounting for service and education companies.',
          modules: ['CRM', 'Sales', 'Accounting'],
        },
      ],
    },
  } as const;
