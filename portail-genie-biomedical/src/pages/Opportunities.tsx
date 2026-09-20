import { useState } from 'react';
import { isArchived, opportunites } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, PageHeader } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Opportunities() {
  usePageMeta('Opportunités', 'Bourses, stages, emplois, formations, conférences et concours.');
  const [archives, setArchives] = useState(false);
  const list = opportunites.filter((o) => isArchived(o) === archives);
  const f = useFilter(list, (o) => ({ title: o.title, text: `${o.description} ${o.source}`, category: o.type }));
  return (
    <>
      <PageHeader title="Opportunités" intro="Vérifiez toujours la date limite et la source officielle avant de candidater." crumbs={[{ label: 'Opportunités' }]} />
      <div className="container page-body">
        <div className="chips" role="group" aria-label="Affichage">
          <button className={`chip${!archives ? ' is-on' : ''}`} aria-pressed={!archives} onClick={() => setArchives(false)}>En cours</button>
          <button className={`chip${archives ? ' is-on' : ''}`} aria-pressed={archives} onClick={() => setArchives(true)}>Archives</button>
        </div>
        <FilterBar {...f} label="Tous les types" />
        {f.result.length === 0 ? <EmptyState title={archives ? 'Aucune archive' : 'Aucune opportunité en cours'} /> : (
          <Grid cols={2}>{f.result.map((o) => (
            <Card key={o.id} tag={o.type} date={o.deadline} title={o.title} summary={o.description} demo={o.demo} footer={
              <p className="res-foot">
                <span className="muted">Source : {o.source}</span>
                {o.url ? <a className="text-link" href={o.url} target="_blank" rel="noopener noreferrer">Lien externe</a> : <span className="muted">Lien à renseigner</span>}
              </p>
            } />
          ))}</Grid>
        )}
      </div>
    </>
  );
}
