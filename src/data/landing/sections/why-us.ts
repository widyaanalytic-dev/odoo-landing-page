export const whyUs = {
    id: {
      eyebrow: 'Kenapa Kami',
      highlight: {
        lead: 'Odoo memang kuat.',
        accent: 'Implementasinya yang menentukan.',
      },
      intro: 'ERP bagus pun tidak membantu jika implementasinya salah. Itu yang kami bantu.',
      bullets: [
        {
          iconId: 'industry' as const,
          title: 'Pengalaman lintas industri',
          text: 'Agritech, manufaktur, healthcare, konstruksi, hospitality, alat berat, hingga jasa',
        },
        {
          iconId: 'editions' as const,
          title: 'Menguasai Community & Enterprise',
          text: 'Kami rekomendasikan edisi yang sesuai kebutuhan dan anggaran, bukan yang paling mahal',
        },
        {
          iconId: 'versions' as const,
          title: 'Odoo v15 hingga v18',
          text: 'Selalu mengikuti versi terbaru',
        },
        {
          iconId: 'workflow' as const,
          title: 'Kustomisasi sesuai alur kerja',
          text: 'Sistem menyesuaikan bisnis Anda, bukan sebaliknya',
        },
      ],
      visual: {
        hint: 'Pilih keahlian untuk melihat detail',
        bridgeLabel: 'Partner implementasi Odoo',
        scenes: {
          industry: {
            caption: 'Portofolio implementasi lintas sektor',
            tags: ['agritech', 'manufaktur', 'healthcare', 'konstruksi', 'hospitality', 'alat berat', 'jasa'],
          },
          editions: {
            caption: 'Edisi yang tepat, bukan yang termahal',
            community: { label: 'Community', note: 'UKM & startup' },
            enterprise: { label: 'Enterprise', note: 'Korporasi & skala besar' },
            verdict: 'Rekomendasi objektif sesuai kebutuhan',
          },
          versions: {
            caption: 'Migrasi dan upgrade antar versi tanpa ketinggalan',
            versions: ['v15', 'v16', 'v17', 'v18'],
            latestLabel: 'Terbaru',
          },
          workflow: {
            caption: 'Sistem mengikuti alur kerja bisnis Anda',
            steps: ['Alur kerja Anda', 'Kustomisasi', 'Odoo siap pakai'],
          },
        },
      },
    },
    en: {
      eyebrow: 'Why Us',
      highlight: {
        lead: 'Odoo is powerful.',
        accent: 'Implementation is what matters.',
      },
      intro: 'Even a good ERP fails if the implementation is wrong. That is where we help.',
      bullets: [
        {
          iconId: 'industry' as const,
          title: 'Cross-industry experience',
          text: 'Agritech, manufacturing, healthcare, construction, hospitality, heavy equipment, and services',
        },
        {
          iconId: 'editions' as const,
          title: 'Community & Enterprise expertise',
          text: 'We recommend what fits your needs and budget, not the most expensive option',
        },
        {
          iconId: 'versions' as const,
          title: 'Odoo v15 to v18',
          text: 'Always up to date with the latest versions',
        },
        {
          iconId: 'workflow' as const,
          title: 'Workflow-first customization',
          text: 'The system adapts to your business, not the other way around',
        },
      ],
      visual: {
        hint: 'Select an expertise area for details',
        bridgeLabel: 'Odoo implementation partner',
        scenes: {
          industry: {
            caption: 'Implementation portfolio across sectors',
            tags: [
              'agritech',
              'manufacturing',
              'healthcare',
              'construction',
              'hospitality',
              'heavy equipment',
              'services',
            ],
          },
          editions: {
            caption: 'The right edition, not the most expensive',
            community: { label: 'Community', note: 'SMBs & startups' },
            enterprise: { label: 'Enterprise', note: 'Corporates & scale' },
            verdict: 'Objective recommendation for your needs',
          },
          versions: {
            caption: 'Safe migration and upgrades across versions',
            versions: ['v15', 'v16', 'v17', 'v18'],
            latestLabel: 'Latest',
          },
          workflow: {
            caption: 'The system follows your business workflow',
            steps: ['Your workflow', 'Customization', 'Odoo ready to run'],
          },
        },
      },
    },
  } as const;
