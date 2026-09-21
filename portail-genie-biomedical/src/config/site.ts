import type { HeroSlide } from '../types';

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
  seoTitle: 'Secteur biomédical CETCI | Génie biomédical au Bénin', // titre affiché dans Google et l'onglet pour la page d'accueil (≈ 60 caractères max)
  description:
    "Portail du secteur biomédical du CETCI / ECDC : actualités, ressources techniques, projets, formations et opportunités du génie biomédical au Bénin.",
  organisme: 'CETCI / ECDC', // communauté porteuse du portail
  statutMention: "Initiative communautaire — ce portail n'est pas un site gouvernemental.",
  // Diaporama de l'accueil (photos dans public/images/). Les actualités qui ont une image s'ajoutent automatiquement.
  heroSlides: [
    {
      image: 'images/equipe-secteur-biomedical.jpg',
      alt: "Photo de groupe : une douzaine de jeunes en polos bleu clair, alignés devant un tableau blanc dans une salle aux murs verts",
      position: '50% 46%',
      kicker: 'Communauté',
      title: 'La communauté du secteur biomédical',
      text: 'Un portail pour informer, partager, valoriser et relier les acteurs du génie biomédical au Bénin.',
      cta: { label: 'Découvrir le portail', to: '/a-propos' },
      credit: '',
      // --- Ajouter une vidéo à cette diapositive (voir public/videos/README.txt) : décommenter UNE des lignes ---
      // video: { src: 'videos/presentation.mp4' },       // vidéo d'arrière-plan courte, sans son (la photo sert d'affiche)
      // youtube: 'https://youtu.be/XXXXXXXXXXX',          // bouton « Regarder la vidéo » (avec son), hébergée sur YouTube
    },
  ] as HeroSlide[],

  // Autres photographies éditoriales. Tant que 'src' est vide, un emplacement neutre s'affiche.
  images: {
    presentation: { src: '', alt: '', caption: '', credit: '' },
    innovation: { src: '', alt: '', caption: '', credit: '' },
    formation: { src: '', alt: '', caption: '', credit: '' },
  } as Record<'presentation' | 'innovation' | 'formation', { src: string; alt: string; caption: string; credit: string }>,
  logo: 'images/logo-secteur-biomedical.png', // logo du secteur biomédical (fichier dans public/). Vide = logo générique
  organismeNom: "Centre d'Élaboration des Technologies de Conception en Ingénierie", // nom développé de l'organisme porteur
  organismeLogo: 'images/logo-cetci.png', // logo du CETCI (fond transparent, pour le pied de page)
  // Annonce affichée dans le bandeau du haut (laisser texte vide pour n'afficher que la mention de statut)
  annonce: { texte: '', to: '' },
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
