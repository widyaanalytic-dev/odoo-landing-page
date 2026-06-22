export const process = {
    id: {
      eyebrow: 'Proses Kerja',
      highlight: {
        lead: 'Lima langkah terstruktur',
        accent: 'dari konsultasi hingga go-live',
      },
      intro:
        'Proses implementasi kami transparan. Anda selalu tahu pekerjaan yang sedang berjalan dan langkah berikutnya.',
      steps: [
        {
          id: 'discovery' as const,
          title: 'Discovery',
          text: 'Kami mempelajari proses bisnis, kendala operasional, dan tujuan yang ingin dicapai bersama tim Anda.',
          deliverables: ['Workshop & assessment', 'Dokumen kebutuhan bisnis'],
        },
        {
          id: 'design' as const,
          title: 'Desain Solusi',
          text: 'Pemilihan modul, versi (Community/Enterprise), arsitektur, dan rencana kustomisasi.',
          deliverables: ['Solution blueprint', 'Timeline & scope proyek'],
        },
        {
          id: 'implementation' as const,
          title: 'Implementasi & Kustomisasi',
          text: 'Konfigurasi sistem, development fitur khusus, integrasi, dan migrasi data.',
          deliverables: ['Staging environment', 'Data migration plan'],
        },
        {
          id: 'training' as const,
          title: 'Training & Go-Live',
          text: 'Pelatihan hands-on untuk tim Anda hingga siap operasional mandiri.',
          deliverables: ['User training', 'Go-live checklist'],
        },
        {
          id: 'support' as const,
          title: 'Support & Maintenance',
          text: 'Pendampingan berkelanjutan, troubleshooting, dan penyesuaian pasca go-live.',
          deliverables: ['SLA support', 'Update & enhancement'],
        },
      ],
      visual: {
        hint: 'Pilih langkah untuk melihat detail',
        stepLabel: 'Langkah',
        deliverablesLabel: 'Deliverable utama',
        progressLabel: 'Alur implementasi',
      },
      stepScenes: {
        discovery: {
          caption: 'Memahami bisnis dulu sebelum menulis kode',
          items: ['Workshop', 'Assessment', 'Roadmap'],
        },
        design: {
          caption: 'Solusi yang tepat, bukan yang paling mahal',
          items: ['Modul', 'Edisi', 'Scope'],
        },
        implementation: {
          caption: 'Konfigurasi, pengembangan, dan migrasi data terkontrol',
          items: ['Config', 'Develop', 'Migrate'],
        },
        training: {
          caption: 'Tim Anda siap operasional sebelum go-live',
          items: ['Training', 'UAT', 'Go-live'],
        },
        support: {
          caption: 'Tetap dampingi setelah sistem berjalan',
          items: ['Monitor', 'Support', 'Improve'],
        },
      },
    },
    en: {
      eyebrow: 'How We Work',
      highlight: {
        lead: 'Five structured steps',
        accent: 'from consultation to go-live',
      },
      intro:
        'Our implementation process is transparent. You always know what is in progress and what comes next.',
      steps: [
        {
          id: 'discovery' as const,
          title: 'Discovery',
          text: 'We learn your business processes, operational challenges, and goals together with your team.',
          deliverables: ['Workshop & assessment', 'Business requirements doc'],
        },
        {
          id: 'design' as const,
          title: 'Solution Design',
          text: 'Module selection, edition (Community/Enterprise), architecture, and customization plan.',
          deliverables: ['Solution blueprint', 'Project timeline & scope'],
        },
        {
          id: 'implementation' as const,
          title: 'Implementation & Customization',
          text: 'System configuration, custom development, integrations, and data migration.',
          deliverables: ['Staging environment', 'Data migration plan'],
        },
        {
          id: 'training' as const,
          title: 'Training & Go-Live',
          text: 'Hands-on training until your team is ready to operate independently.',
          deliverables: ['User training', 'Go-live checklist'],
        },
        {
          id: 'support' as const,
          title: 'Support & Maintenance',
          text: 'Ongoing assistance, troubleshooting, and post go-live adjustments.',
          deliverables: ['Support SLA', 'Updates & enhancements'],
        },
      ],
      visual: {
        hint: 'Select a step for details',
        stepLabel: 'Step',
        deliverablesLabel: 'Key deliverables',
        progressLabel: 'Implementation flow',
      },
      stepScenes: {
        discovery: {
          caption: 'Understand the business before writing code',
          items: ['Workshop', 'Assessment', 'Roadmap'],
        },
        design: {
          caption: 'The right solution, not the most expensive one',
          items: ['Modules', 'Edition', 'Scope'],
        },
        implementation: {
          caption: 'Configure, build, and migrate data in a controlled way',
          items: ['Config', 'Develop', 'Migrate'],
        },
        training: {
          caption: 'Your team is ready before go-live',
          items: ['Training', 'UAT', 'Go-live'],
        },
        support: {
          caption: 'We stay with you after the system goes live',
          items: ['Monitor', 'Support', 'Improve'],
        },
      },
    },
  } as const;
