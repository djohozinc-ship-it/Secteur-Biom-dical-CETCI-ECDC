import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { asset, formatDate, initials } from '../utils/format';
import { renderMarkdown } from '../utils/content';
import { site } from '../config/site';

export function Logo({ inverse = false }: { inverse?: boolean }) {
  if (site.logo) return <img src={asset(site.logo)} alt="" width="44" height="44" className="logo-img" />;
  // Logo provisoire : à remplacer via site.logo dans src/config/site.ts
  const bg = inverse ? '#ffffff' : 'var(--blue)';
  const fg = inverse ? 'var(--blue)' : '#ffffff';
  return (
    <svg viewBox="0 0 64 64" width="42" height="42" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="4" fill={bg} />
      <path d="M27 12h10v15h15v10H37v15H27V37H12V27h15z" fill={fg} />
      <rect x="12" y="56" width="14" height="3" fill="var(--green)" />
    </svg>
  );
}

// Très petit repère aux couleurs du Bénin, utilisé avec parcimonie (hero, pied de page).
export function Mark3() {
  return <span className="mark3" aria-hidden="true"><i /><i /><i /></span>;
}

type FigureSlot = 'hero' | 'presentation' | 'innovation' | 'formation';
// Photographie éditoriale : ratio, légende et crédit homogènes. Sans photo, emplacement neutre.
export function Figure({ slot, ratio = 'wide' }: { slot: FigureSlot; ratio?: 'portrait' | 'wide' | 'thumb' }) {
  const img = site.images[slot];
  if (img.src) {
    return (
      <figure className={`fig fig-${ratio}`}>
        <div className="fig-frame"><img src={asset(img.src)} alt={img.alt} loading={slot === 'hero' ? 'eager' : 'lazy'} /></div>
        {(img.caption || img.credit) && <figcaption>{img.caption}{img.credit && <span className="fig-credit"> Crédit : {img.credit}</span>}</figcaption>}
      </figure>
    );
  }
  return (
    <figure className={`fig fig-${ratio} fig-empty`}>
      <div className="fig-frame" role="img" aria-label="Photographie à venir"><span>Photographie à venir</span></div>
    </figure>
  );
}

export function Badge({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'line' | 'ochre' | 'demo' | 'dark' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export const DemoBadge = () => <Badge tone="demo">Démonstration</Badge>;

export function PageHeader({ title, intro, crumbs, eyebrow }: { title: string; intro?: string; eyebrow?: string; crumbs?: { label: string; to?: string }[] }) {
  return (
    <header className="page-header">
      <div className="container">
        {crumbs && (
          <nav aria-label="Fil d'Ariane" className="crumbs">
            <ol>
              <li><Link to="/">Accueil</Link></li>
              {crumbs.map((c) => <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {intro && <p className="lead">{intro}</p>}
      </div>
    </header>
  );
}

export function Section({ title, eyebrow, to, linkLabel, children, tone = 'white', id }: {
  title: string; eyebrow?: string; to?: string; linkLabel?: string; children: ReactNode; tone?: 'white' | 'paper' | 'mist' | 'dark'; id?: string;
}) {
  const hid = `s-${id ?? title}`;
  return (
    <section className={`section section-${tone}`} aria-labelledby={hid} data-reveal>
      <div className="container">
        <div className="section-head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={hid}>{title}</h2>
          </div>
          {to && <Link className="more-link" to={to}>{linkLabel ?? 'Voir tout'} <span aria-hidden="true">→</span></Link>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty" role="status">
      <p className="empty-title">{title}</p>
      {children && <p>{children}</p>}
    </div>
  );
}

// Ligne éditoriale : date | contenu
export function DocRow({ to, date, tag, title, summary, meta, demo, aside }: {
  to?: string; date?: string; tag?: string; title: string; summary?: string; meta?: ReactNode; demo?: boolean; aside?: ReactNode;
}) {
  return (
    <article className="docrow">
      <div className="docrow-date">{date ? <time dateTime={date}>{formatDate(date)}</time> : <span aria-hidden="true">—</span>}</div>
      <div className="docrow-main">
        <div className="tags">{tag && <Badge>{tag}</Badge>}{demo && <DemoBadge />}</div>
        <h3>{to ? <Link to={to}>{title}</Link> : title}</h3>
        {summary && <p>{summary}</p>}
        {meta && <div className="meta">{meta}</div>}
      </div>
      {aside && <div className="docrow-aside">{aside}</div>}
    </article>
  );
}

export function Placeholder({ title, children, glyph }: { title: string; children: ReactNode; glyph?: ReactNode }) {
  return (
    <div className="placeholder">
      {glyph}
      <div><p className="placeholder-title">{title}</p><p>{children}</p></div>
    </div>
  );
}

export function SideFilter({ q, setQ, cat, setCat, categories, counts, catLabel = 'Catégories' }: {
  q: string; setQ: (v: string) => void; cat: string; setCat: (v: string) => void; categories: string[]; counts?: Record<string, number>; catLabel?: string;
}) {
  return (
    <aside className="side-filter" aria-label="Filtres">
      <label className="field"><span>Rechercher</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mots-clés" />
      </label>
      <p className="side-title" id="cat-title">{catLabel}</p>
      <ul className="cat-list" aria-labelledby="cat-title">
        <li><button className={!cat ? 'is-on' : ''} aria-pressed={!cat} onClick={() => setCat('')}>Toutes</button></li>
        {categories.map((c) => (
          <li key={c}><button className={cat === c ? 'is-on' : ''} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}{counts && <span className="count">{counts[c] ?? 0}</span>}</button></li>
        ))}
      </ul>
    </aside>
  );
}

export function ArchiveTabs({ archives, setArchives, labelLive = 'En cours' }: { archives: boolean; setArchives: (v: boolean) => void; labelLive?: string }) {
  return (
    <div className="tabs" role="group" aria-label="Affichage">
      <button className={!archives ? 'is-on' : ''} aria-pressed={!archives} onClick={() => setArchives(false)}>{labelLive}</button>
      <button className={archives ? 'is-on' : ''} aria-pressed={archives} onClick={() => setArchives(true)}>Archives</button>
    </div>
  );
}

export function Pager({ page, pages, setPage }: { page: number; pages: number; setPage: (n: number) => void }) {
  if (pages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pagination">
      <button className="btn btn-ghost" disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
      <span aria-live="polite">Page {page} sur {pages}</span>
      <button className="btn btn-ghost" disabled={page === pages} onClick={() => setPage(page + 1)}>Suivant</button>
    </nav>
  );
}

export function Avatar({ name, photo }: { name: string; photo?: string }) {
  return photo
    ? <img className="avatar" src={asset(photo)} alt={`Photo de ${name}`} loading="lazy" />
    : <div className="avatar avatar-initials" aria-hidden="true">{initials(name)}</div>;
}

export function Markdown({ source }: { source: string }) {
  // Le contenu vient de fichiers du projet (de confiance), pas de saisies de visiteurs.
  return <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(source) }} />;
}

export function ShareLinks({ title }: { title: string }) {
  const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : site.siteUrl);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${url}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${url}` },
  ];
  return (
    <div className="share"><span>Partager :</span>{links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}</div>
  );
}

export function FactList({ items }: { items: { label: string; value: ReactNode | undefined }[] }) {
  const shown = items.filter((i) => i.value);
  if (!shown.length) return null;
  return <dl className="facts">{shown.map((i) => <div key={i.label}><dt>{i.label}</dt><dd>{i.value}</dd></div>)}</dl>;
}
