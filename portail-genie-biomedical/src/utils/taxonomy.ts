// Catégories proposées pour classer les contenus. Ce sont des libellés, pas des données.
export const resourceCategories: { label: string; desc: string }[] = [
  { label: 'Cours', desc: 'Cours et supports de formation en génie biomédical.' },
  { label: 'Vidéos de découverte', desc: 'Courtes vidéos où chaque membre présente son sujet à un public débutant.' },
  { label: 'Fiches techniques', desc: "Description d'un équipement : caractéristiques, consignes." },
  { label: 'Guides', desc: 'Méthodes pas à pas pour une activité précise.' },
  { label: 'Tutoriels', desc: 'Apprentissage guidé, du plus simple au plus avancé.' },
  { label: 'Modèles de maintenance', desc: 'Fiches et registres de suivi à adapter.' },
  { label: 'Check-lists', desc: 'Listes de contrôle pour les vérifications courantes.' },
  { label: 'Normes et références', desc: 'Normes et textes de référence, lorsque leur diffusion est autorisée.' },
  { label: 'Articles scientifiques', desc: 'Publications de recherche, avec référence complète.' },
];

export const opportunityTypes: { label: string; desc: string }[] = [
  { label: 'Bourses', desc: "Financement d'études ou de recherche." },
  { label: 'Stages', desc: 'Immersion en établissement ou en entreprise.' },
  { label: 'Emplois', desc: 'Offres d\'emploi en génie biomédical.' },
  { label: 'Concours', desc: 'Concours et prix scientifiques.' },
  { label: 'Conférences', desc: 'Colloques, congrès et rencontres.' },
  { label: 'Appels à projets', desc: 'Financements et programmes ouverts aux étudiants.' },
  { label: 'Formations', desc: 'Sessions de formation continue.' },
];

export const contributionModes: { key: string; label: string; desc: string; subject: string }[] = [
  { key: 'question', label: 'Poser une question', desc: 'Sur le secteur, ses projets ou ses activités.', subject: 'Question sur le secteur' },
  { key: 'projet', label: 'Proposer un projet commun', desc: 'Un besoin de santé, un prototype ou une idée à développer ensemble.', subject: 'Proposer un projet commun' },
  { key: 'partenariat', label: 'Proposer un partenariat', desc: 'Une collaboration avec un établissement, une entreprise ou une association.', subject: 'Proposer un partenariat' },
  { key: 'rejoindre', label: 'Rejoindre le secteur', desc: 'Étudiants en génie biomédical ou en santé, intéressés par nos activités.', subject: 'Rejoindre le secteur' },
];
