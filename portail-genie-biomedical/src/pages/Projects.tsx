import { Link, useParams } from 'react-router-dom';
import { projets } from '../utils/content';
import { Card, DemoBadge, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../utils/format';
import { NotFound } from './Misc';

export function ProjectList() {
  usePageMeta('Projets et innovations', 'Projets, prototypes et solutions numériques en santé.');
  const f = useFilter(projets, (p) => ({ title: p.name, text: `${p.description} ${p.problem} ${p.technologies.join(' ')}`, category: p.category }));
  return (
    <>
      <PageHeader title="Projets et innovations" intro="Projets d'étudiants, prototypes et solutions numériques. Un prototype n'est pas un dispositif médical certifié." crumbs={[{ label: 'Projets' }]} />
      <div className="container page-body">
        <FilterBar {...f} />
        {f.result.length === 0 ? <EmptyState title="Aucun projet ne correspond" /> : (
          <Grid>{f.result.map((p) => <Card key={p.id} to={`/projets/${p.id}`} tag={p.status} title={p.name} summary={p.description} demo={p.demo} image={p.images?.[0]} />)}</Grid>
        )}
      </div>
    </>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const p = projets.find((x) => x.id === id);
  usePageMeta(p?.name, p?.description);
  if (!p) return <NotFound />;
  return (
    <>
      <PageHeader title={p.name} intro={p.description} crumbs={[{ label: 'Projets', to: '/projets' }, { label: p.name }]} />
      <article className="container narrow page-body">
        <p className="card-meta"><span className="badge">{p.status}</span><span className="badge badge-line">{p.category}</span>{p.demo && <DemoBadge />}</p>
        <p className="notice">Ce projet est un travail pédagogique ou expérimental. Il n'est pas présenté comme un dispositif médical certifié.</p>
        {p.images?.map((src) => <img key={src} className="article-img" src={asset(src)} alt={`Illustration du projet ${p.name}`} loading="lazy" />)}
        <h2>Problème traité</h2><p>{p.problem}</p>
        <h2>Objectifs</h2><ul>{p.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
        <h2>Technologies</h2><p>{p.technologies.join(', ')}</p>
        <h2>Équipe</h2><p>{p.team.join(', ')}</p>
        {p.links && p.links.length > 0 && <><h2>Références</h2><ul>{p.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul></>}
        <p><Link className="text-link" to="/projets">Retour aux projets</Link></p>
      </article>
    </>
  );
}
