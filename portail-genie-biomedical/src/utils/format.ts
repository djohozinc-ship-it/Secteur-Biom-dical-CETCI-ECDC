export const formatDate = (d?: string): string => {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Chemin d'un fichier de /public, valable aussi dans un sous-dossier GitHub Pages.
export const asset = (path: string): string =>
  /^(https?:|mailto:|data:)/.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const normalize = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const initials = (name: string): string =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('');

export const isExpired = (deadline?: string): boolean =>
  !!deadline && new Date(deadline).getTime() < new Date().setHours(0, 0, 0, 0);
