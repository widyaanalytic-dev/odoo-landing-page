import { CONTACT_EMAIL } from '../constants';

export const cta = {
    id: {
      eyebrow: 'Hubungi Kami',
      highlight: {
        lead: 'Siap Memulai',
        accent: 'Transformasi Digital?',
      },
      description: 'Ceritakan kebutuhan bisnis Anda — kami merancang solusi Odoo yang tepat, tanpa komitmen di awal.',
      response: 'Respons dalam 1×24 jam.',
      cta: 'Mulai Konsultasi',
      bullets: [
        {
          iconId: 'message' as const,
          title: 'Diskusi kebutuhan',
          detail: 'Tanpa komitmen di awal',
        },
        {
          iconId: 'clock' as const,
          title: 'Respons cepat',
          detail: 'Balasan dalam 1×24 jam',
        },
        {
          iconId: 'sparkles' as const,
          title: 'Solusi disesuaikan',
          detail: 'Dirancang untuk bisnis Anda',
        },
      ],
      visual: {
        hint: 'Langkah pertama',
        emailLabel: 'Email kami',
        copyLabel: 'Salin',
        copiedLabel: 'Tersalin!',
        tagline: 'Technology • AI • Digital Solution',
        identityTitle: 'Identitas Perusahaan',
        identity: [
          { iconId: 'company', label: 'Nama Perusahaan', value: 'PT Widya Intelektual Bangsa' },
          {
            iconId: 'address',
            label: 'Alamat',
            value:
              'Jalan Sukoharjo KM 12,5 Klidon, Desa Sukoharjo, Kec. Ngaglik, Kab. Sleman, Daerah Istimewa Yogyakarta 55281',
          },
          { iconId: 'phone', label: 'Telepon', value: '08139364303', href: 'tel:+628139364303' },
          { iconId: 'email', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
          { iconId: 'instagram', label: 'Instagram', value: '@widya.analytic', href: 'https://instagram.com/widya.analytic' },
          { iconId: 'linkedin', label: 'LinkedIn', value: 'Widya Analytic', href: 'https://linkedin.com/company/widya-analytic' },
        ],
      },
    },
    en: {
      eyebrow: 'Get in Touch',
      highlight: {
        lead: 'Ready to Start Your',
        accent: 'Digital Transformation?',
      },
      description:
        'Tell us what you need — we design the right Odoo solution, with no upfront commitment.',
      response: 'Response within 24 hours.',
      cta: 'Start Consultation',
      bullets: [
        {
          iconId: 'message' as const,
          title: 'Discovery call',
          detail: 'No upfront commitment',
        },
        {
          iconId: 'clock' as const,
          title: 'Fast response',
          detail: 'Reply within 24 hours',
        },
        {
          iconId: 'sparkles' as const,
          title: 'Tailored solution',
          detail: 'Built for your business',
        },
      ],
      visual: {
        hint: 'First step',
        emailLabel: 'Our email',
        copyLabel: 'Copy',
        copiedLabel: 'Copied!',
        tagline: 'Technology • AI • Digital Solution',
        identityTitle: 'Company Identity',
        identity: [
          { iconId: 'company', label: 'Company Name', value: 'PT Widya Intelektual Bangsa' },
          {
            iconId: 'address',
            label: 'Address',
            value:
              'Jalan Sukoharjo KM 12.5 Klidon, Sukoharjo Village, Ngaglik District, Sleman Regency, Yogyakarta 55281, Indonesia',
          },
          { iconId: 'phone', label: 'Phone', value: '08139364303', href: 'tel:+628139364303' },
          { iconId: 'email', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
          { iconId: 'instagram', label: 'Instagram', value: '@widya.analytic', href: 'https://instagram.com/widya.analytic' },
          { iconId: 'linkedin', label: 'LinkedIn', value: 'Widya Analytic', href: 'https://linkedin.com/company/widya-analytic' },
        ],
      },
    },
  } as const;
