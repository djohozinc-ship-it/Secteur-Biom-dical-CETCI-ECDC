import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles, communiques, formations, isArchived, opportunites, projets, ressources, rubriques } from '../utils/content';
import { Badge, DemoBadge, DocRow, Figure, Mark3, Placeholder } from '../components/ui';
import { Glyph, domainGlyph } from '../components/illustrations';
import { contributionModes, opportunityTypes, resourceCategories } from '../utils/taxonomy';
import { asset, dayMonth, daysUntil, formatDate } from '../utils/format';

const quick = [
  { to: '/actualites', label: 'Actualités', icon: 'doc' },
  { to: '/ressources', label: 'Ressources techniques', icon: 'book' },
  { to: '/formations', label: 'Formations', icon: 'cap' },
  { to: '/opportunites', label: 'Opportunités', icon: 'calendar' },
];

const principes = [
  { t: 'Informer', d: "Rassembler les informations utiles aux professionnels et aux étudiants du secteur." },
  { t: 'Partager', d: "Mettre à disposition des ressources techniques dont la diffusion est autorisée, avec leur source." },
  { t: 'Valoriser', d: "Faire connaître les projets, les prototypes et les compétences du secteur au Bénin." },
  { t: 'Relier', d: "Faciliter les échanges entre étudiants, techniciens, ingénieurs, établissements et partenaires." },
];

export default function Home() {
  usePageMeta();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const news = articles.filter((a) => a.statut === 'publie');
  const [main, ...others] = news;
  const comm = communiques.filter((c) => c.statut === 'publie').slice(0, 3);
  const opps = opportunites.filter((o) => !isArchived(o)).sort((a, b) => (a.dateLimite ?? '9999').localeCompare(b.dateLimite ?? '9999')).slice(0, 3);
  const groupes = Array.from(new Set(rubriques.map((r) => r.groupe)));
  const featured = projets[0];
  const search = (e: FormEvent) => { e.preventDefault(); navigate(`/recherche?q=${encodeURIComponent(q)}`); };

  return (
    <>
      {/* 2. Hero éditorial */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="kicker"><Mark3 /> Portail sectoriel{site.organisme ? ` · ${site.organisme}` : ''}</p>
            <h1 id="hero-title">Le génie biomédical au service de la santé au Bénin</h1>
            <p className="lead">{site.description}</p>
            <div className="btn-row">
              <Link className="btn" to="/genie-biomedical">Explorer les domaines</Link>
              <Link className="btn btn-ghost" to="/a-propos">Présentation du portail</Link>
            </div>
          </div>
          <Figure slot="hero" ratio="portrait" />
        </div>
        <nav className="quick-strip" aria-label="Accès rapides">
          <ul className="container">
            {quick.map((q2) => (
              <li key={q2.to}><Link to={q2.to}><Glyph name={q2.icon} /><span>{q2.label}</span><Glyph name="arrow" size={18} /></Link></li>
            ))}
          </ul>
        </nav>
      </section>

      {/* 3. Présentation */}
      <section className="section intro" aria-labelledby="intro-title" data-reveal>
        <div className="container intro-grid">
          <div className="intro-lead">
            <p className="eyebrow">Le secteur</p>
            <h2 id="intro-title">Des compétences techniques au cœur des soins</h2>
            <p className="statement">Le génie biomédical réunit les compétences qui permettent de choisir, installer, utiliser et maintenir en sécurité les équipements de santé.</p>
            <p>Ce portail rassemble, avec leurs sources, les informations utiles aux étudiants, techniciens, ingénieurs et établissements du Bénin.</p>
            <ol className="principles">
              {principes.map((p, i) => (
                <li key={p.t}><span className="num" aria-hidden="true">0{i + 1}</span><div><h3>{p.t}</h3><p>{p.d}</p></div></li>
              ))}
            </ol>
          </div>
          <Figure slot="presentation" ratio="portrait" />
        </div>
      </section>

      {/* 4. Domaines */}
      <section className="section section-gray" aria-labelledby="dom-title" data-reveal>
        <div className="container">
          <div className="head-row">
            <div><p className="eyebrow">Domaines</p><h2 id="dom-title">Les domaines du génie biomédical</h2></div>
            <Link className="more-link" to="/genie-biomedical">Tous les domaines <span aria-hidden="true">→</span></Link>
          </div>
          <div className="domain-cols">
            {groupes.map((g, gi) => (
              <div key={g} className="domain-col">
                <h3><span className="num" aria-hidden="true">0{gi + 1}</span>{g}</h3>
                <ul>
                  {rubriques.filter((r) => r.groupe === g).map((r) => (
                    <li key={r.slug}><Link to={`/genie-biomedical/${r.slug}`}><Glyph name={domainGlyph[r.slug] ?? 'doc'} size={20} /><span>{r.title}</span></Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Actualités + communiqués + échéances */}
      <section className="section" aria-labelledby="news-title" data-reveal>
        <div className="container">
          <div className="head-row">
            <div><p className="eyebrow">Actualités</p><h2 id="news-title">À la une</h2></div>
            <Link className="more-link" to="/actualites">Toutes les actualités <span aria-hidden="true">→</span></Link>
          </div>
          {main ? (
            <div className="lead-grid">
              <article className="lead-story">
                {main.image && <figure className="fig fig-wide"><div className="fig-frame"><img src={asset(main.image)} alt={main.imageAlt ?? ''} loading="lazy" /></div></figure>}
                <div className="tags"><Badge>{main.category}</Badge>{main.demo && <DemoBadge />}</div>
                <h3><Link to={`/actualites/${main.slug}`}>{main.title}</Link></h3>
                <p>{main.summary}</p>
                <p className="meta"><time dateTime={main.date}>{formatDate(main.date)}</time>{main.source && <span> · Source : {main.source}</span>}</p>
              </article>
              <div className="brief-list" aria-label="Autres actualités">
                {others.slice(0, 3).map((a) => (
                  <article key={a.slug} className="brief">
                    <time dateTime={a.date}>{formatDate(a.date)}</time>
                    <h3><Link to={`/actualites/${a.slug}`}>{a.title}</Link></h3>
                    <p className="meta">{a.category}{a.demo && ' · Démonstration'}</p>
                  </article>
                ))}
                {others.length === 0 && <p className="muted">Pas d'autre actualité pour le moment.</p>}
              </div>
            </div>
          ) : (
            <Placeholder glyph={<Glyph name="doc" size={30} />} title="La première actualité sera publiée ici">
              Chaque actualité indique sa date et sa source.
            </Placeholder>
          )}

          <div className="info-band">
            <div>
              <h3 className="band-title">Communiqués</h3>
              {comm.length ? comm.map((c) => (
                <DocRow key={c.id} to={`/communiques/${c.id}`} date={c.date} tag={c.category} title={c.title} demo={c.demo} aside={c.pdf ? <span className="pdf">PDF</span> : undefined} />
              )) : <p className="muted">Aucun communiqué publié pour le moment.</p>}
              <p><Link className="more-link" to="/communiques">Tous les communiqués <span aria-hidden="true">→</span></Link></p>
            </div>
            <div>
              <h3 className="band-title">Prochaines échéances</h3>
              {opps.length ? opps.map((o) => {
                const { day, month } = dayMonth(o.dateLimite);
                const left = daysUntil(o.dateLimite);
                return (
                  <article key={o.id} className="deadline">
                    <div className="deadline-date" aria-hidden="true"><strong>{day}</strong><span>{month}</span></div>
                    <div>
                      <div className="tags"><Badge tone="line">{o.type}</Badge>{o.demo && <DemoBadge />}</div>
                      <h4>{o.title}</h4>
                      <p className="meta">{o.organisme ? `${o.organisme} · ` : ''}{o.dateLimite ? `Date limite : ${formatDate(o.dateLimite)}${left !== null ? ` (${left} j)` : ''}` : 'Sans date limite connue'}</p>
                    </div>
                  </article>
                );
              }) : <p className="muted">Aucune opportunité en cours pour le moment.</p>}
              <p><Link className="more-link" to="/opportunites">Toutes les opportunités <span aria-hidden="true">→</span></Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Recherche / connaissance */}
      <section className="search-band" aria-labelledby="search-title" data-reveal>
        <div className="container search-grid">
          <div>
            <p className="eyebrow eyebrow-light">Connaissance</p>
            <h2 id="search-title">Retrouver une information</h2>
            <p>Une recherche unique parcourt les actualités, communiqués, ressources, projets, formations et opportunités publiés.</p>
          </div>
          <div>
            <form role="search" className="search-form" onSubmit={search}>
              <label className="sr-only" htmlFor="home-q">Rechercher sur le portail</label>
              <input id="home-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex. maintenance préventive, autoclave, bourse" />
              <button className="btn btn-light" type="submit">Rechercher</button>
            </form>
            <ul className="search-tags">
              {resourceCategories.slice(0, 5).map((c) => <li key={c.label}><Link to={`/ressources?cat=${encodeURIComponent(c.label)}`}>{c.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Innovation */}
      <section className="section section-gray" aria-labelledby="innov-title" data-reveal>
        <div className="container innov-grid">
          <Figure slot="innovation" ratio="wide" />
          <div>
            <p className="eyebrow">Innovation</p>
            <h2 id="innov-title">Projets et innovations</h2>
            {featured ? (
              <>
                <div className="tags"><Badge tone="line">{featured.status}</Badge>{featured.demo && <DemoBadge />}</div>
                <h3 className="innov-name"><Link to={`/projets/${featured.id}`}>{featured.name}</Link></h3>
                <p>{featured.description}</p>
                <p className="meta">Technologies : {featured.technologies.join(', ')}</p>
              </>
            ) : (
              <>
                <p>Prototypes d'étudiants, dispositifs conçus localement, travaux de recherche, solutions numériques : chaque projet aura sa fiche (problème traité, objectifs, technologies, état d'avancement).</p>
                <p className="muted">Un prototype n'est jamais présenté comme un dispositif médical certifié.</p>
              </>
            )}
            <p><Link className="more-link" to="/projets">Voir les projets <span aria-hidden="true">→</span></Link></p>
          </div>
        </div>
      </section>

      {/* 8. Ressources */}
      <section className="section" aria-labelledby="res-title" data-reveal>
        <div className="container split-label">
          <div className="label-col">
            <p className="eyebrow">Bibliothèque</p>
            <h2 id="res-title">Ressources techniques</h2>
            <p>Fiches, guides, modèles et références, classés par catégorie et toujours accompagnés de leur source.</p>
            <Link className="more-link" to="/ressources">Ouvrir le catalogue <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="catalog">
            {resourceCategories.map((c, i) => {
              const n = ressources.filter((r) => r.category === c.label).length;
              return (
                <li key={c.label}>
                  <Link to={`/ressources?cat=${encodeURIComponent(c.label)}`}>
                    <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span><strong>{c.label}</strong><small>{c.desc}</small></span>
                  </Link>
                  <em>{n > 0 ? `${n} document${n > 1 ? 's' : ''}` : 'À venir'}</em>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 9. Formation / écosystème */}
      <section className="section section-gray" aria-labelledby="form-title" data-reveal>
        <div className="container eco-grid">
          <div>
            <p className="eyebrow">Se former</p>
            <h2 id="form-title">Formations et établissements</h2>
            <Figure slot="formation" ratio="wide" />
            <p>Formations en génie biomédical, établissements d'enseignement, ressources d'apprentissage : chaque fiche cite sa source et sa date de vérification.</p>
            {formations.length > 0 && <ul className="plain">{formations.slice(0, 3).map((f) => <li key={f.id}>{f.formation ?? f.etablissement}{f.demo && ' (démonstration)'}</li>)}</ul>}
            <Link className="btn" to="/formations">Voir les formations</Link>
          </div>
          <div>
            <p className="eyebrow">Écosystème</p>
            <h2>Opportunités</h2>
            <ul className="arrow-list">
              {opportunityTypes.map((t) => <li key={t.label}><Link to={`/opportunites?type=${encodeURIComponent(t.label)}`}><span><strong>{t.label}</strong><small>{t.desc}</small></span><Glyph name="arrow" size={18} /></Link></li>)}
            </ul>
          </div>
        </div>
      </section>

      {site.indicateurs.length > 0 && (
        <section className="section" aria-labelledby="ind-title" data-reveal>
          <div className="container">
            <p className="eyebrow">Données vérifiées</p>
            <h2 id="ind-title">Indicateurs du secteur</h2>
            <dl className="indicators">
              {site.indicateurs.map((i) => (
                <div key={i.label}><dt>{i.label}</dt><dd>{i.valeur}</dd><dd className="muted">Source : {i.url ? <a href={i.url} target="_blank" rel="noopener noreferrer">{i.source}</a> : i.source}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Contribution */}
      <section className="contrib-band" aria-labelledby="contrib-title" data-reveal>
        <div className="container">
          <div className="head-row">
            <div><p className="eyebrow">Participer</p><h2 id="contrib-title">Contribuer au portail</h2></div>
            <Link className="more-link" to="/contact">Contact et contribution <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="contrib">
            {contributionModes.map((m) => <li key={m.key}><Link to={`/contact?motif=${m.key}`}><strong>{m.label}</strong><span>{m.desc}</span></Link></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
