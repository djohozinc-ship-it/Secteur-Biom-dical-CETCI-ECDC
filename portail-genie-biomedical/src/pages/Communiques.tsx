import { Link, useParams } from 'react-router-dom';
import { communiques } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, Markdown, PageHeader, Pager, ShareLinks, DemoBadge } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';
import { NotFound } from './Misc';

export function CommuniqueList() {
  usePageMeta('Communiqués', 'Annonces institutionnelles.');
  const f = useFilter(communiques, (c) => ({ title: c.title, text: `${c.summary} ${c.content}`, category: c.category }));
  const p = usePagination(f.result, 6);
  return (
    <>
      <PageHeader title="Communiqués" intro="Annonces et documents officiels." crumbs={[{ label: 'Communiqués' }]} />
      <div className="container page-body">
        <FilterBar {...f} />
        {f.result.length === 0 ? <EmptyState title="Aucun communiqué ne correspond" /> : (
          <>
            <Grid cols={2}>{p.slice.map((c) => <Card key={c.id} to={`/communiques/${c.id}`} tag={c.category} date={c.date} title={c.title} summary={c.summary} demo={c.demo} footer={c.pdf ? <p className="muted">Document PDF joint</p> : undefined} />)}</Grid>
            <Pager page={p.page} pages={p.pages} setPage={p.setPage} />
          </>
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
      <article className="container narrow page-body">
        <p className="card-meta"><span className="badge">{c.category}</span>{c.demo && <DemoBadge />}<time dateTime={c.date}>{formatDate(c.date)}</time></p>
        <Markdown source={c.content} />
        {c.pdf && <p><a className="btn" href={asset(c.pdf)} download>Télécharger le document (PDF)</a></p>}
        <ShareLinks title={c.title} />
        <p><Link className="text-link" to="/communiques">Retour aux communiqués</Link></p>
      </article>
    </>
  );
}
