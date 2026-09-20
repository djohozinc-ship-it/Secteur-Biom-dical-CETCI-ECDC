export interface Article {
  slug: string; title: string; date: string; category: string; summary: string;
  image?: string; rubrique?: string; demo: boolean; body: string;
}
export interface Communique {
  id: string; title: string; date: string; summary: string; content: string;
  category: string; pdf?: string; statut: 'publie' | 'brouillon'; demo?: boolean;
}
export interface Ressource {
  id: string; title: string; description: string; category: string;
  fileType: string; url?: string; source?: string; rubrique?: string; demo?: boolean;
}
export interface Projet {
  id: string; name: string; description: string; problem: string; objectives: string[];
  team: string[]; technologies: string[]; status: string; category: string;
  images?: string[]; links?: { label: string; url: string }[]; rubrique?: string; demo?: boolean;
}
export interface Formation {
  id: string; name: string; kind: 'Formation' | 'Établissement' | 'Formation complémentaire';
  description: string; url?: string; contact?: string; demo?: boolean;
}
export interface Opportunite {
  id: string; title: string; type: string; description: string; deadline?: string;
  source: string; url?: string; archived?: boolean; demo?: boolean;
}
export interface Membre {
  id: string; name: string; role: string; pole: string; bio: string; photo?: string;
  links?: { label: string; url: string }[]; consentement: boolean; demo?: boolean;
}
export interface EntreeAnnuaire {
  id: string; name: string; type: string; description: string; consentement: boolean; demo?: boolean;
}
export interface Rubrique { slug: string; title: string; intro: string; }
export interface SearchItem {
  id: string; kind: string; title: string; text: string; category: string; to: string; demo?: boolean;
}
