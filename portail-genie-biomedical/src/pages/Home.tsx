import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles, communiques, formations, isArchived, opportunites, projets, ressources, rubriques } from '../utils/content';
import { Card, EmptyState, Grid, Section } from '../components/ui';
import { formatDate } from '../utils/format';

const quick = [
  { to: '/actualites', label: 'Actualités' },
  { to: '/communiques', label: 'Communiqués' },
  { to: '/ressources', label: 'Ressources techniques' },
  { to: '/projets', label: 'Projets et innovations' },
  { to: '/formations', label: 'Formations et établissements' },
  { to: '/opportunites', label: 'Opportunités' },
];

const soon = <EmptyState title="Contenu à venir">Cette rubrique sera alimentée prochainement.</EmptyState>;

export default function Home() {
  usePageMeta();
  const news = articles.filter((a) => a.statut === 'publie').slice(0, 3);
  const comm = communiques.filter((c) => c.statut === 'publie').slice(0, 3);
  const opps = opportunites.filter((o) => !isArchived(o)).slice(0, 3);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <h1 id="hero-title">Le génie biomédical au Bénin</h1>
            <p className="lead">{site.description}</p>
            <div className="btn-row">
              <Link className="btn btn-light" to="/genie-biomedical">Découvrir le secteur</Link>
              <Link className="btn btn-outline" to="/a-propos">Présentation du portail</Link>
            </div>
          </div>
          <nav className="quick" aria-label="Accès rapides">
            <p className="quick-title">Accès rapides</p>
            <ul>{quick.map((q) => <li key={q.to}><Link to={q.to}>{q.label}</Link></li>)}</ul>
          </nav>
        </div>
      </section>

      <Section title="Actualités récentes" to="/actualites">
        {news.length ? <Grid>{news.map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} image={a.image} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} />)}</Grid> : soon}
      </Section>

      <Section title="Communiqués" to="/communiques" tone="mist">
        {comm.length ? <Grid>{comm.map((c) => <Card key={c.id} to={`/communiques/${c.id}`} tag={c.category} date={c.date} title={c.title} summary={c.summary} demo={c.demo} />)}</Grid> : soon}
      </Section>

      <Section title="Le génie biomédical : grands domaines" to="/genie-biomedical" linkLabel="Tous les domaines">
        <ul className="domain-list">
          {rubriques.map((r) => <li key={r.slug}><Link to={`/genie-biomedical/${r.slug}`}>{r.title}</Link></li>)}
        </ul>
      </Section>

      <Section title="Ressources techniques" to="/ressources" tone="mist">
        {ressources.length ? <Grid>{ressources.slice(0, 3).map((r) => <Card key={r.id} tag={r.category} date={r.date} title={r.title} summary={r.description} demo={r.demo} />)}</Grid> : soon}
      </Section>

      <Section title="Projets et innovations" to="/projets">
        {projets.length ? <Grid>{projets.slice(0, 3).map((p) => <Card key={p.id} to={`/projets/${p.id}`} tag={p.status} title={p.name} summary={p.description} demo={p.demo} image={p.images?.[0]} />)}</Grid> : soon}
      </Section>

      <Section title="Formations et établissements" to="/formations" tone="mist">
        {formations.length ? <Grid>{formations.slice(0, 3).map((f) => <Card key={f.id} tag={f.type} title={f.formation ?? f.etablissement} summary={f.formation ? f.etablissement : f.description} demo={f.demo} />)}</Grid> : soon}
      </Section>

      <Section title="Opportunités" to="/opportunites">
        {opps.length ? <Grid>{opps.map((o) => <Card key={o.id} tag={o.type} title={o.title} summary={o.description} demo={o.demo} footer={o.dateLimite ? <p className="muted">Date limite : {formatDate(o.dateLimite)}</p> : undefined} />)}</Grid> : soon}
      </Section>

      {site.indicateurs.length > 0 && (
        <Section title="Indicateurs du secteur" tone="mist">
          <dl className="indicators">
            {site.indicateurs.map((i) => (
              <div key={i.label}>
                <dt>{i.label}</dt>
                <dd>{i.valeur}</dd>
                <dd className="muted">Source : {i.url ? <a href={i.url} target="_blank" rel="noopener noreferrer">{i.source}</a> : i.source}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section title="Contribuer au portail" tone={site.indicateurs.length ? undefined : 'mist'}>
        <div className="callout">
          <p>Vous avez un article, un projet ou une ressource à partager ? Chaque contribution est relue avant publication.</p>
          <Link className="btn" to="/contact">Contacter l'équipe</Link>
        </div>
      </Section>
    </>
  );
}
