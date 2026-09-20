// Point unique de configuration : modifiez ce fichier pour personnaliser le site.
export const site = {
  name: 'Portail Génie Biomédical Bénin', // nom provisoire
  shortName: 'GBB',
  tagline: 'Maintenance, ingénierie hospitalière et innovation en santé',
  description:
    "Portail communautaire consacré au génie biomédical : actualités, ressources techniques, projets, formations et opportunités.",
  // Coordonnées : laissez vide tant qu'elles ne sont pas confirmées.
  email: '',
  externalFormUrl: '', // ex. lien d'un Google Forms gratuit
  whatsapp: '', // ex. 22900000000 (indicatif + numéro, sans +)
  social: { facebook: '', linkedin: '', x: '', youtube: '' } as Record<string, string>,
  // L'annuaire reste masqué tant que les autorisations ne sont pas obtenues.
  annuaireEnabled: false,
};
