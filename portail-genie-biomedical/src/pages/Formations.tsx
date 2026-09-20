import { formations } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Formations() {
  usePageMeta('Formations et établissements', 'Formations en génie biomédical et établissements.');
  const f = useFilter(formations, (x) => ({ title: x.name, text: x.description, category: x.kind }));
  return (
    <>
      <PageHeader title="Formations et établissements" intro="Informations à vérifier auprès des établissements avant toute décision." crumbs={[{ label: 'Formations' }]} />
      <div className="container page-body">
        <FilterBar {...f} label="Tous les types" />
        {f.result.length === 0 ? <EmptyState title="Aucun résultat" /> : (
          <Grid cols={2}>{f.result.map((x) => (
            <Card key={x.id} tag={x.kind} title={x.name} summary={x.description} demo={x.demo} footer={
              <p className="res-foot">
                {x.contact && <span className="muted">Contact : {x.contact}</span>}
                {x.url ? <a className="text-link" href={x.url} target="_blank" rel="noopener noreferrer">Site officiel</a> : <span className="muted">Lien officiel à renseigner</span>}
              </p>
            } />
          ))}</Grid>
        )}
      </div>
    </>
  );
}
