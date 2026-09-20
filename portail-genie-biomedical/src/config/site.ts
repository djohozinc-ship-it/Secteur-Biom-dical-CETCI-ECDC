// ============================================================
// POINT CENTRAL DE CONFIGURATION
// Laissez vide ('' ou []) tout ce qui n'est pas encore officiel :
// le site n'affiche que ce qui est renseigné.
// ============================================================
export const site = {
  // --- Identité ---
  name: 'Portail du Génie Biomédical au Bénin', // nom d'affichage provisoire
  officialName: '', // nom officiel, quand il sera connu
  shortName: 'Génie biomédical Bénin',
  tagline: 'Maintenance, ingénierie hospitalière et innovation en santé',
  description:
    "Portail sectoriel consacré au génie biomédical au Bénin : actualités, communiqués, ressources techniques, projets, formations et opportunités.",
  organisme: 'CETCI / ECDC', // communauté porteuse du portail
  statutMention: "Initiative communautaire — ce portail n'est pas un site gouvernemental.",
  heroImage: '', // ex. 'images/accueil.jpg' (photo réelle dans public/). Vide = illustration originale provisoire
  heroImageAlt: '',
  logo: '', // ex. 'images/logo.svg' (fichier dans public/). Vide = logo générique
  siteUrl: 'https://djohozinc-ship-it.github.io/Secteur-Biom-dical-CETCI-ECDC/',

  // --- Coordonnées ---
  contact: { email: '', telephone: '', adresse: '' },
  externalFormUrl: '', // formulaire externe gratuit (facultatif)
  whatsapp: '', // ex. 22900000000 (indicatif + numéro, sans +)
  social: { facebook: '', linkedin: '', x: '', youtube: '' } as Record<string, string>,

  // --- Liens et partenaires (uniquement s'ils sont confirmés) ---
  liensInstitutionnels: [] as { label: string; url: string }[],
  partenaires: [] as { nom: string; url?: string; logo?: string }[],

  // --- Indicateurs : uniquement des chiffres VÉRIFIÉS, avec leur source ---
  // ex. { label: 'Établissements recensés', valeur: '12', source: 'Nom de la source', url: 'https://...' }
  indicateurs: [] as { label: string; valeur: string; source: string; url?: string }[],

  // --- Interrupteurs ---
  annuaireEnabled: false, // annuaire masqué tant qu'il n'y a pas d'autorisation
  showDemo: false, // true = affiche les contenus fictifs de src/data/demo/ (mode démonstration)
};
