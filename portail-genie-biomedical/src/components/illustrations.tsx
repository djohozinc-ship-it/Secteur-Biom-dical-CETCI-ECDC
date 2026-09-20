// Illustrations ORIGINALES (dessins vectoriels), utilisées tant qu'aucune photo réelle n'est fournie.
// Elles ne représentent aucune institution, aucun équipement de marque, aucune personne réelle.
export function HeroIllustration() {
  return (
    <svg className="hero-illus" viewBox="0 0 520 380" role="img" aria-label="Illustration : moniteur de surveillance, pompe de perfusion et circuit électronique">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* circuit */}
        <g opacity=".45">
          <path d="M20 330h120l30-30h90M20 290h70l30-30M300 330h80l30-40h90M330 60h70l30 30h70" />
          <circle cx="20" cy="330" r="5" /><circle cx="20" cy="290" r="5" /><circle cx="490" cy="290" r="5" /><circle cx="490" cy="60" r="5" />
        </g>
        {/* moniteur */}
        <rect x="120" y="70" width="250" height="170" rx="14" />
        <rect x="136" y="86" width="218" height="120" rx="6" />
        <path d="M150 150h38l12-30 20 62 18-44 12 12h104" stroke="var(--accent-light)" strokeWidth="3" />
        <path d="M150 226h60M150 236h36" opacity=".6" />
        <path d="M245 240v34M205 284h80M215 274h60" />
        {/* potence et pompe */}
        <path d="M430 110v200M400 310h60" />
        <rect x="405" y="140" width="50" height="62" rx="8" />
        <rect x="415" y="152" width="30" height="16" rx="3" />
        <circle cx="430" cy="185" r="5" />
        <path d="M430 110c0-24-24-24-24-8v22M406 124c0 40 0 50 30 80" opacity=".7" />
        {/* croix */}
        <rect x="40" y="70" width="64" height="64" rx="14" fill="var(--accent-light)" stroke="none" />
        <path d="M65 84h14v13h13v14H79v13H65v-13H52V97h13z" fill="var(--petrol)" stroke="none" />
      </g>
    </svg>
  );
}

const paths: Record<string, string> = {
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2-2z',
  monitor: 'M3 5h18v11H3zM8 20h8M12 16v4M6 11h3l1.5-3 2 5 1.5-2H18',
  chip: 'M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  book: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11',
  flask: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8',
};

export function Glyph({ name }: { name: keyof typeof paths | string }) {
  return (
    <svg className="glyph" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] ?? paths.doc} />
    </svg>
  );
}
