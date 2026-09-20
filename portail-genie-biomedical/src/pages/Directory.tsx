import { site } from '../config/site';
import { annuaire } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Directory() {
  usePageMeta('Annuaire biomédical');
  const f = useFilter(annuaire, (e) => ({ title: e.name, text: e.description, category: e.type }));
  if (!site.annuaireEnabled) {
    return (
      <>
        <PageHeader title="Annuaire biomédical" crumbs={[{ label: 'Annuaire' }]} />
        <div className="container page-body">
          <EmptyState title="L'annuaire n'est pas encore activé">Il sera ouvert lorsque les autorisations de publication auront été obtenues.</EmptyState>
        </div>
      </>
    );
  }
  return (
    <>
      <PageHeader title="Annuaire biomédical" intro="Professionnels, établissements, associations et laboratoires ayant donné leur accord." crumbs={[{ label: 'Annuaire' }]} />
      <div className="container page-body">
        <FilterBar {...f} label="Tous les types" />
        {f.result.length === 0 ? <EmptyState title="Aucune entrée" /> : <Grid>{f.result.map((e) => <Card key={e.id} tag={e.type} title={e.name} summary={e.description} demo={e.demo} />)}</Grid>}
      </div>
    </>
  );
}
