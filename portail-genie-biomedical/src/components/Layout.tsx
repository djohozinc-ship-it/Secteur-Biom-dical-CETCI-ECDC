import { useEffect, useRef, useState, type FormEvent } from 'react';
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
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setSub(false); setSearching(false); }, [pathname]);

  // Échap ferme les menus ; un clic à l'extérieur ferme le sous-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSub(false); setSearching(false); } };
    const onClick = (e: MouseEvent) => { if (subRef.current && !subRef.current.contains(e.target as Node)) setSub(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/recherche?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-row">
          <span>{site.organisme || 'Portail sectoriel du génie biomédical au Bénin'}</span>
          <Link to="/recherche">Recherche</Link>
        </div>
      </div>
      <div className="container header-row">
        <Link to="/" className="brand" aria-label={`${site.name} – accueil`}>
          <Logo />
          <span><strong>{site.officialName || site.name}</strong><small>{site.tagline}</small></span>
        </Link>
        <button className="icon-btn menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
          {open ? 'Fermer' : 'Menu'}
        </button>
        <nav id="main-nav" className={`main-nav${open ? ' is-open' : ''}`} aria-label="Navigation principale">
          <div className="has-sub" ref={subRef}>
            <button className="nav-btn" aria-expanded={sub} aria-controls="sub-nav" onClick={() => setSub(!sub)}>
              Génie biomédical
            </button>
            <ul id="sub-nav" className={`sub-nav${sub ? ' is-open' : ''}`}>
              <li><NavLink to="/genie-biomedical" end>Tous les domaines</NavLink></li>
              {rubriques.map((r) => <li key={r.slug}><NavLink to={`/genie-biomedical/${r.slug}`}>{r.title}</NavLink></li>)}
            </ul>
          </div>
          {links.map((l) => <NavLink key={l.to} to={l.to}>{l.label}</NavLink>)}
          <button className="nav-btn" aria-expanded={searching} onClick={() => setSearching(!searching)}>Rechercher</button>
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
  const { email, telephone, adresse } = site.contact;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{site.officialName || site.name}</p>
          {site.organisme && <p><strong>{site.organisme}</strong></p>}
          <p>{site.description}</p>
        </div>
        <nav aria-label="Navigation secondaire">
          <p className="footer-title">Explorer</p>
          <ul>
            <li><Link to="/genie-biomedical">Génie biomédical</Link></li>
            {links.slice(0, -1).map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <p className="footer-title">Contact</p>
          {email || telephone || adresse ? (
            <address>
              {email && <div><a href={`mailto:${email}`}>{email}</a></div>}
              {telephone && <div>{telephone}</div>}
              {adresse && <div>{adresse}</div>}
            </address>
          ) : <p>Coordonnées à venir. <Link to="/contact">Page contact</Link></p>}
          {socials.length > 0 && (
            <ul className="inline-list">
              {socials.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></li>)}
            </ul>
          )}
        </div>
        {site.liensInstitutionnels.length > 0 && (
          <div>
            <p className="footer-title">Liens institutionnels</p>
            <ul>{site.liensInstitutionnels.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul>
          </div>
        )}
      </div>
      {site.partenaires.length > 0 && (
        <div className="container footer-partners">
          <p className="footer-title">Partenaires</p>
          <ul className="inline-list">{site.partenaires.map((p) => <li key={p.nom}>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer">{p.nom}</a> : p.nom}</li>)}</ul>
        </div>
      )}
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.officialName || site.name}.</span>
        <span><Link to="/mentions-legales">Mentions légales</Link> · <Link to="/confidentialite">Confidentialité</Link></span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip" href="#contenu" onClick={(e) => { e.preventDefault(); document.getElementById('contenu')?.focus(); }}>Aller au contenu</a>
      {site.showDemo && <div className="demo-banner" role="note">Mode démonstration : les contenus marqués « Démonstration » sont fictifs et ne constituent pas des informations officielles.</div>}
      <Header />
      <main id="contenu" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  );
}
