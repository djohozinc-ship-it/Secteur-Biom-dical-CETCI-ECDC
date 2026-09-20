import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles, communiques, formations, isArchived, opportunites, projets, ressources, rubriques } from '../utils/content';
import { Badge, DemoBadge, DocRow, Placeholder, Section } from '../components/ui';
import { Glyph, HeroIllustration } from '../components/illustrations';
import { contributionModes, opportunityTypes, resourceCategories } from '../utils/taxonomy';
import { asset, dayMonth, daysUntil, formatDate } from '../utils/format';

const groupGlyph: Record<string, string> = { Fondamentaux: 'wrench', 'Services et équipements': 'monitor', Technologies: 'chip' };

export default function Home() {
  usePageMeta();
  const news = articles.filter((a) => a.statut === 'publie');
  const [main, ...others] = news;
  const comm = communiques.filter((c) => c.statut === 'publie').slice(0, 4);
  const opps = opportunites.filter((o) => !isArchived(o)).sort((a, b) => (a.dateLimite ?? '9999').localeCompare(b.dateLimite ?? '9999')).slice(0, 4);
  const groupes = Array.from(new Set(rubriques.map((r) => r.groupe)));
  const featured = projets[0];

  return (
    <>
      {/* 1. Accueil : présentation + illustration */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow eyebrow-light">Portail sectoriel · Bénin</p>
            <h1 id="hero-title">Le génie biomédical au service de la santé au Bénin</h1>
            <p className="lead">{site.description}</p>
            <div className="btn-row">
              <Link className="btn btn-light" to="/genie-biomedical">Explorer les domaines</Link>
              <Link className="btn btn-outline" to="/ressources">Ressources techniques</Link>
            </div>
          </div>
          <figure className="hero-figure">
            {site.heroImage
              ? <img src={asset(site.heroImage)} alt={site.heroImageAlt} />
              : <><HeroIllustration /><figcaption>Illustration originale provisoire</figcaption></>}
          </figure>
        </div>
      </section>

      {/* 2. À la une + brèves */}
      <Section title="À la une" eyebrow="Actualités" to="/actualites" tone="white">
        {main ? (
          <div className="lead-grid">
            <article className="lead-story">
              {main.image && <img src={asset(main.image)} alt={main.imageAlt ?? ''} />}
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
          <Placeholder glyph={<Glyph name="doc" />} title="La première actualité sera publiée ici">
            Chaque actualité indique sa date et sa source. Elle est rédigée en Markdown dans le dossier <code>src/data/articles</code>.
          </Placeholder>
        )}
      </Section>

      {/* 3. Communiqués + échéances (deux colonnes documentaires) */}
      <Section title="Informations importantes" eyebrow="Communiqués et échéances" tone="paper" id="infos">
        <div className="two-col">
          <div>
            <div className="col-head"><h3>Communiqués</h3><Link className="more-link" to="/communiques">Tous les communiqués <span aria-hidden="true">→</span></Link></div>
            {comm.length ? comm.map((c) => (
              <DocRow key={c.id} to={`/communiques/${c.id}`} date={c.date} tag={c.category} title={c.title} demo={c.demo} aside={c.pdf ? <span className="pdf">PDF</span> : undefined} />
            )) : <Placeholder title="Aucun communiqué publié">Les annonces officielles de la communauté apparaîtront ici.</Placeholder>}
          </div>
          <div>
            <div className="col-head"><h3>Prochaines échéances</h3><Link className="more-link" to="/opportunites">Toutes les opportunités <span aria-hidden="true">→</span></Link></div>
            {opps.length ? opps.map((o) => {
              const { day, month } = dayMonth(o.dateLimite);
              const left = daysUntil(o.dateLimite);
              return (
                <article key={o.id} className="deadline">
                  <div className="deadline-date" aria-hidden="true"><strong>{day}</strong><span>{month}</span></div>
                  <div>
                    <div className="tags"><Badge tone="ochre">{o.type}</Badge>{o.demo && <DemoBadge />}</div>
                    <h4>{o.title}</h4>
                    <p className="meta">{o.organisme ? `${o.organisme} · ` : ''}{o.dateLimite ? `Date limite : ${formatDate(o.dateLimite)}${left !== null ? ` (${left} j)` : ''}` : 'Sans date limite connue'}</p>
                  </div>
                </article>
              );
            }) : <Placeholder title="Aucune opportunité en cours">Bourses, stages, emplois et concours vérifiés seront listés avec leur date limite.</Placeholder>}
          </div>
        </div>
      </Section>

      {/* 4. Domaines : index éditorial */}
      <section className="section section-white" aria-labelledby="dom-title">
        <div className="container domains">
          <div className="domains-intro">
            <p className="eyebrow">Le secteur</p>
            <h2 id="dom-title">Les domaines du génie biomédical</h2>
            <p>De la maintenance des équipements à l'intelligence artificielle appliquée à la santé, chaque domaine présente les notions essentielles, les ressources et les articles associés.</p>
            <Link className="more-link" to="/genie-biomedical">Parcourir tous les domaines <span aria-hidden="true">→</span></Link>
          </div>
          <div className="domains-list">
            {groupes.map((g) => (
              <div key={g} className="domain-group">
                <h3><Glyph name={groupGlyph[g] ?? 'doc'} />{g}</h3>
                <ul>{rubriques.filter((r) => r.groupe === g).map((r) => <li key={r.slug}><Link to={`/genie-biomedical/${r.slug}`}>{r.title}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Projets : bandeau sombre */}
      <Section title="Projets et innovations" eyebrow="Valoriser le travail local" to="/projets" tone="dark">
        {featured ? (
          <div className="feature-project">
            <div>
              <div className="tags"><Badge tone="dark">{featured.status}</Badge>{featured.demo && <DemoBadge />}</div>
              <h3><Link to={`/projets/${featured.id}`}>{featured.name}</Link></h3>
              <p>{featured.description}</p>
              <p className="meta">Technologies : {featured.technologies.join(', ')}</p>
            </div>
            <ul className="project-links">
              {projets.slice(1, 4).map((p) => <li key={p.id}><Link to={`/projets/${p.id}`}>{p.name}</Link><span>{p.status}</span></li>)}
            </ul>
          </div>
        ) : (
          <div className="dark-note">
            <p>Prototypes d'étudiants, dispositifs conçus localement, travaux de recherche, solutions numériques : chaque projet aura sa fiche (problème traité, objectifs, technologies, état d'avancement).</p>
            <p className="muted-light">Un prototype n'est jamais présenté comme un dispositif médical certifié.</p>
          </div>
        )}
      </Section>

      {/* 6. Ressources : catalogue par catégorie */}
      <Section title="Ressources techniques" eyebrow="Bibliothèque" to="/ressources" linkLabel="Ouvrir le catalogue" tone="paper">
        <ul className="catalog">
          {resourceCategories.map((c) => {
            const n = ressources.filter((r) => r.category === c.label).length;
            return (
              <li key={c.label}>
                <Link to={`/ressources?cat=${encodeURIComponent(c.label)}`}><strong>{c.label}</strong><span>{c.desc}</span></Link>
                <em>{n > 0 ? `${n} document${n > 1 ? 's' : ''}` : 'À venir'}</em>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 7. Formations et opportunités */}
      <section className="section section-white" aria-labelledby="form-title">
        <div className="container split-panels">
          <div className="panel-block">
            <p className="eyebrow">Se former</p>
            <h2 id="form-title">Formations et établissements</h2>
            <p>Formations en génie biomédical, établissements d'enseignement, ressources d'apprentissage : chaque fiche cite sa source et sa date de vérification.</p>
            {formations.length > 0 && <ul className="plain">{formations.slice(0, 3).map((f) => <li key={f.id}>{f.formation ?? f.etablissement}{f.demo && ' (démonstration)'}</li>)}</ul>}
            <Link className="btn" to="/formations">Voir les formations</Link>
          </div>
          <div className="panel-block panel-tint">
            <p className="eyebrow">Opportunités</p>
            <h2>Candidater, participer</h2>
            <ul className="type-list">
              {opportunityTypes.map((t) => <li key={t.label}><Link to={`/opportunites?type=${encodeURIComponent(t.label)}`}>{t.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>

      {site.indicateurs.length > 0 && (
        <Section title="Indicateurs du secteur" eyebrow="Données vérifiées" tone="mist">
          <dl className="indicators">
            {site.indicateurs.map((i) => (
              <div key={i.label}><dt>{i.label}</dt><dd>{i.valeur}</dd><dd className="muted">Source : {i.url ? <a href={i.url} target="_blank" rel="noopener noreferrer">{i.source}</a> : i.source}</dd></div>
            ))}
          </dl>
        </Section>
      )}

      {/* 8. Contribution */}
      <Section title="Contribuer au portail" eyebrow="Participer" tone="mist" id="contrib">
        <ul className="contrib">
          {contributionModes.map((m) => (
            <li key={m.key}><Link to={`/contact?motif=${m.key}`}><strong>{m.label}</strong><span>{m.desc}</span></Link></li>
          ))}
        </ul>
        <p className="muted">Chaque contribution est relue avant publication. <Link to="/contact">Toutes les modalités de contact</Link></p>
      </Section>
    </>
  );
}
