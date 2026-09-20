import { site } from '../config/site';
import { annuaire } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../utils/format';

export default function Directory() {
  usePageMeta('Annuaire biomédical');
  const f = useFilter(annuaire, (e) => ({ title: e.nom, text: `${e.description} ${e.fonction ?? ''} ${e.organisme ?? ''}`, category: e.typeProfil }));
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
      <PageHeader title="Annuaire biomédical" intro="Personnes, établissements, associations et laboratoires ayant donné leur accord de publication." crumbs={[{ label: 'Annuaire' }]} />
      <div className="container page-body">
        {annuaire.length === 0 ? <EmptyState title="Contenu à venir" /> : (
          <>
            <FilterBar {...f} label="Tous les profils" />
            {f.result.length === 0 ? <EmptyState title="Aucune entrée ne correspond" /> : (
              <Grid>{f.result.map((e) => (
                <Card key={e.id} tag={e.typeProfil} title={e.nom} summary={e.description} demo={e.demo} footer={
                  <dl className="facts">
                    {e.fonction && <><dt>Fonction</dt><dd>{e.fonction}</dd></>}
                    {e.organisme && <><dt>Organisme</dt><dd>{e.organisme}</dd></>}
                    {e.coordonneesAutorisees && e.coordonnees?.email && <><dt>Email</dt><dd><a href={`mailto:${e.coordonnees.email}`}>{e.coordonnees.email}</a></dd></>}
                    {e.coordonneesAutorisees && e.coordonnees?.telephone && <><dt>Téléphone</dt><dd>{e.coordonnees.telephone}</dd></>}
                    {e.source && <><dt>Source</dt><dd>{e.source}</dd></>}
                    {e.dateValidation && <><dt>Validé le</dt><dd>{formatDate(e.dateValidation)}</dd></>}
                  </dl>
                } />
              ))}</Grid>
            )}
          </>
        )}
      </div>
    </>
  );
}
