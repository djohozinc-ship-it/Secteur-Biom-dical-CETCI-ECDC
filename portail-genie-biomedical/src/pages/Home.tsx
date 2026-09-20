import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles, communiques, projets, ressources, opportunites, membres, isArchived } from '../utils/content';
import { Card, Grid, Section, Avatar, DemoBadge } from '../components/ui';

function HeroArt() {
  // Illustration provisoire : schéma de circuit autour d'une croix médicale.
  return (
    <svg className="hero-art" viewBox="0 0 400 320" role="img" aria-label="Schéma stylisé d'un circuit électronique autour d'une croix médicale">
      <g fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2">
        <path d="M20 60h90l30 30h60M20 160h120M20 250h70l40-40h50M380 70h-90l-30 30h-40M380 170h-110M380 260h-70l-40-40h-50" />
      </g>
      <g fill="#fff">
        {[[20, 60], [20, 160], [20, 250], [380, 70], [380, 170], [380, 260]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />)}
      </g>
      <rect x="140" y="80" width="120" height="120" rx="18" fill="#fff" />
      <path d="M187 100h26v27h27v26h-27v27h-26v-27h-27v-26h27z" fill="var(--blue)" />
      <circle cx="200" cy="140" r="8" fill="var(--teal)" />
    </svg>
  );
}

export default function Home() {
  usePageMeta();
  const opps = opportunites.filter((o) => !isArchived(o)).slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Le génie biomédical au service de la santé au Bénin</h1>
            <p className="lead">{site.description}</p>
            <div className="btn-row">
              <Link className="btn btn-light" to="/actualites">Lire les actualités</Link>
              <Link className="btn btn-outline" to="/ressources">Consulter les ressources</Link>
              <Link className="btn btn-outline" to="/projets">Découvrir les projets</Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <Section title="Actualités récentes" to="/actualites">
        <Grid>{articles.slice(0, 3).map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} image={a.image} />)}</Grid>
      </Section>

      <Section title="Communiqués" to="/communiques" tone="mist">
        <Grid>{communiques.slice(0, 3).map((c) => <Card key={c.id} to={`/communiques/${c.id}`} tag={c.category} date={c.date} title={c.title} summary={c.summary} demo={c.demo} />)}</Grid>
      </Section>

      <Section title="Projets et innovations" to="/projets">
        <Grid>{projets.slice(0, 3).map((p) => <Card key={p.id} to={`/projets/${p.id}`} tag={p.status} title={p.name} summary={p.description} demo={p.demo} />)}</Grid>
      </Section>

      <Section title="Ressources techniques" to="/ressources" tone="mist">
        <Grid>{ressources.slice(0, 3).map((r) => <Card key={r.id} tag={r.category} title={r.title} summary={r.description} demo={r.demo} />)}</Grid>
      </Section>

      <Section title="Formations et opportunités" to="/opportunites">
        <Grid>{opps.map((o) => <Card key={o.id} tag={o.type} date={o.deadline} title={o.title} summary={o.description} demo={o.demo} />)}</Grid>
      </Section>

      <Section title="La communauté" to="/membres" linkLabel="Voir les membres" tone="mist">
        <ul className="member-strip">
          {membres.slice(0, 4).map((m) => (
            <li key={m.id}><Avatar name={m.name} photo={m.photo} /><span><strong>{m.name}</strong><small>{m.role}</small></span>{m.demo && <DemoBadge />}</li>
          ))}
        </ul>
      </Section>

      <Section title="Contribuer au portail">
        <div className="callout">
          <p>Vous avez un article, un projet ou une ressource à partager ? Écrivez-nous : chaque contribution est relue avant publication.</p>
          <Link className="btn" to="/contact">Contacter l'équipe</Link>
        </div>
      </Section>
    </>
  );
}
