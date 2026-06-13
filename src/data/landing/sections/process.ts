export const process = {
    id: {
      eyebrow: 'Proses Kerja',
      highlight: {
        lead: 'Lima langkah terstruktur.',
        accent: 'Dari Konsultasi hingga Go-Live',
      },
      intro:
        'Metodologi implementasi kami dirancang transparan — Anda selalu tahu apa yang sedang dikerjakan dan langkah berikutnya.',
      steps: [
        {
          id: 'discovery' as const,
          title: 'Discovery',
          text: 'Kami pelajari proses bisnis, pain points, dan tujuan yang ingin dicapai bersama tim Anda.',
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
          caption: 'Memahami bisnis sebelum menulis satu baris kode',
          items: ['Workshop', 'Assessment', 'Roadmap'],
        },
        design: {
          caption: 'Merancang solusi yang tepat — bukan yang paling mahal',
          items: ['Modul', 'Edisi', 'Scope'],
        },
        implementation: {
          caption: 'Build, configure, dan migrasi data dengan terkontrol',
          items: ['Config', 'Develop', 'Migrate'],
        },
        training: {
          caption: 'Tim Anda siap operasional sebelum go-live',
          items: ['Training', 'UAT', 'Go-live'],
        },
        support: {
          caption: 'Partner jangka panjang setelah sistem berjalan',
          items: ['Monitor', 'Support', 'Improve'],
        },
      },
    },
    en: {
      eyebrow: 'How We Work',
      highlight: {
        lead: 'Five structured steps.',
        accent: 'From Consultation to Go-Live',
      },
      intro:
        'Our implementation methodology is transparent — you always know what is in progress and what comes next.',
      steps: [
        {
          id: 'discovery' as const,
          title: 'Discovery',
          text: 'We learn your business processes, pain points, and goals together with your team.',
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
          caption: 'Understanding the business before writing a single line of code',
          items: ['Workshop', 'Assessment', 'Roadmap'],
        },
        design: {
          caption: 'Designing the right solution — not the most expensive one',
          items: ['Modules', 'Edition', 'Scope'],
        },
        implementation: {
          caption: 'Build, configure, and migrate data in a controlled way',
          items: ['Config', 'Develop', 'Migrate'],
        },
        training: {
          caption: 'Your team is ready before go-live',
          items: ['Training', 'UAT', 'Go-live'],
        },
        support: {
          caption: 'A long-term partner after the system is live',
          items: ['Monitor', 'Support', 'Improve'],
        },
      },
    },
  } as const;
