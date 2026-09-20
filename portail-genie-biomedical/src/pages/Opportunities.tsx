import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isArchived, opportunites } from '../utils/content';
import { ArchiveTabs, Badge, DemoBadge, EmptyState, FactList, PageHeader, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { dayMonth, daysUntil, formatDate } from '../utils/format';
import { opportunityTypes } from '../utils/taxonomy';

export default function Opportunities() {
  usePageMeta('Opportunités', 'Bourses, stages, emplois, concours, conférences, appels à projets et formations.');
  const [params] = useSearchParams();
  const [archives, setArchives] = useState(false);
  const list = opportunites
    .filter((o) => isArchived(o) === archives)
    .sort((a, b) => archives ? (b.dateLimite ?? '').localeCompare(a.dateLimite ?? '') : (a.dateLimite ?? '9999').localeCompare(b.dateLimite ?? '9999'));
  const f = useFilter(list, (o) => ({ title: o.title, text: `${o.description} ${o.source} ${o.organisme ?? ''}`, category: o.type }), { cat: params.get('type') ?? '' });
  const counts: Record<string, number> = {};
  list.forEach((o) => { counts[o.type] = (counts[o.type] ?? 0) + 1; });
  const cats = Array.from(new Set([...opportunityTypes.map((t) => t.label), ...f.categories]));
  return (
    <>
      <PageHeader title="Opportunités" eyebrow="Se former" intro="Bourses, stages, emplois, concours, conférences, appels à projets. Vérifiez toujours la date limite et la source officielle avant de candidater." crumbs={[{ label: 'Opportunités' }]} />
      <div className="container page-body">
        <div className="with-side">
          <SideFilter {...f} categories={cats} counts={counts} catLabel="Type" />
          <div>
            <ArchiveTabs archives={archives} setArchives={setArchives} />
            {opportunites.length === 0 ? <EmptyState title="Aucune opportunité publiée">Les opportunités vérifiées seront listées avec leur organisme, leur date limite et un lien officiel.</EmptyState>
              : f.result.length === 0 ? <EmptyState title={archives ? 'Aucune archive' : 'Aucune opportunité en cours'}>Essayez un autre type ou d'autres mots-clés.</EmptyState> : (
              <ul className="opps">
                {f.result.map((o) => {
                  const { day, month } = dayMonth(o.dateLimite);
                  const left = daysUntil(o.dateLimite);
                  return (
                    <li key={o.id} className="opp">
                      <div className={`deadline-date${archives ? ' is-past' : ''}`} aria-hidden="true"><strong>{day}</strong><span>{month}</span></div>
                      <div>
                        <div className="tags"><Badge tone="ochre">{o.type}</Badge>{o.demo && <DemoBadge />}{archives && <Badge tone="line">Archivée</Badge>}</div>
                        <h3>{o.title}</h3>
                        <p>{o.description}</p>
                        <FactList items={[
                          { label: 'Organisme', value: o.organisme },
                          { label: 'Date limite', value: o.dateLimite ? `${formatDate(o.dateLimite)}${!archives && left !== null ? ` (dans ${left} j)` : ''}` : 'Non précisée' },
                          { label: 'Publiée le', value: o.datePublication ? formatDate(o.datePublication) : undefined },
                          { label: 'Source', value: o.source },
                        ]} />
                        {o.url ? <a className="btn btn-small" href={o.url} target="_blank" rel="noopener noreferrer">{archives ? 'Voir la page' : 'Consulter et candidater'}</a> : <span className="muted">Lien à venir</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
