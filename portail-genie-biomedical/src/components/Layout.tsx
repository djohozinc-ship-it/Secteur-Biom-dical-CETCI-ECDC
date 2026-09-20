import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { site } from '../config/site';
import { rubriques } from '../utils/content';
import { Logo } from './ui';

const links = [
  { to: '/a-propos', label: 'À propos' },
  { to: '/membres', label: 'Membres' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/communiques', label: 'Communiqués' },
  { to: '/ressources', label: 'Ressources' },
  { to: '/projets', label: 'Projets' },
  { to: '/formations', label: 'Formations' },
  { to: '/opportunites', label: 'Opportunités' },
  ...(site.annuaireEnabled ? [{ to: '/annuaire', label: 'Annuaire' }] : []),
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setOpen(false); setSub(false); setSearching(false); }, [pathname]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand" aria-label={`${site.name} – accueil`}>
          <Logo />
          <span><strong>{site.name}</strong><small>{site.tagline}</small></span>
        </Link>
        <button className="icon-btn menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          {open ? 'Fermer' : 'Menu'}
        </button>
        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
          <div className="has-sub">
            <button className="nav-btn" aria-expanded={sub} aria-controls="sub-nav" onClick={() => setSub(!sub)}>
              Génie biomédical
            </button>
            <ul id="sub-nav" className={`sub-nav${sub ? ' is-open' : ''}`}>
              <li><NavLink to="/genie-biomedical" end>Toutes les rubriques</NavLink></li>
              {rubriques.map((r) => <li key={r.slug}><NavLink to={`/genie-biomedical/${r.slug}`}>{r.title}</NavLink></li>)}
            </ul>
          </div>
          {links.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          <button className="nav-btn" aria-expanded={searching} onClick={() => setSearching(!searching)}>Recherche</button>
        </nav>
      </div>
      {searching && (
        <form className="container header-search" role="search" onSubmit={submit}>
          <label className="sr-only" htmlFor="hs">Rechercher sur le portail</label>
          <input id="hs" autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher sur le portail" />
          <button className="btn" type="submit">Rechercher</button>
        </form>
      )}
    </header>
  );
}

function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{site.name}</p>
          <p>{site.description}</p>
        </div>
        <nav aria-label="Navigation secondaire">
          <p className="footer-title">Explorer</p>
          <ul>
            {links.slice(0, 8).map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="footer-title">Contact</p>
          <p>{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : 'Adresse de contact à renseigner.'}</p>
          {socials.length > 0 && (
            <ul className="inline-list">
              {socials.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>)}
            </ul>
          )}
          <ul className="inline-list">
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} {site.name}. Tous droits réservés.</div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip" href="#contenu" onClick={(e) => { e.preventDefault(); document.getElementById('contenu')?.focus(); }}>Aller au contenu</a>
      <Header />
      <main id="contenu" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  );
}
