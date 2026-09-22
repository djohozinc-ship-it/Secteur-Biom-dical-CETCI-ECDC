import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { site } from '../config/site';
import { rubriques } from '../utils/content';
import { Logo, Mark3 } from './ui';
import { Glyph } from './illustrations';
import { asset } from '../utils/format';
import { useReveal } from '../hooks/useReveal';
import { resourceCategories } from '../utils/taxonomy';

interface Item { to: string; label: string }
interface Group { label: string; to?: string; items?: Item[]; mega?: boolean }

const groups: Group[] = [
  { label: 'Le portail', items: [
    { to: '/a-propos', label: 'À propos' },
    { to: '/membres', label: 'Membres' },
    ...(site.annuaireEnabled ? [{ to: '/annuaire', label: 'Annuaire' }] : []),
    { to: '/contact', label: 'Contact et contribution' },
  ] },
  { label: 'Génie biomédical', mega: true },
  { label: 'Publications', items: [
    { to: '/actualites', label: 'Actualités' },
    { to: '/communiques', label: 'Communiqués' },
    { to: '/ressources', label: 'Ressources techniques' },
  ] },
  { label: 'Projets', to: '/projets' },
  { label: 'Se former', items: [
    { to: '/formations', label: 'Formations et établissements' },
    { to: '/opportunites', label: 'Opportunités' },
  ] },
];

function Header() {
  const [menu, setMenu] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => { setMenu(false); setOpenGroup(null); setSearching(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpenGroup(null); setSearching(false); } };
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, []);

  const submit = (e: FormEvent) => { e.preventDefault(); navigate(`/recherche?q=${encodeURIComponent(q)}`); };
  const isCurrent = (g: Group) => g.mega ? pathname.startsWith('/genie-biomedical') : (g.items ?? []).some((i) => pathname.startsWith(i.to));
  const groupes = Array.from(new Set(rubriques.map((r) => r.groupe)));

  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          {site.annonce.texte ? (
            <span className="announce"><Glyph name="megaphone" size={16} />{site.annonce.to ? <Link to={site.annonce.to}>{site.annonce.texte}</Link> : site.annonce.texte}</span>
          ) : <span>{site.statutMention}</span>}
          <Link to="/contact">Contact</Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-row">
          <Link to="/" className="brand" aria-label={`${site.name} – accueil`}>
            <Logo />
            {site.logo && <span className="brand-sep" aria-hidden="true" />}
            <span className="brand-text">
              {site.organisme && !site.logo && <span className="brand-org">{site.organisme}</span>}
              <strong>{site.officialName || site.name}</strong>
            </span>
          </Link>
          <button className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu(!menu)}>
            <span aria-hidden="true" className="burger" />{menu ? 'Fermer' : 'Menu'}
          </button>
          <nav id="main-nav" ref={navRef} className={`main-nav${menu ? ' is-open' : ''}`} aria-label="Navigation principale">
            {groups.map((g) => g.to ? (
              <NavLink key={g.label} to={g.to} className="nav-link">{g.label}</NavLink>
            ) : (
              <div key={g.label} className={`has-panel${g.mega ? ' has-mega' : ''}`}>
                <button className={`nav-link${isCurrent(g) ? ' is-current' : ''}`} aria-expanded={openGroup === g.label} onClick={() => setOpenGroup(openGroup === g.label ? null : g.label)}>
                  {g.label}<span aria-hidden="true" className="caret" />
                </button>
                <div className={`panel${g.mega ? ' panel-mega' : ''}${openGroup === g.label ? ' is-open' : ''}`}>
                  {g.mega ? (
                    <>
                      <div className="mega-cols">
                        {groupes.map((gr) => (
                          <div key={gr}>
                            <p className="panel-title">{gr}</p>
                            <ul>{rubriques.filter((r) => r.groupe === gr).map((r) => <li key={r.slug}><Link to={`/genie-biomedical/${r.slug}`}>{r.title}</Link></li>)}</ul>
                          </div>
                        ))}
                      </div>
                      <Link className="more-link" to="/genie-biomedical">Tous les domaines <span aria-hidden="true">→</span></Link>
                    </>
                  ) : (
                    <ul>{g.items!.map((i) => <li key={i.to}><NavLink to={i.to}>{i.label}</NavLink></li>)}</ul>
                  )}
                </div>
              </div>
            ))}
            <button className="nav-link nav-search" aria-expanded={searching} onClick={() => setSearching(!searching)}>Rechercher</button>
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
    </>
  );
}

function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  const { email, telephone, adresse } = site.contact;
  return (
    <footer className="site-footer">
      <div className="container footer-id">
        <div className="footer-brand">
          {site.organismeLogo ? <img className="footer-logo" src={asset(site.organismeLogo)} alt={`Logo ${site.organisme}`} /> : <Logo inverse />}
          <div>
            <p className="footer-name">{site.officialName || site.name}</p>
            {site.organisme && <p className="footer-org"><Mark3 /> Porté par {site.organisme}</p>}
            {site.organismeNom && <p className="footer-orgfull">{site.organismeNom}</p>}
          </div>
        </div>
        <p className="footer-status">{site.statutMention} Les informations officielles seront publiées lorsqu'elles seront établies et vérifiées.</p>
      </div>
      <div className="container footer-grid">
        <nav aria-label="Le portail">
          <p className="footer-title">Le portail</p>
          <ul>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/membres">Membres</Link></li>
            <li><Link to="/genie-biomedical">Génie biomédical</Link></li>
            <li><Link to="/projets">Projets et innovations</Link></li>
            <li><Link to="/recherche">Recherche</Link></li>
          </ul>
        </nav>
        <nav aria-label="Publications">
          <p className="footer-title">Publications</p>
          <ul>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/communiques">Communiqués</Link></li>
            <li><Link to="/formations">Formations et établissements</Link></li>
            <li><Link to="/opportunites">Opportunités</Link></li>
          </ul>
        </nav>
        <nav aria-label="Ressources">
          <p className="footer-title">Ressources</p>
          <ul>
            {resourceCategories.slice(0, 5).map((c) => <li key={c.label}><Link to={`/ressources?cat=${encodeURIComponent(c.label)}`}>{c.label}</Link></li>)}
            <li><Link to="/ressources">Tout le catalogue</Link></li>
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
          ) : <p>Coordonnées à venir.</p>}
          <p><Link to="/contact">Contact et contribution</Link></p>
          {socials.length > 0 && <ul className="inline-list">{socials.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n}</a></li>)}</ul>}
          {site.liensInstitutionnels.length > 0 && (
            <ul>{site.liensInstitutionnels.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul>
          )}
        </div>
      </div>
      {site.partenaires.length > 0 && (
        <div className="container footer-partners">
          <p className="footer-title">Partenaires</p>
          <ul className="inline-list">{site.partenaires.map((p) => <li key={p.nom}>{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer">{p.nom}</a> : p.nom}</li>)}</ul>
        </div>
      )}
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.officialName || site.name}</span>
        <span><Link to="/mentions-legales">Mentions légales</Link> · <Link to="/confidentialite">Confidentialité</Link> · <Link to="/conditions-utilisation">Conditions d’utilisation</Link> · <Link to="/propriete-intellectuelle">Propriété intellectuelle</Link></span>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useReveal(pathname);
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
