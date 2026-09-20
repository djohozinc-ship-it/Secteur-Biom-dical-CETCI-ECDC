import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { asset, formatDate, initials } from '../utils/format';
import { renderMarkdown } from '../utils/content';

export function Logo() {
  return (
    <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="12" fill="var(--blue)" />
      <path d="M27 14h10v13h13v10H37v13H27V37H14V27h13z" fill="#fff" />
      <circle cx="32" cy="32" r="4" fill="var(--teal)" />
    </svg>
  );
}

export function DemoBadge() {
  return <span className="badge badge-demo">Démo</span>;
}

export function PageHeader({ title, intro, crumbs }: { title: string; intro?: string; crumbs?: { label: string; to?: string }[] }) {
  return (
    <header className="page-header">
      <div className="container">
        {crumbs && (
          <nav aria-label="Fil d'Ariane" className="crumbs">
            <Link to="/">Accueil</Link>
            {crumbs.map((c) => (
              <span key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</span>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {intro && <p className="lead">{intro}</p>}
      </div>
    </header>
  );
}

export function Section({ title, to, linkLabel, children, tone }: { title: string; to?: string; linkLabel?: string; children: ReactNode; tone?: 'mist' }) {
  return (
    <section className={`section${tone ? ` section-${tone}` : ''}`} aria-labelledby={`s-${title}`}>
      <div className="container">
        <div className="section-head">
          <h2 id={`s-${title}`}>{title}</h2>
          {to && <Link className="text-link" to={to}>{linkLabel ?? 'Voir tout'}</Link>}
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

export function Card({ to, image, tag, date, title, summary, demo, footer }: {
  to?: string; image?: string; tag?: string; date?: string; title: string; summary?: string; demo?: boolean; footer?: ReactNode;
}) {
  const body = (
    <>
      {image && <img className="card-img" src={asset(image)} alt="" loading="lazy" />}
      <div className="card-body">
        <div className="card-meta">
          {tag && <span className="badge">{tag}</span>}
          {demo && <DemoBadge />}
          {date && <time dateTime={date}>{formatDate(date)}</time>}
        </div>
        <h3>{title}</h3>
        {summary && <p>{summary}</p>}
        {footer}
      </div>
    </>
  );
  return <article className="card">{to ? <Link to={to} className="card-link">{body}</Link> : body}</article>;
}

export function Grid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  return <div className={`grid grid-${cols}`}>{children}</div>;
}

export function FilterBar({ q, setQ, cat, setCat, categories, label = 'Toutes les catégories' }: {
  q: string; setQ: (v: string) => void; cat: string; setCat: (v: string) => void; categories: string[]; label?: string;
}) {
  return (
    <div className="filter" role="search">
      <label className="field">
        <span>Rechercher</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mots-clés" />
      </label>
      <label className="field">
        <span>Catégorie</span>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">{label}</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
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
  const url = encodeURIComponent(window.location.href);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${url}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${t}&url=${url}` },
  ];
  return (
    <div className="share">
      <span>Partager :</span>
      {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
    </div>
  );
}
