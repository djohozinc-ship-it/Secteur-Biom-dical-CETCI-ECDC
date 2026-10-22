// Après `vite build` : génère une vraie page HTML par adresse (titre, description, canonical propres),
// un 404.html pour GitHub Pages et le sitemap.xml. Sans cela, Google ne voit qu'une seule page.
// Aucune dépendance : Node 20 suffit. Lancé automatiquement par `npm run build`.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const SITE = 'https://djohozinc-ship-it.github.io/Secteur-Biom-dical-CETCI-ECDC/';
const BASE = '/Secteur-Biom-dical-CETCI-ECDC/';
const NAME = 'Secteur Biomédical CETCI/ECDC';
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const readJson = (p, fallback = []) => { try { return JSON.parse(readFileSync(join(root, p), 'utf-8')); } catch { return fallback; } };
const published = (arr) => (Array.isArray(arr) ? arr : []).filter((x) => x && x.statut === 'publie');

// --- Contenus publiés (une rubrique vide n'est pas proposée à Google) ---
const rubriques = readJson('src/data/rubriques/rubriques.json');
const projets = published(readJson('src/data/projets/projets.json'));
const communiques = published(readJson('src/data/communiques/communiques.json'));
const ressources = published(readJson('src/data/ressources/ressources.json'));
const formations = published(readJson('src/data/formations/formations.json'));
const opportunites = published(readJson('src/data/opportunites/opportunites.json'));

const articles = [];
const artDir = join(root, 'src/data/articles');
if (existsSync(artDir)) {
  for (const f of readdirSync(artDir).filter((n) => n.endsWith('.md'))) {
    const raw = readFileSync(join(artDir, f), 'utf-8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const get = (k) => (fm[1].match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1]?.trim().replace(/^["']|["']$/g, '');
    if (get('statut') !== 'publie') continue;
    articles.push({ slug: f.replace(/\.md$/, ''), title: get('title') || f, summary: get('summary') || '', date: get('date') });
  }
}

// --- Pages ---
const pages = [];
const add = (path, title, desc, h1, body = '', index = true) => pages.push({ path, title, desc, h1, body, index });

add('a-propos/', `À propos | ${NAME}`,
  "Le Secteur Biomédical du CETCI/ECDC : un groupe d'étudiants en génie biomédical au sein d'une organisation privée et indépendante au Bénin. Vision, organisation, pôles et compétences.",
  'À propos du Secteur Biomédical du CETCI/ECDC',
  "<p>Le CETCI/ECDC (Centre d'Élaboration des Technologies de Conception en Ingénierie) est une organisation privée et indépendante, fondée en 2024 à l'initiative d'étudiants. Le secteur biomédical en est l'un des secteurs : des étudiants en génie biomédical qui se forment, développent leurs compétences en maintenance biomédicale et travaillent sur des projets.</p>");
add('membres/', `Membres | ${NAME}`,
  'Les étudiants du Secteur Biomédical du CETCI/ECDC : chef de secteur, pôles et compétences en génie biomédical.',
  'Membres du secteur biomédical du CETCI/ECDC');
add('genie-biomedical/', `Génie biomédical : les grands domaines | ${NAME}`,
  'Les grands domaines du génie biomédical présentés par le Secteur Biomédical du CETCI/ECDC : maintenance, ingénierie hospitalière, dispositifs médicaux, imagerie, métrologie.',
  'Génie biomédical : les grands domaines',
  `<ul>${rubriques.map((r) => `<li><a href="${BASE}genie-biomedical/${r.slug}/">${esc(r.title)}</a></li>`).join('')}</ul>`);
for (const r of rubriques) {
  add(`genie-biomedical/${r.slug}/`, `${r.title} – génie biomédical | ${NAME}`, r.intro, r.title,
    `<p>${esc(r.intro)}</p>${(r.themes || []).length ? `<ul>${r.themes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}`);
}
add('contact/', `Contact et collaboration | ${NAME}`,
  'Contacter le Secteur Biomédical du CETCI/ECDC : question, projet, ressource ou partenariat.',
  'Contact et collaboration');
for (const [p, t] of [['mentions-legales/', 'Mentions légales'], ['confidentialite/', 'Confidentialité'], ['conditions-utilisation/', "Conditions d'utilisation"], ['propriete-intellectuelle/', 'Propriété intellectuelle']]) {
  add(p, `${t} | ${NAME}`, `${t} du site du Secteur Biomédical du CETCI/ECDC.`, t);
}
// Listes : indexées seulement si elles contiennent quelque chose
add('actualites/', `Actualités | ${NAME}`, 'Actualités du Secteur Biomédical du CETCI/ECDC.', 'Actualités', '', articles.length > 0);
add('projets/', `Projets et prototypes | ${NAME}`, 'Projets et prototypes des étudiants du Secteur Biomédical du CETCI/ECDC.', 'Projets et prototypes', '', projets.length > 0);
add('communiques/', `Annonces | ${NAME}`, 'Annonces du Secteur Biomédical du CETCI/ECDC.', 'Annonces', '', communiques.length > 0);
add('ressources/', `Ressources techniques | ${NAME}`, 'Ressources techniques du Secteur Biomédical du CETCI/ECDC.', 'Ressources techniques', '', ressources.length > 0);
add('formations/', `Formations | ${NAME}`, 'Formations en génie biomédical.', 'Formations', '', formations.length > 0);
add('opportunites/', `Opportunités | ${NAME}`, 'Opportunités en génie biomédical.', 'Opportunités', '', opportunites.length > 0);
for (const a of articles) add(`actualites/${a.slug}/`, `${a.title} | ${NAME}`, a.summary || a.title, a.title, `<p>${esc(a.summary)}</p>`);
for (const p of projets) add(`projets/${p.id}/`, `${p.name} | ${NAME}`, p.description || p.name, p.name, `<p>${esc(p.description || '')}</p>`);

// --- Écriture ---
const template = readFileSync(join(dist, 'index.html'), 'utf-8');
const fallbackRe = /<div class="static-fallback">[\s\S]*?<\/ul>\s*<\/div>/;
const sub = (html, re, to) => { if (!re.test(html)) throw new Error(`prerender: motif introuvable ${re}`); return html.replace(re, () => to); };

function render(p) {
  const url = SITE + p.path;
  let h = template;
  h = sub(h, /<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`);
  h = sub(h, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(p.desc)}" />`);
  h = sub(h, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  h = sub(h, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(p.title)}" />`);
  h = sub(h, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(p.desc)}" />`);
  h = sub(h, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  h = sub(h, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(p.title)}" />`);
  h = sub(h, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(p.desc)}" />`);
  if (!p.index) h = sub(h, /<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />');
  h = sub(h, fallbackRe, `<div class="static-fallback"><h1>${esc(p.h1)}</h1><p>${esc(p.desc)}</p>${p.body}<p><a href="${BASE}">Accueil – ${NAME}</a></p></div>`);
  return h;
}

for (const p of pages) {
  const dir = join(dist, p.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(p));
}

// 404.html : GitHub Pages l'affiche pour toute adresse inconnue ; l'application affiche alors « Page introuvable ».
writeFileSync(join(dist, '404.html'), sub(template, /<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />'));

// sitemap.xml : uniquement les pages indexables
const urls = [{ path: '', index: true }, ...pages].filter((p) => p.index);
writeFileSync(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((p) => `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`);

console.log(`prerender : ${pages.length} pages générées, ${urls.length} dans le sitemap.`);
