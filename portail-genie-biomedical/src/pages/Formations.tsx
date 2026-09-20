import { formations } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../utils/format';

export default function Formations() {
  usePageMeta('Formations et établissements', 'Formations en génie biomédical et établissements d\'enseignement.');
  const f = useFilter(formations, (x) => ({ title: x.formation ?? x.etablissement, text: `${x.etablissement} ${x.description} ${x.ville ?? ''} ${x.diplome ?? ''}`, category: x.type }));
  return (
    <>
      <PageHeader title="Formations et établissements" intro="Informations à vérifier auprès des établissements avant toute décision." crumbs={[{ label: 'Formations' }]} />
      <div className="container page-body">
        {formations.length === 0 ? <EmptyState title="Contenu à venir">Les fiches de formations et d'établissements seront publiées après vérification auprès des sources officielles.</EmptyState> : (
          <>
            <FilterBar {...f} label="Tous les types" />
            {f.result.length === 0 ? <EmptyState title="Aucun résultat" /> : (
              <Grid cols={2}>{f.result.map((x) => (
                <Card key={x.id} tag={x.type} title={x.formation ?? x.etablissement} summary={x.description} demo={x.demo} footer={
                  <>
                    <dl className="facts">
                      {x.formation && <><dt>Établissement</dt><dd>{x.etablissement}</dd></>}
                      {x.niveau && <><dt>Niveau</dt><dd>{x.niveau}</dd></>}
                      {x.diplome && <><dt>Diplôme</dt><dd>{x.diplome}</dd></>}
                      {x.ville && <><dt>Ville</dt><dd>{x.ville}</dd></>}
                      {x.admission && <><dt>Admission</dt><dd>{x.admission}</dd></>}
                      {x.contact && <><dt>Contact</dt><dd>{x.contact}</dd></>}
                      {x.source && <><dt>Source</dt><dd>{x.source}</dd></>}
                      {x.dateVerification && <><dt>Vérifié le</dt><dd>{formatDate(x.dateVerification)}</dd></>}
                    </dl>
                    {x.siteOfficiel ? <a className="text-link" href={x.siteOfficiel} target="_blank" rel="noopener noreferrer">Site officiel</a> : <span className="muted">Site officiel à venir</span>}
                  </>
                } />
              ))}</Grid>
            )}
          </>
        )}
      </div>
    </>
  );
}
