export const empathy = {
    id: {
      eyebrow: 'Pengalaman kami',
      highlight: {
        lead: 'Kasus seperti ini',
        accent: 'sudah sering kami tangani.',
      },
      body: {
        before: 'Odoo sudah kami implementasikan untuk ',
        emphasis1: '12+ industri',
        middle: ' dan ',
        emphasis2: '19 perusahaan',
        after: ', dari pertanian dan manufaktur hingga klinik dan restoran.',
      },
      closing: 'Tiap bisnis punya caranya. Kami bantu menyesuaikan sistemnya.',
      visual: {
        caption: 'Odoo disesuaikan dengan konteks bisnis Anda, dari agritech hingga hospitality',
        journey: [
          { label: 'Pertanian', context: 'Agritech', iconId: 'sprout' as const },
          { label: 'Pabrik', context: 'Manufaktur', iconId: 'factory' as const },
          { label: 'Klinik', context: 'Healthcare', iconId: 'dna' as const },
          { label: 'Restoran', context: 'Hospitality', iconId: 'hotel' as const },
        ],
        breadth: 'Agritech, manufaktur, healthcare, konstruksi, hospitality, alat berat, jasa',
        stats: [
          { value: '19', label: 'Perusahaan' },
          { value: '12+', label: 'Industri' },
        ],
      },
    },
    en: {
      eyebrow: 'Our experience',
      highlight: {
        lead: 'We have handled',
        accent: 'cases like this many times.',
      },
      body: {
        before: 'We have implemented Odoo for ',
        emphasis1: '12+ industries',
        middle: ' and ',
        emphasis2: '19 companies',
        after: ', from agriculture and manufacturing to clinics and restaurants.',
      },
      closing: 'Every business works differently. We help fit the system to yours.',
      visual: {
        caption: 'Odoo adapted to your business context, from agritech to hospitality',
        journey: [
          { label: 'Farm', context: 'Agritech', iconId: 'sprout' as const },
          { label: 'Factory', context: 'Manufacturing', iconId: 'factory' as const },
          { label: 'Clinic', context: 'Healthcare', iconId: 'dna' as const },
          { label: 'Restaurant', context: 'Hospitality', iconId: 'hotel' as const },
        ],
        breadth: 'Agritech, manufacturing, healthcare, construction, hospitality, heavy equipment, services',
        stats: [
          { value: '19', label: 'Companies' },
          { value: '12+', label: 'Industries' },
        ],
      },
    },
  } as const;
