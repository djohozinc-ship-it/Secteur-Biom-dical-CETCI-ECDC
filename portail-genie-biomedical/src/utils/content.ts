import { marked } from 'marked';
import { parseFrontmatter } from './frontmatter';
import { isExpired } from './format';
import { site } from '../config/site';
import type {
  Article, Communique, Ressource, Projet, Formation, Opportunite, Membre, EntreeAnnuaire, Rubrique, SearchItem, Statut,
} from '../types';
import communiquesData from '../data/communiques/communiques.json';
import ressourcesData from '../data/ressources/ressources.json';
import projetsData from '../data/projets/projets.json';
import formationsData from '../data/formations/formations.json';
import opportunitesData from '../data/opportunites/opportunites.json';
import membresData from '../data/membres/membres.json';
import annuaireData from '../data/annuaire/annuaire.json';
import rubriquesData from '../data/rubriques/rubriques.json';
import demoCommuniques from '../data/demo/communiques.json';
import demoRessources from '../data/demo/ressources.json';
import demoProjets from '../data/demo/projets.json';
import demoFormations from '../data/demo/formations.json';
import demoOpportunites from '../data/demo/opportunites.json';
import demoMembres from '../data/demo/membres.json';
import demoAnnuaire from '../data/demo/annuaire.json';

// --- Règles éditoriales ---------------------------------------------------
// Visible = statut « publie » ou « archive ». Tout le reste (brouillon, statut
// absent ou inconnu) n'est JAMAIS affiché.
const isVisible = (s?: Statut) => s === 'publie' || s === 'archive';
const isLive = (s?: Statut) => s === 'publie';

// Contenus de démonstration : fusionnés seulement si site.showDemo est vrai,
// et toujours marqués « demo: true » pour être identifiés à l'affichage.
function withDemo<T extends { demo?: boolean }>(real: unknown, demo: unknown): T[] {
  const r = real as T[];
  return site.showDemo ? [...r, ...(demo as T[]).map((d) => ({ ...d, demo: true }))] : r;
}

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

// --- Articles (Markdown) ---------------------------------------------------
const rawArticles = import.meta.glob('../data/articles/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const rawDemoArticles = import.meta.glob('../data/demo/articles/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parseArticles(files: Record<string, string>, demo: boolean): Article[] {
  return Object.entries(files).flatMap(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const statut = data.statut as Statut;
    if (!isVisible(statut)) return [];
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    return [{
      slug, title: data.title ?? slug, date: data.date ?? '', dateMiseAJour: data.dateMiseAJour,
      category: data.category ?? 'Général', summary: data.summary ?? '', image: data.image,
      imageAlt: data.imageAlt, rubrique: data.rubrique, source: data.source, sourceUrl: data.sourceUrl,
      statut, demo, body,
    }];
  });
}

export const articles: Article[] = [
  ...parseArticles(rawArticles, false),
  ...(site.showDemo ? parseArticles(rawDemoArticles, true) : []),
].sort(byDateDesc);

// --- Autres contenus ----------------------------------------------------------
export const communiques = withDemo<Communique>(communiquesData, demoCommuniques).filter((c) => isVisible(c.statut)).sort(byDateDesc);
export const ressources = withDemo<Ressource>(ressourcesData, demoRessources).filter((r) => isLive(r.statut));
export const projets = withDemo<Projet>(projetsData, demoProjets).filter((p) => isLive(p.statut));
export const formations = withDemo<Formation>(formationsData, demoFormations).filter((f) => isLive(f.statut));
export const opportunites = withDemo<Opportunite>(opportunitesData, demoOpportunites).filter((o) => isVisible(o.statut));
export const membres = withDemo<Membre>(membresData, demoMembres).filter((m) => isLive(m.statut) && m.consentement);
export const annuaire = withDemo<EntreeAnnuaire>(annuaireData, demoAnnuaire).filter((e) => isLive(e.statut) && e.consentement);
export const rubriques = rubriquesData as Rubrique[];

// Une opportunité passe en archives si son statut est « archive » ou si sa date limite est dépassée.
export const isArchived = (o: Opportunite) => o.statut === 'archive' || isExpired(o.dateLimite);
export const isArchivedItem = (x: { statut: Statut }) => x.statut === 'archive';

export const renderMarkdown = (md: string): string => marked.parse(md, { async: false }) as string;

// --- Index de recherche (contenus publiés et non archivés) ---------------------
export const searchIndex: SearchItem[] = [
  ...articles.filter((a) => isLive(a.statut)).map((a) => ({ id: `a-${a.slug}`, kind: 'Actualité', title: a.title, text: `${a.summary} ${a.body}`, category: a.category, to: `/actualites/${a.slug}`, demo: a.demo })),
  ...communiques.filter((c) => isLive(c.statut)).map((c) => ({ id: `c-${c.id}`, kind: 'Communiqué', title: c.title, text: `${c.summary} ${c.content}`, category: c.category, to: `/communiques/${c.id}`, demo: c.demo })),
  ...ressources.map((r) => ({ id: `r-${r.id}`, kind: 'Ressource', title: r.title, text: `${r.description} ${r.source ?? ''} ${r.auteur ?? ''}`, category: r.category, to: '/ressources', demo: r.demo })),
  ...projets.map((p) => ({ id: `p-${p.id}`, kind: 'Projet', title: p.name, text: `${p.description} ${p.problem} ${p.technologies.join(' ')}`, category: p.category, to: `/projets/${p.id}`, demo: p.demo })),
  ...formations.map((f) => ({ id: `f-${f.id}`, kind: 'Formation', title: f.formation ?? f.etablissement, text: `${f.etablissement} ${f.description} ${f.ville ?? ''}`, category: f.type, to: '/formations', demo: f.demo })),
  ...opportunites.filter((o) => !isArchived(o)).map((o) => ({ id: `o-${o.id}`, kind: 'Opportunité', title: o.title, text: `${o.description} ${o.organisme ?? ''}`, category: o.type, to: '/opportunites', demo: o.demo })),
  ...rubriques.map((r) => ({ id: `g-${r.slug}`, kind: 'Domaine', title: r.title, text: `${r.intro} ${r.themes.join(' ')}`, category: r.groupe, to: `/genie-biomedical/${r.slug}` })),
];
