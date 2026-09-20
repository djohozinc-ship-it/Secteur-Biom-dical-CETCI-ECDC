import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { communiques } from '../utils/content';
import { ArchiveTabs, Badge, DemoBadge, DocRow, EmptyState, FactList, Markdown, PageHeader, Pager, ShareLinks, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';
import { NotFound } from './Misc';

export function CommuniqueList() {
  usePageMeta('Communiqués', 'Annonces et documents de la communauté.');
  const [archives, setArchives] = useState(false);
  const list = communiques.filter((c) => (c.statut === 'archive') === archives);
  const f = useFilter(list, (c) => ({ title: c.title, text: `${c.summary} ${c.content}`, category: c.category }));
  const p = usePagination(f.result, 10);
  return (
    <>
      <PageHeader title="Communiqués" eyebrow="Publications" intro="Annonces et documents de la communauté, classés par date, avec leur statut." crumbs={[{ label: 'Communiqués' }]} />
      <div className="container page-body">
        {communiques.length === 0 ? <EmptyState title="Aucun communiqué publié">Les annonces apparaîtront ici avec leur date, leur statut et, le cas échéant, un document PDF.</EmptyState> : (
          <div className="with-side">
            <SideFilter {...f} />
            <div>
              <ArchiveTabs archives={archives} setArchives={setArchives} labelLive="Récents" />
              {f.result.length === 0 ? <EmptyState title="Aucun communiqué ne correspond" /> : (
                <>
                  <div className="doclist">
                    {p.slice.map((c) => (
                      <DocRow key={c.id} to={`/communiques/${c.id}`} date={c.date} tag={c.category} title={c.title} summary={c.summary} demo={c.demo}
                        aside={<><Badge tone={c.statut === 'archive' ? 'line' : 'green'}>{c.statut === 'archive' ? 'Archivé' : 'Publié'}</Badge>{c.pdf && <span className="pdf">PDF</span>}</>} />
                    ))}
                  </div>
                  <Pager page={p.page} pages={p.pages} setPage={p.setPage} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function CommuniqueDetail() {
  const { id } = useParams();
  const c = communiques.find((x) => x.id === id);
  usePageMeta(c?.title, c?.summary);
  if (!c) return <NotFound />;
  return (
    <>
      <PageHeader title={c.title} crumbs={[{ label: 'Communiqués', to: '/communiques' }, { label: c.category }]} />
      <div className="container page-body reading">
        <article className="reading-main">
          <p className="lead">{c.summary}</p>
          <Markdown source={c.content} />
          <ShareLinks title={c.title} />
        </article>
        <aside className="reading-side doc-card" aria-label="Informations sur le document">
          <p className="side-title">Le document</p>
          {c.demo && <p><DemoBadge /></p>}
          <FactList items={[
            { label: 'Statut', value: c.statut === 'archive' ? 'Archivé' : 'Publié' },
            { label: 'Catégorie', value: c.category },
            { label: 'Publié le', value: formatDate(c.date) },
            { label: 'Mis à jour le', value: c.dateMiseAJour ? formatDate(c.dateMiseAJour) : undefined },
            { label: 'Source', value: c.source },
          ]} />
          {c.pdf && <p><a className="btn" href={asset(c.pdf)} download>Télécharger le PDF</a></p>}
          <p><Link className="more-link" to="/communiques">← Tous les communiqués</Link></p>
        </aside>
      </div>
    </>
  );
}
