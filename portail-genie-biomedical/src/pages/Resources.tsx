import { ressources } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../utils/format';

export default function Resources() {
  usePageMeta('Ressources techniques', 'Guides, fiches techniques, supports de formation et tutoriels.');
  const f = useFilter(ressources, (r) => ({ title: r.title, text: `${r.description} ${r.source ?? ''}`, category: r.category }));
  return (
    <>
      <PageHeader title="Ressources techniques" intro="Guides, fiches, supports et tutoriels. Seuls les documents dont la diffusion est autorisée sont proposés." crumbs={[{ label: 'Ressources' }]} />
      <div className="container page-body">
        <FilterBar {...f} />
        {f.result.length === 0 ? <EmptyState title="Aucune ressource ne correspond" /> : (
          <Grid>{f.result.map((r) => (
            <Card key={r.id} tag={r.category} title={r.title} summary={r.description} demo={r.demo} footer={
              <p className="res-foot">
                <span className="badge badge-line">{r.fileType}</span>
                {r.source && <span className="muted">Source : {r.source}</span>}
                {r.url ? <a className="text-link" href={asset(r.url)} target="_blank" rel="noopener noreferrer">Ouvrir</a> : <span className="muted">Lien à renseigner</span>}
              </p>
            } />
          ))}</Grid>
        )}
      </div>
    </>
  );
}
