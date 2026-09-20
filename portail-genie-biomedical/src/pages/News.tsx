import { Link, useParams } from 'react-router-dom';
import { articles } from '../utils/content';
import { Card, EmptyState, FilterBar, Grid, Markdown, PageHeader, Pager, ShareLinks, DemoBadge } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';
import { NotFound } from './Misc';

export function NewsList() {
  usePageMeta('Actualités', 'Toutes les actualités du portail.');
  const f = useFilter(articles, (a) => ({ title: a.title, text: `${a.summary} ${a.body}`, category: a.category }));
  const p = usePagination(f.result, 6);
  return (
    <>
      <PageHeader title="Actualités" intro="Nouvelles, analyses et vie de la communauté." crumbs={[{ label: 'Actualités' }]} />
      <div className="container page-body">
        <FilterBar {...f} />
        {f.result.length === 0 ? <EmptyState title="Aucun article ne correspond">Essayez d'autres mots-clés ou une autre catégorie.</EmptyState> : (
          <>
            <Grid>{p.slice.map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} image={a.image} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} />)}</Grid>
            <Pager page={p.page} pages={p.pages} setPage={p.setPage} />
          </>
        )}
      </div>
    </>
  );
}

export function NewsDetail() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  usePageMeta(a?.title, a?.summary);
  if (!a) return <NotFound />;
  return (
    <>
      <PageHeader title={a.title} crumbs={[{ label: 'Actualités', to: '/actualites' }, { label: a.category }]} />
      <article className="container narrow page-body">
        <p className="card-meta"><span className="badge">{a.category}</span>{a.demo && <DemoBadge />}<time dateTime={a.date}>{formatDate(a.date)}</time></p>
        {a.image && <img className="article-img" src={asset(a.image)} alt="" />}
        <Markdown source={a.body} />
        <ShareLinks title={a.title} />
        <p><Link className="text-link" to="/actualites">Retour aux actualités</Link></p>
      </article>
    </>
  );
}
