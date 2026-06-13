export const empathy = {
    id: {
      eyebrow: 'Pengalaman kami',
      highlight: {
        lead: 'KAMI SUDAH MENANGANI INI',
        accent: 'BERKALI-KALI.',
      },
      body: {
        before:
          'Dari sawah hingga pabrik, dari klinik hingga restoran — kami telah mengimplementasikan Odoo di ',
        emphasis1: '7+ industri',
        middle: ' dan ',
        emphasis2: '11+ perusahaan',
        after: ' yang berbeda.',
      },
      closing: 'Setiap bisnis unik. Kami tahu cara menyesuaikannya.',
      visual: {
        caption: 'Dari agritech hingga hospitality — kami adaptasi Odoo ke konteks bisnis Anda',
        journey: [
          { label: 'Sawah', context: 'Agritech', iconId: 'sprout' as const },
          { label: 'Pabrik', context: 'Manufaktur', iconId: 'factory' as const },
          { label: 'Klinik', context: 'Healthcare', iconId: 'dna' as const },
          { label: 'Restoran', context: 'Hospitality', iconId: 'hotel' as const },
        ],
        breadth: 'Agritech · Manufaktur · Healthcare · Konstruksi · Hospitality · Alat berat · Jasa',
        stats: [
          { value: '11+', label: 'Perusahaan' },
          { value: '7+', label: 'Industri' },
        ],
      },
    },
    en: {
      eyebrow: 'Our experience',
      highlight: {
        lead: "WE'VE SOLVED THIS,",
        accent: 'AGAIN AND AGAIN.',
      },
      body: {
        before: "From farms to factories, from clinics to restaurants — we've implemented Odoo across ",
        emphasis1: '7+ industries',
        middle: ' and ',
        emphasis2: '11+ companies',
        after: '.',
      },
      closing: 'Every business is unique. We know how to adapt.',
      visual: {
        caption: 'From agritech to hospitality — we adapt Odoo to your business context',
        journey: [
          { label: 'Farm', context: 'Agritech', iconId: 'sprout' as const },
          { label: 'Factory', context: 'Manufacturing', iconId: 'factory' as const },
          { label: 'Clinic', context: 'Healthcare', iconId: 'dna' as const },
          { label: 'Restaurant', context: 'Hospitality', iconId: 'hotel' as const },
        ],
        breadth: 'Agritech · Manufacturing · Healthcare · Construction · Hospitality · Heavy equipment · Services',
        stats: [
          { value: '11+', label: 'Companies' },
          { value: '7+', label: 'Industries' },
        ],
      },
    },
  } as const;
