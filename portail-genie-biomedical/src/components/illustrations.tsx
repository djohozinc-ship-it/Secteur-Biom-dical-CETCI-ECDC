// Jeu d'icônes : style « outline » technique, trait 1.6, grille 24. Aucune illustration décorative.
const paths: Record<string, string> = {
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2-2z',
  monitor: 'M3 5h18v11H3zM8 20h8M12 16v4M6 11h3l1.5-3 2 5 1.5-2H18',
  chip: 'M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  book: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8',
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 12h8',
  drop: 'M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z',
  bolt: 'M13 3 5 14h6l-1 7 8-11h-6z',
  ruler: 'M3 15 15 3l6 6L9 21zM7 11l2 2M10 8l2 2M13 5l2 2',
  clipboard: 'M9 4h6v3H9zM6 6h12v15H6zM9 12h6M9 16h6',
  bed: 'M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5',
  building: 'M4 21V6l8-3 8 3v15M9 21v-5h6v5M12 8v4M10 10h4',
  network: 'M12 3.5a1.8 1.8 0 1 0 0 .01M5 19a1.8 1.8 0 1 0 0 .01M19 19a1.8 1.8 0 1 0 0 .01M12 7v5M12 12l-6 5M12 12l6 5',
  robot: 'M7 8h10v9H7zM12 4v4M10 12h.01M14 12h.01M9.5 15h5M5 12H3M21 12h-2',
  spark: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z',
  syringe: 'M14 4l6 6M12 6l6 6-8 8H6v-4zM4 20l3-3',
  steril: 'M5 9a7 7 0 0 1 14 0v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM9 14h6M12 11v6',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM16 16l5 5',
  arrow: 'M4 12h15M13 6l6 6-6 6',
  cap: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
};

export function Glyph({ name, size = 24 }: { name: keyof typeof paths | string; size?: number }) {
  return (
    <svg className="glyph" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] ?? paths.doc} />
    </svg>
  );
}

// Icône associée à chaque domaine du génie biomédical (par identifiant).
export const domainGlyph: Record<string, string> = {
  'maintenance-biomedicale': 'wrench',
  'ingenierie-hospitaliere': 'building',
  'dispositifs-medicaux': 'syringe',
  metrologie: 'ruler',
  'securite-electrique': 'bolt',
  'gestion-du-parc-biomedical': 'clipboard',
  'imagerie-medicale': 'scan',
  laboratoire: 'flask',
  'reanimation-soins-critiques': 'bed',
  'bloc-operatoire-anesthesie': 'pulse',
  dialyse: 'drop',
  sterilisation: 'steril',
  'technologies-numeriques-sante': 'network',
  'systemes-embarques-dispositifs-intelligents': 'chip',
  'robotique-medicale': 'robot',
  'ia-sante': 'spark',
};
