// Catégories proposées pour classer les contenus. Ce sont des libellés, pas des données.
export const resourceCategories: { label: string; desc: string }[] = [
  { label: 'Fiches techniques', desc: "Description d'un équipement : caractéristiques, consignes." },
  { label: 'Guides', desc: 'Méthodes pas à pas pour une activité précise.' },
  { label: 'Tutoriels', desc: 'Apprentissage guidé, du plus simple au plus avancé.' },
  { label: 'Supports pédagogiques', desc: 'Cours, présentations et supports de formation.' },
  { label: 'Modèles de maintenance', desc: 'Fiches et registres à adapter à un établissement.' },
  { label: 'Check-lists', desc: 'Listes de contrôle pour les vérifications courantes.' },
  { label: 'Documents réglementaires', desc: 'Textes officiels, avec leur source.' },
  { label: 'Références normatives', desc: 'Normes et recommandations, lorsque leur diffusion est autorisée.' },
  { label: 'Articles scientifiques', desc: 'Publications de recherche, avec référence complète.' },
  { label: 'Liens officiels', desc: "Renvois vers des ressources d'organismes reconnus." },
];

export const opportunityTypes: { label: string; desc: string }[] = [
  { label: 'Bourses', desc: "Financement d'études ou de recherche." },
  { label: 'Stages', desc: 'Immersion en établissement ou en entreprise.' },
  { label: 'Emplois', desc: 'Offres de postes du secteur.' },
  { label: 'Concours', desc: 'Concours et prix scientifiques.' },
  { label: 'Conférences', desc: 'Colloques, congrès et rencontres.' },
  { label: 'Appels à projets', desc: 'Financements et programmes ouverts.' },
  { label: 'Formations', desc: 'Sessions de formation continue.' },
];

export const contributionModes: { key: string; label: string; desc: string; subject: string }[] = [
  { key: 'article', label: 'Proposer un article', desc: 'Un texte, une analyse ou un retour d\'expérience, avec vos sources.', subject: 'Proposer un article' },
  { key: 'projet', label: 'Soumettre un projet', desc: 'Un prototype, un travail de recherche ou une solution numérique.', subject: 'Soumettre un projet' },
  { key: 'ressource', label: 'Signaler une ressource', desc: 'Un document ou un lien utile, dont la diffusion est autorisée.', subject: 'Signaler une ressource' },
  { key: 'partenariat', label: 'Proposer un partenariat', desc: 'Une collaboration avec un établissement, une entreprise ou une association.', subject: 'Proposer un partenariat' },
];
