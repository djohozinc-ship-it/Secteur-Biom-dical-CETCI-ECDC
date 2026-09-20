import { ressources } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';

export default function Resources() {
  usePageMeta('Ressources techniques', 'Fiches techniques, guides, tutoriels, modèles de maintenance et références.');
  const f = useFilter(ressources, (r) => ({ title: r.title, text: `${r.description} ${r.source ?? ''} ${r.auteur ?? ''}`, category: r.category }));
  return (
    <>
      <PageHeader title="Ressources techniques" intro="Fiches, guides, tutoriels et références. Seuls les documents dont la diffusion est autorisée sont proposés, avec leur source." crumbs={[{ label: 'Ressources' }]} />
      <div className="container page-body">
        {ressources.length === 0 ? <EmptyState title="Contenu à venir">La bibliothèque de ressources est en cours de constitution.</EmptyState> : (
          <>
            <FilterBar {...f} />
            {f.result.length === 0 ? <EmptyState title="Aucune ressource ne correspond">Essayez d'autres mots-clés ou une autre catégorie.</EmptyState> : (
              <Grid>{f.result.map((r) => (
                <Card key={r.id} tag={r.category} date={r.date} title={r.title} summary={r.description} demo={r.demo} footer={
                  <div className="res-foot">
                    <span className="badge badge-line">{r.typeDocument}</span>
                    {r.auteur && <span className="muted">Auteur : {r.auteur}</span>}
                    {r.source && <span className="muted">Source : {r.source}</span>}
                    {r.date && <span className="muted">Publié le {formatDate(r.date)}</span>}
                    {r.url ? <a className="text-link" href={asset(r.url)} target="_blank" rel="noopener noreferrer">Ouvrir la ressource</a> : <span className="muted">Lien à venir</span>}
                  </div>
                } />
              ))}</Grid>
            )}
          </>
        )}
      </div>
    </>
  );
}
