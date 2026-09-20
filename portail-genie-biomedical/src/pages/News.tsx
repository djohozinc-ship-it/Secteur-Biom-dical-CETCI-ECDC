import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../utils/content';
import { ArchiveTabs, Badge, DemoBadge, DocRow, EmptyState, Markdown, PageHeader, Pager, ShareLinks, SideFilter } from '../components/ui';
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
  const p = usePagination(f.result, 8);
  const counts: Record<string, number> = {};
  list.forEach((a) => { counts[a.category] = (counts[a.category] ?? 0) + 1; });
  return (
    <>
      <PageHeader title="Actualités" eyebrow="Publications" intro="Nouvelles, analyses et vie de la communauté du génie biomédical." crumbs={[{ label: 'Actualités' }]} />
      <div className="container page-body">
        {articles.length === 0 ? <EmptyState title="Aucune actualité pour le moment">Les premières actualités seront publiées prochainement, avec leur date et leur source.</EmptyState> : (
          <div className="with-side">
            <SideFilter {...f} counts={counts} />
            <div>
              <ArchiveTabs archives={archives} setArchives={setArchives} labelLive="Récentes" />
              {f.result.length === 0 ? <EmptyState title="Aucun article ne correspond">Essayez d'autres mots-clés ou une autre catégorie.</EmptyState> : (
                <>
                  <div className="doclist">
                    {p.slice.map((a) => (
                      <DocRow key={a.slug} to={`/actualites/${a.slug}`} date={a.date} tag={a.category} title={a.title} summary={a.summary} demo={a.demo} meta={a.source ? `Source : ${a.source}` : undefined} />
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

export function NewsDetail() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  usePageMeta(a?.title, a?.summary);
  if (!a) return <NotFound />;
  const related = articles.filter((x) => x.slug !== a.slug && x.statut === 'publie' && (x.category === a.category || (a.rubrique && x.rubrique === a.rubrique))).slice(0, 3);
  return (
    <>
      <PageHeader title={a.title} intro={a.summary} crumbs={[{ label: 'Actualités', to: '/actualites' }, { label: a.category }]} />
      <div className="container page-body reading">
        <article className="reading-main">
          <p className="tags">
            <Badge>{a.category}</Badge>{a.demo && <DemoBadge />}{a.statut === 'archive' && <Badge tone="line">Archive</Badge>}
          </p>
          <p className="meta"><time dateTime={a.date}>Publié le {formatDate(a.date)}</time>{a.dateMiseAJour && <> · <time dateTime={a.dateMiseAJour}>Mis à jour le {formatDate(a.dateMiseAJour)}</time></>}</p>
          {a.image && <img className="article-img" src={asset(a.image)} alt={a.imageAlt ?? ''} />}
          <Markdown source={a.body} />
          {a.source && <p className="source-box">Source : {a.sourceUrl ? <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer">{a.source}</a> : a.source}</p>}
          <ShareLinks title={a.title} />
        </article>
        <aside className="reading-side" aria-label="Pour aller plus loin">
          {a.rubrique && <p><Link className="more-link" to={`/genie-biomedical/${a.rubrique}`}>Domaine associé <span aria-hidden="true">→</span></Link></p>}
          <p className="side-title">À lire aussi</p>
          {related.length ? <ul className="plain">{related.map((r) => <li key={r.slug}><Link to={`/actualites/${r.slug}`}>{r.title}</Link></li>)}</ul> : <p className="muted">Pas d'autre article lié.</p>}
          <p><Link className="more-link" to="/actualites">← Toutes les actualités</Link></p>
        </aside>
      </div>
    </>
  );
}
