import { marked } from 'marked';
import { parseFrontmatter } from './frontmatter';
import { isExpired } from './format';
import type {
  Article, Communique, Ressource, Projet, Formation, Opportunite, Membre, EntreeAnnuaire, Rubrique, SearchItem,
} from '../types';
import communiquesData from '../data/communiques/communiques.json';
import ressourcesData from '../data/ressources/ressources.json';
import projetsData from '../data/projets/projets.json';
import formationsData from '../data/formations/formations.json';
import opportunitesData from '../data/opportunites/opportunites.json';
import membresData from '../data/membres/membres.json';
import annuaireData from '../data/annuaire/annuaire.json';
import rubriquesData from '../data/rubriques/rubriques.json';

const rawArticles = import.meta.glob('../data/articles/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export const articles: Article[] = Object.entries(rawArticles)
  .flatMap(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    if (data.statut === 'brouillon') return [];
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const article: Article = {
      slug, title: data.title ?? slug, date: data.date ?? '', category: data.category ?? 'Général',
      summary: data.summary ?? '', image: data.image, rubrique: data.rubrique,
      demo: data.demo === 'true', body,
    };
    return [article];
  })
  .sort(byDateDesc);

export const communiques = (communiquesData as Communique[]).filter((c) => c.statut === 'publie').sort(byDateDesc);
export const ressources = ressourcesData as Ressource[];
export const projets = projetsData as Projet[];
export const formations = formationsData as Formation[];
export const opportunites = opportunitesData as Opportunite[];
export const membres = (membresData as Membre[]).filter((m) => m.consentement);
export const annuaire = (annuaireData as EntreeAnnuaire[]).filter((e) => e.consentement);
export const rubriques = rubriquesData as Rubrique[];

export const isArchived = (o: Opportunite) => !!o.archived || isExpired(o.deadline);

export const renderMarkdown = (md: string): string => marked.parse(md, { async: false }) as string;

export const searchIndex: SearchItem[] = [
  ...articles.map((a) => ({ id: `a-${a.slug}`, kind: 'Actualité', title: a.title, text: `${a.summary} ${a.body}`, category: a.category, to: `/actualites/${a.slug}`, demo: a.demo })),
  ...communiques.map((c) => ({ id: `c-${c.id}`, kind: 'Communiqué', title: c.title, text: `${c.summary} ${c.content}`, category: c.category, to: `/communiques/${c.id}`, demo: c.demo })),
  ...ressources.map((r) => ({ id: `r-${r.id}`, kind: 'Ressource', title: r.title, text: r.description, category: r.category, to: '/ressources', demo: r.demo })),
  ...projets.map((p) => ({ id: `p-${p.id}`, kind: 'Projet', title: p.name, text: `${p.description} ${p.problem} ${p.technologies.join(' ')}`, category: p.category, to: `/projets/${p.id}`, demo: p.demo })),
  ...formations.map((f) => ({ id: `f-${f.id}`, kind: 'Formation', title: f.name, text: f.description, category: f.kind, to: '/formations', demo: f.demo })),
  ...opportunites.map((o) => ({ id: `o-${o.id}`, kind: 'Opportunité', title: o.title, text: o.description, category: o.type, to: '/opportunites', demo: o.demo })),
];
