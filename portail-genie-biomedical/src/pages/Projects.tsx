import { Link, useParams } from 'react-router-dom';
import { projets } from '../utils/content';
import { Badge, DemoBadge, EmptyState, FactList, PageHeader, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';
import { NotFound } from './Misc';

export function ProjectList() {
  usePageMeta('Projets et prototypes', 'Projets et prototypes des étudiants du Secteur Biomédical du CETCI/ECDC : assistance à la communication, dialyse, imagerie médicale, assistant vocal.');
  const f = useFilter(projets, (p) => ({ title: p.name, text: `${p.description} ${p.problem} ${p.technologies.join(' ')}`, category: p.category }));
  return (
    <>
      <PageHeader title="Projets et prototypes" eyebrow="Réalisations" intro="Ce que les étudiants du secteur conçoivent et expérimentent. Ces prototypes ne sont pas des dispositifs médicaux certifiés." crumbs={[{ label: 'Projets' }]} />
      <div className="container page-body">
        {projets.length === 0 ? <EmptyState title="Projets à venir">Les projets du secteur seront présentés ici.</EmptyState> : (
          <div className="with-side">
            <SideFilter {...f} />
            <div>
              {f.result.length === 0 ? <EmptyState title="Aucun projet ne correspond" /> : (
                <ul className="project-list">
                  {f.result.map((p) => (
                    <li key={p.id} className="project-item">
                      {p.images?.[0] && <img src={asset(p.images[0])} alt={`Illustration du projet ${p.name}`} loading="lazy" />}
                      <div>
                        <div className="tags"><Badge tone="ochre">{p.status}</Badge><Badge tone="line">{p.category}</Badge>{p.demo && <DemoBadge />}</div>
                        <h3><Link to={`/projets/${p.id}`}>{p.name}</Link></h3>
                        <p>{p.description}</p>
                        <p className="chips-inline">{p.technologies.map((t) => <span key={t}>{t}</span>)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
      <div className="container page-body reading">
        <article className="reading-main">
          <p className="notice">Ce projet est un prototype ou un travail d'apprentissage. Ce n'est pas un dispositif médical certifié.</p>
          {p.images?.map((src) => <img key={src} className="article-img" src={asset(src)} alt={`Illustration du projet ${p.name}`} loading="lazy" />)}
          <h2>Problème traité</h2><p>{p.problem}</p>
          <h2>Objectifs</h2><ul>{p.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
          {p.links && p.links.length > 0 && <><h2>Références</h2><ul>{p.links.map((l) => <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}</ul></>}
        </article>
        <aside className="reading-side doc-card" aria-label="Fiche du projet">
          <p className="side-title">Fiche du projet</p>
          {p.demo && <p><DemoBadge /></p>}
          <FactList items={[
            { label: 'Avancement', value: p.status },
            { label: 'Catégorie', value: p.category },
            { label: 'Technologies', value: p.technologies.join(', ') },
            { label: 'Équipe', value: p.team.join(', ') },
            { label: 'Mis à jour le', value: p.dateMiseAJour ? formatDate(p.dateMiseAJour) : undefined },
          ]} />
          {p.rubrique && <p><Link className="more-link" to={`/genie-biomedical/${p.rubrique}`}>Domaine associé <span aria-hidden="true">→</span></Link></p>}
          <p><Link className="more-link" to="/projets">← Tous les projets</Link></p>
        </aside>
      </div>
    </>
  );
}
