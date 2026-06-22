export type PartnerLogo = {
  id: string;
  name: string;
  src: string;
  website?: string;
  featured?: boolean;
  status?: 'found' | 'fallback' | 'alias';
};

export const partnerLogos: PartnerLogo[] = [
  { id: 'aici', name: 'AICI', src: '/partners/aici.jpg', website: 'https://aici-umg.com', featured: true, status: 'found' },
  { id: 'autoconz', name: 'Autoconz', src: '/partners/autoconz.jpg', website: 'https://autoconz.com', featured: true, status: 'found' },
  { id: 'primeskills', name: 'Primeskills', src: '/partners/primeskills.jpg', website: 'https://primeskills.co.id', status: 'found' },
  { id: 'frogs', name: 'FROGS', src: '/partners/frogs.jpg', website: 'https://frogs.id', featured: true, status: 'found' },
  { id: 'lectro-baterai', name: 'Lectro EMS', src: '/partners/lectro-baterai.jpg', website: 'https://lectro.id', status: 'found' },
  { id: 'widya-life-science', name: 'Widya Life Science', src: '/partners/widya-life-science.jpg', website: 'https://widyalifescience.com', status: 'found' },
  { id: 'widya-matador', name: 'Widya Matador', src: '/partners/widya-matador.png', website: 'https://widyamatador.com', featured: true, status: 'found' },
  { id: 'widya-robotic', name: 'Widya Robotic', src: '/partners/widya-robotic.png', website: 'https://widya.ai', status: 'found' },
  { id: 'msmb', name: 'MSMB', src: '/partners/msmb.jpg', website: 'https://msmb.co.id', featured: true, status: 'found' },
  { id: 'widya-wicara', name: 'Widya Wicara', src: '/partners/widya-wicara.jpg', website: 'https://widyawicara.com', status: 'found' },
  { id: 'widya-skilloka', name: 'Widya Skilloka', src: '/partners/widya-skilloka.png', website: 'https://skilloka.com', featured: true, status: 'found' },
  { id: 'atoma-prosehat', name: 'Atoma Prosehat', src: '/partners/atoma-prosehat.jpg', website: 'https://atomaprosehat.com', status: 'found' },
  { id: 'widya-herbal', name: 'Widya Herbal', src: '/partners/widya-herbal.jpg', website: 'https://widyaherbal.com', status: 'found' },
  { id: 'widya-genomic', name: 'Widya Genomic', src: '/partners/widya-genomic.jpg', website: 'https://widyagenomic.com', status: 'found' },
  { id: 'widya-immersive-technology', name: 'Widya Imersive Technology', src: '/partners/widya-immersive-technology.jpg', website: 'https://widyaimmersive.com', status: 'found' },
  { id: 'idealab-indonesia', name: 'Idealab Indonesia', src: '/partners/idealab-indonesia.png', website: 'https://www.umgidealab.id', status: 'found' },
  { id: 'umg-indonesia', name: 'UMG Indonesia', src: '/partners/umg-indonesia.png', website: 'https://umg.co.id', status: 'found' },
  { id: 'umg-myanmar', name: 'UMG Myanmar', src: '/partners/umg-indonesia.png', website: 'https://umg.co.id', status: 'alias' },
  { id: 'umg-srilanka', name: 'UMG Sri Lanka', src: '/partners/umg-indonesia.png', website: 'https://umg.co.id', status: 'alias' },
];
