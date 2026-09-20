import { Link, useParams } from 'react-router-dom';
import { articles, projets, ressources, rubriques } from '../utils/content';
import { Card, EmptyState, Grid, PageHeader, Section } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';
import { NotFound } from './Misc';

export function BiomedicalIndex() {
  usePageMeta('Génie biomédical', 'Les grands domaines du génie biomédical.');
  const groupes = Array.from(new Set(rubriques.map((r) => r.groupe)));
  return (
    <>
      <PageHeader title="Génie biomédical" intro="Les grands domaines du secteur. Chaque domaine regroupe une présentation, des ressources et des articles associés." crumbs={[{ label: 'Génie biomédical' }]} />
      {groupes.map((g, i) => (
        <Section key={g} title={g} tone={i % 2 ? 'mist' : undefined}>
          <Grid>{rubriques.filter((r) => r.groupe === g).map((r) => <Card key={r.slug} to={`/genie-biomedical/${r.slug}`} title={r.title} summary={r.intro} />)}</Grid>
        </Section>
      ))}
    </>
  );
}

export function BiomedicalDetail() {
  const { slug } = useParams();
  const r = rubriques.find((x) => x.slug === slug);
  usePageMeta(r?.title, r?.intro);
  if (!r) return <NotFound />;
  const arts = articles.filter((a) => a.rubrique === r.slug && a.statut === 'publie');
  const res = ressources.filter((x) => x.rubrique === r.slug);
  const prj = projets.filter((x) => x.rubrique === r.slug);
  return (
    <>
      <PageHeader title={r.title} intro={r.intro} crumbs={[{ label: 'Génie biomédical', to: '/genie-biomedical' }, { label: r.title }]} />
      <Section title="Thèmes abordés">
        <ul className="checklist">{r.themes.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="muted">Présentation générale. Des contenus détaillés et vérifiés seront ajoutés progressivement.</p>
      </Section>
      <Section title="Articles associés" tone="mist">
        {arts.length ? <Grid>{arts.map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} />)}</Grid> : <EmptyState title="Contenu à venir">Aucun article pour ce domaine pour le moment.</EmptyState>}
      </Section>
      <Section title="Ressources">
        {res.length ? <Grid>{res.map((x) => <Card key={x.id} tag={x.category} title={x.title} summary={x.description} demo={x.demo} />)}</Grid> : <EmptyState title="Contenu à venir">Aucune ressource pour ce domaine pour le moment.</EmptyState>}
      </Section>
      {prj.length > 0 && <Section title="Projets liés" tone="mist"><Grid>{prj.map((x) => <Card key={x.id} to={`/projets/${x.id}`} tag={x.status} title={x.name} summary={x.description} demo={x.demo} />)}</Grid></Section>}
      <div className="container page-body"><Link className="text-link" to="/genie-biomedical">Tous les domaines</Link></div>
    </>
  );
}
