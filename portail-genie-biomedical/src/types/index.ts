// Statut éditorial : seuls « publie » et « archive » sont visibles sur le site.
export type Statut = 'brouillon' | 'publie' | 'archive';

export interface Article {
  slug: string; title: string; date: string; dateMiseAJour?: string; category: string; summary: string;
  image?: string; imageAlt?: string; rubrique?: string; source?: string; sourceUrl?: string;
  statut: Statut; demo: boolean; body: string;
}
export interface Communique {
  id: string; title: string; date: string; dateMiseAJour?: string; summary: string; content: string;
  category: string; pdf?: string; source?: string; statut: Statut; demo?: boolean;
}
export interface Ressource {
  id: string; title: string; description: string; category: string; typeDocument: string;
  url?: string; source?: string; date?: string; auteur?: string; rubrique?: string;
  statut: Statut; demo?: boolean;
}
export interface Projet {
  id: string; name: string; description: string; problem: string; objectives: string[];
  team: string[]; technologies: string[]; status: string; category: string;
  images?: string[]; links?: { label: string; url: string }[]; rubrique?: string;
  dateMiseAJour?: string; statut: Statut; demo?: boolean;
}
export interface Formation {
  id: string; type: 'Formation' | 'Établissement' | 'Formation complémentaire';
  etablissement: string; formation?: string; niveau?: string; diplome?: string; ville?: string;
  description: string; siteOfficiel?: string; admission?: string; contact?: string;
  source?: string; dateVerification?: string; statut: Statut; demo?: boolean;
}
export interface Opportunite {
  id: string; title: string; type: string; description: string; organisme?: string;
  source: string; url?: string; datePublication?: string; dateLimite?: string;
  statut: Statut; demo?: boolean;
}
export interface Membre {
  id: string; name: string; role: string; pole: string; bio: string; photo?: string;
  links?: { label: string; url: string }[]; consentement: boolean; statut: Statut; demo?: boolean;
}
export interface EntreeAnnuaire {
  id: string; typeProfil: string; nom: string; fonction?: string; organisme?: string; description: string;
  consentement: boolean; coordonneesAutorisees?: boolean;
  coordonnees?: { email?: string; telephone?: string };
  source?: string; dateValidation?: string; statut: Statut; demo?: boolean;
}
export interface Rubrique { slug: string; title: string; groupe: string; intro: string; themes: string[]; }
export interface SearchItem {
  id: string; kind: string; title: string; text: string; category: string; to: string; demo?: boolean;
}
