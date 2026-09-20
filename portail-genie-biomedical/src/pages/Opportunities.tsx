import { useState } from 'react';
import { isArchived, opportunites } from '../utils/content';
import { ArchiveTabs, Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../utils/format';

export default function Opportunities() {
  usePageMeta('Opportunités', 'Bourses, stages, emplois, concours, conférences, appels à projets et formations.');
  const [archives, setArchives] = useState(false);
  const list = opportunites.filter((o) => isArchived(o) === archives);
  const f = useFilter(list, (o) => ({ title: o.title, text: `${o.description} ${o.source} ${o.organisme ?? ''}`, category: o.type }));
  return (
    <>
      <PageHeader title="Opportunités" intro="Bourses, stages, emplois, concours, conférences, appels à projets. Vérifiez toujours la date limite et la source officielle avant de candidater." crumbs={[{ label: 'Opportunités' }]} />
      <div className="container page-body">
        <ArchiveTabs archives={archives} setArchives={setArchives} />
        {opportunites.length === 0 ? <EmptyState title="Contenu à venir">Les opportunités vérifiées seront publiées ici.</EmptyState> : (
          <>
            <FilterBar {...f} label="Tous les types" />
            {f.result.length === 0 ? <EmptyState title={archives ? 'Aucune archive' : 'Aucune opportunité en cours'} /> : (
              <Grid cols={2}>{f.result.map((o) => (
                <Card key={o.id} tag={o.type} title={o.title} summary={o.description} demo={o.demo} footer={
                  <>
                    <dl className="facts">
                      {o.organisme && <><dt>Organisme</dt><dd>{o.organisme}</dd></>}
                      {o.datePublication && <><dt>Publié le</dt><dd>{formatDate(o.datePublication)}</dd></>}
                      {o.dateLimite && <><dt>Date limite</dt><dd>{formatDate(o.dateLimite)}</dd></>}
                      <dt>Source</dt><dd>{o.source}</dd>
                    </dl>
                    {o.url ? <a className="text-link" href={o.url} target="_blank" rel="noopener noreferrer">Lien officiel</a> : <span className="muted">Lien à venir</span>}
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
