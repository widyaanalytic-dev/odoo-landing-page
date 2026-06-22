#!/usr/bin/env node
/**
 * Fetches partner logos from official websites or generates SVG fallbacks.
 * Run: node scripts/fetch-partner-logos.mjs
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/partners');
const MANIFEST_PATH = join(OUT_DIR, 'partners.manifest.json');

mkdirSync(OUT_DIR, { recursive: true });

/** @type {{ id: string; name: string; website: string; logoUrls?: string[]; featured?: boolean }[]} */
const PARTNERS = [
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
  { id: 'umg-myanmar', name: 'UMG Myanmar', website: 'https://umg.co.id', logoUrls: ['/partners/umg-indonesia.png'] },
  { id: 'umg-srilanka', name: 'UMG Sri Lanka', website: 'https://umg.co.id', logoUrls: ['/partners/umg-indonesia.png'] },
];

const COMMON_LOGO_PATHS = [
  '/logo.svg',
  '/logo.png',
  '/assets/logo.svg',
  '/assets/logo.png',
  '/images/logo.svg',
  '/images/logo.png',
  '/img/logo.svg',
  '/img/logo.png',
  '/wp-content/uploads/logo.png',
  '/favicon.ico',
  '/apple-touch-icon.png',
];

function initials(name) {
  const words = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function fallbackSvg(name) {
  const init = initials(name);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 120 48" role="img" aria-label="${name}">
  <rect width="120" height="48" rx="8" fill="#f1f5f9"/>
  <text x="60" y="30" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="700" fill="#0e2a47">${init}</text>
</svg>`;
}

function extFromContentType(ct, url) {
  if (ct?.includes('svg')) return 'svg';
  if (ct?.includes('png')) return 'png';
  if (ct?.includes('jpeg') || ct?.includes('jpg')) return 'jpg';
  if (ct?.includes('webp')) return 'webp';
  if (ct?.includes('ico') || ct?.includes('x-icon')) return 'ico';
  const m = url.match(/\.(svg|png|jpe?g|webp|ico)(\?|$)/i);
  return m ? m[1].replace('jpeg', 'jpg') : 'png';
}

async function fetchBuffer(url, timeout = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WidyaPartnerLogoBot/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') ?? '';
    if (ct.includes('text/html')) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) return null;
    return { buf, ct, url };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function resolveUrl(base, href) {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

function extractLogoFromHtml(html, baseUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<link[^>]+rel=["'](?:apple-touch-icon|icon)["'][^>]+href=["']([^"']+)["']/i,
    /<img[^>]+(?:class|id|alt)=["'][^"']*logo[^"']*["'][^>]+src=["']([^"']+)["']/i,
    /<img[^>]+src=["']([^"']+)["'][^>]+(?:class|id|alt)=["'][^"']*logo[^"']*["']/i,
    /src=["']([^"']*logo[^"']*\.(?:svg|png|jpe?g|webp))["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) {
      const resolved = resolveUrl(baseUrl, m[1]);
      if (resolved) return resolved;
    }
  }
  return null;
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WidyaPartnerLogoBot/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('text/html')) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function tryDownloadLogo(partner) {
  const candidates = [];

  if (partner.logoUrls) {
    candidates.push(...partner.logoUrls);
  }

  let base = partner.website.replace(/\/$/, '');
  for (const path of COMMON_LOGO_PATHS) {
    candidates.push(base + path);
  }

  const html = await fetchHtml(partner.website);
  if (html) {
    const fromHtml = extractLogoFromHtml(html, partner.website);
    if (fromHtml) candidates.unshift(fromHtml);

    // Also try www variant
    if (!partner.website.includes('www.')) {
      const wwwHtml = await fetchHtml(partner.website.replace('://', '://www.'));
      if (wwwHtml) {
        const wwwLogo = extractLogoFromHtml(wwwHtml, partner.website.replace('://', '://www.'));
        if (wwwLogo) candidates.unshift(wwwLogo);
      }
    }
  }

  const seen = new Set();
  for (const url of candidates) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    const result = await fetchBuffer(url);
    if (result) {
      const ext = extFromContentType(result.ct, url);
      return { ...result, ext, sourceUrl: url };
    }
  }

  return null;
}

async function main() {
  /** @type {import('../public/partners/partners.manifest.json')} */
  const manifest = { partners: [], generatedAt: new Date().toISOString() };

  for (const partner of PARTNERS) {
    process.stdout.write(`Fetching ${partner.name}... `);
    let status = 'fallback';
    let file = `/partners/${partner.id}.svg`;
    let sourceUrl = partner.website;

    const downloaded = await tryDownloadLogo(partner);

    if (downloaded) {
      const outPath = join(OUT_DIR, `${partner.id}.${downloaded.ext}`);
      writeFileSync(outPath, downloaded.buf);
      file = `/partners/${partner.id}.${downloaded.ext}`;
      sourceUrl = downloaded.sourceUrl;
      status = 'found';
      console.log(`OK (${downloaded.ext})`);
    } else {
      // Reuse existing file if present
      const existing = ['svg', 'png', 'jpg', 'webp', 'ico']
        .map((ext) => join(OUT_DIR, `${partner.id}.${ext}`))
        .find((p) => existsSync(p));

      if (existing) {
        const ext = existing.split('.').pop();
        file = `/partners/${partner.id}.${ext}`;
        status = 'existing';
        console.log(`SKIP (existing .${ext})`);
      } else {
        // Copy from related partner (lectro-ems -> lectro-baterai, matador-lectro -> widya-matador)
        const aliasMap = {
          'lectro-ems': 'lectro-baterai',
          'matador-lectro': 'widya-matador',
        };
        const alias = aliasMap[partner.id];
        if (alias) {
          const aliasFile = ['svg', 'png', 'jpg', 'webp'].find((ext) =>
            existsSync(join(OUT_DIR, `${alias}.${ext}`)),
          );
          if (aliasFile) {
            const src = join(OUT_DIR, `${alias}.${aliasFile}`);
            const dest = join(OUT_DIR, `${partner.id}.${aliasFile}`);
            writeFileSync(dest, readFileSync(src));
            file = `/partners/${partner.id}.${aliasFile}`;
            status = 'alias';
            console.log(`ALIAS from ${alias}`);
          }
        }

        if (status === 'fallback') {
          writeFileSync(join(OUT_DIR, `${partner.id}.svg`), fallbackSvg(partner.name));
          console.log('FALLBACK');
        }
      }
    }

    manifest.partners.push({
      id: partner.id,
      name: partner.name,
      file,
      sourceUrl,
      website: partner.website,
      status,
      featured: partner.featured ?? false,
    });
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${MANIFEST_PATH}`);
  const found = manifest.partners.filter((p) => p.status === 'found').length;
  const fallback = manifest.partners.filter((p) => p.status === 'fallback').length;
  console.log(`Found: ${found}, Fallback: ${fallback}, Total: ${manifest.partners.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
