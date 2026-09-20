import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../utils/content';
import { ArchiveTabs, Card, EmptyState, FilterBar, Grid, Markdown, PageHeader, Pager, ShareLinks, DemoBadge } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePagination } from '../hooks/usePagination';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset, formatDate } from '../utils/format';
import { NotFound } from './Misc';

export function NewsList() {
  usePageMeta('Actualités', 'Toutes les actualités du portail.');
  const [archives, setArchives] = useState(false);
  const list = articles.filter((a) => (a.statut === 'archive') === archives);
  const f = useFilter(list, (a) => ({ title: a.title, text: `${a.summary} ${a.body}`, category: a.category }));
  const p = usePagination(f.result, 6);
  return (
    <>
      <PageHeader title="Actualités" intro="Nouvelles, analyses et vie de la communauté." crumbs={[{ label: 'Actualités' }]} />
      <div className="container page-body">
        <ArchiveTabs archives={archives} setArchives={setArchives} labelLive="Récentes" />
        {articles.length === 0 ? <EmptyState title="Contenu à venir">Les premières actualités seront publiées prochainement.</EmptyState> : (
          <>
            <FilterBar {...f} />
            {f.result.length === 0 ? <EmptyState title="Aucun article ne correspond">Essayez d'autres mots-clés ou une autre catégorie.</EmptyState> : (
              <>
                <Grid>{p.slice.map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} image={a.image} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} />)}</Grid>
                <Pager page={p.page} pages={p.pages} setPage={p.setPage} />
              </>
            )}
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
        <p className="card-meta">
          <span className="badge">{a.category}</span>
          {a.demo && <DemoBadge />}
          {a.statut === 'archive' && <span className="badge badge-line">Archive</span>}
          <time dateTime={a.date}>Publié le {formatDate(a.date)}</time>
          {a.dateMiseAJour && <time dateTime={a.dateMiseAJour}>Mis à jour le {formatDate(a.dateMiseAJour)}</time>}
        </p>
        {a.image && <img className="article-img" src={asset(a.image)} alt={a.imageAlt ?? ''} />}
        <Markdown source={a.body} />
        {a.source && <p className="muted">Source : {a.sourceUrl ? <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">{a.source}</a> : a.source}</p>}
        <ShareLinks title={a.title} />
        <p><Link className="text-link" to="/actualites">Retour aux actualités</Link></p>
      </article>
    </>
  );
}
