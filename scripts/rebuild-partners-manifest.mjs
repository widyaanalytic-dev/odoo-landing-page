#!/usr/bin/env node
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/partners');
const MANIFEST_PATH = join(OUT_DIR, 'partners.manifest.json');

const PARTNER_META = [
  { id: 'aici', name: 'AICI', website: 'https://aici-umg.com', featured: true },
  { id: 'autoconz', name: 'Autoconz', website: 'https://autoconz.com', featured: true },
  { id: 'primeskills', name: 'Primeskills', website: 'https://primeskills.co.id' },
  { id: 'frogs', name: 'FROGS', website: 'https://frogs.id', featured: true },
  { id: 'lectro-baterai', name: 'Lectro EMS', website: 'https://lectro.id' },
  { id: 'widya-life-science', name: 'Widya Life Science', website: 'https://widyalifescience.com' },
  { id: 'widya-matador', name: 'Widya Matador', website: 'https://widyamatador.com', featured: true },
  { id: 'widya-robotic', name: 'Widya Robotic', website: 'https://widya.ai' },
  { id: 'msmb', name: 'MSMB', website: 'https://msmb.co.id', featured: true },
  { id: 'widya-wicara', name: 'Widya Wicara', website: 'https://widyawicara.com' },
  { id: 'widya-skilloka', name: 'Widya Skilloka', website: 'https://skilloka.com', featured: true },
  { id: 'atoma-prosehat', name: 'Atoma Prosehat', website: 'https://atomaprosehat.com' },
  { id: 'widya-herbal', name: 'Widya Herbal', website: 'https://widyaherbal.com' },
  { id: 'widya-genomic', name: 'Widya Genomic', website: 'https://widyagenomic.com' },
  { id: 'widya-immersive-technology', name: 'Widya Imersive Technology', website: 'https://widyaimmersive.com' },
  { id: 'idealab-indonesia', name: 'Idealab Indonesia', website: 'https://www.umgidealab.id' },
  { id: 'umg-indonesia', name: 'UMG Indonesia', website: 'https://umg.co.id' },
  { id: 'umg-myanmar', name: 'UMG Myanmar', website: 'https://umg.co.id', aliasOf: 'umg-indonesia' },
  { id: 'umg-srilanka', name: 'UMG Sri Lanka', website: 'https://umg.co.id', aliasOf: 'umg-indonesia' },
];

const EXT_PRIORITY = ['png', 'jpg', 'jpeg', 'webp', 'ico', 'svg'];

const PARTNERS_TS_PATH = join(__dirname, '../src/data/partners.ts');

function pickBestFile(id) {
  const candidates = EXT_PRIORITY.map((ext) => {
    const path = join(OUT_DIR, `${id}.${ext}`);
    try {
      const stat = statSync(path);
      const content = ext === 'svg' ? readFileSync(path, 'utf8') : '';
      const isFallbackMonogram = ext === 'svg' && content.includes('font-weight="700"') && stat.size < 400;
      return { ext, size: stat.size, isFallbackMonogram, path };
    } catch {
      return null;
    }
  }).filter(Boolean);

  const real = candidates.filter((c) => !c.isFallbackMonogram);
  const pool = real.length ? real : candidates;

  // Prefer largest raster asset; deprioritize .ico (often multi-size favicon bundles)
  pool.sort((a, b) => {
    const aScore = a.size * (a.ext === 'ico' ? 0.15 : 1);
    const bScore = b.size * (b.ext === 'ico' ? 0.15 : 1);
    if (bScore !== aScore) return bScore - aScore;
    const pa = EXT_PRIORITY.indexOf(a.ext);
    const pb = EXT_PRIORITY.indexOf(b.ext);
    return pa - pb;
  });

  return pool[0] ?? null;
}

const oldManifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const oldById = Object.fromEntries(oldManifest.partners.map((p) => [p.id, p]));

const partners = PARTNER_META.map((meta) => {
  if (meta.aliasOf) {
    const aliasFile = pickBestFile(meta.aliasOf);
    const isFallback = aliasFile?.isFallbackMonogram ?? true;
    return {
      id: meta.id,
      name: meta.name,
      file: aliasFile ? `/partners/${meta.aliasOf}.${aliasFile.ext}` : `/partners/${meta.aliasOf}.png`,
      sourceUrl: oldById[meta.aliasOf]?.sourceUrl ?? meta.website,
      website: meta.website,
      status: isFallback ? 'fallback' : 'alias',
      featured: meta.featured ?? false,
    };
  }

  const file = pickBestFile(meta.id);
  const isFallback = file?.isFallbackMonogram ?? true;
  return {
    id: meta.id,
    name: meta.name,
    file: file ? `/partners/${meta.id}.${file.ext}` : `/partners/${meta.id}.svg`,
    sourceUrl: oldById[meta.id]?.sourceUrl ?? meta.website,
    website: meta.website,
    status: isFallback ? 'fallback' : 'found',
    featured: meta.featured ?? false,
  };
});

writeFileSync(
  MANIFEST_PATH,
  JSON.stringify({ partners, generatedAt: new Date().toISOString() }, null, 2),
);

function syncPartnersTs() {
  const lines = partners.map((p) => {
    const featured = p.featured ? ', featured: true' : '';
    const status = `, status: '${p.status}'`;
    const website = p.website ? `, website: '${p.website}'` : '';
    const name = p.name.replace(/'/g, "\\'");
    return `  { id: '${p.id}', name: '${name}', src: '${p.file}'${website}${featured}${status} },`;
  });

  const content = `export type PartnerLogo = {
  id: string;
  name: string;
  src: string;
  website?: string;
  featured?: boolean;
  status?: 'found' | 'fallback' | 'alias';
};

export const partnerLogos: PartnerLogo[] = [
${lines.join('\n')}
];
`;

  writeFileSync(PARTNERS_TS_PATH, content);
  console.log(`Synced ${PARTNERS_TS_PATH}`);
}

syncPartnersTs();

const found = partners.filter((p) => p.status === 'found').length;
console.log(`Rebuilt manifest: ${found} found, ${partners.length - found} fallback`);
