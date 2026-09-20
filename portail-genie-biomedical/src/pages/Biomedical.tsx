import { Link, useParams } from 'react-router-dom';
import { articles, projets, ressources, rubriques } from '../utils/content';
import { Card, Grid, PageHeader, Section } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';
import { NotFound } from './Misc';

export function BiomedicalIndex() {
  usePageMeta('Génie biomédical', 'Les grands domaines du génie biomédical.');
  return (
    <>
      <PageHeader title="Génie biomédical" intro="Les grands domaines du secteur. Chaque rubrique regroupe une introduction, des ressources et des articles associés." crumbs={[{ label: 'Génie biomédical' }]} />
      <div className="container page-body">
        <Grid>{rubriques.map((r) => <Card key={r.slug} to={`/genie-biomedical/${r.slug}`} title={r.title} summary={r.intro} />)}</Grid>
      </div>
    </>
  );
}

export function BiomedicalDetail() {
  const { slug } = useParams();
  const r = rubriques.find((x) => x.slug === slug);
  usePageMeta(r?.title, r?.intro);
  if (!r) return <NotFound />;
  const arts = articles.filter((a) => a.rubrique === r.slug);
  const res = ressources.filter((x) => x.rubrique === r.slug);
  const prj = projets.filter((x) => x.rubrique === r.slug);
  return (
    <>
      <PageHeader title={r.title} intro={r.intro} crumbs={[{ label: 'Génie biomédical', to: '/genie-biomedical' }, { label: r.title }]} />
      <Section title="Articles associés">
        {arts.length ? <Grid>{arts.map((a) => <Card key={a.slug} to={`/actualites/${a.slug}`} tag={a.category} date={a.date} title={a.title} summary={a.summary} demo={a.demo} />)}</Grid> : <p>Aucun article pour cette rubrique. Ajoutez <code>rubrique: {r.slug}</code> dans l'en-tête d'un article.</p>}
      </Section>
      <Section title="Ressources" tone="mist">
        {res.length ? <Grid>{res.map((x) => <Card key={x.id} tag={x.category} title={x.title} summary={x.description} demo={x.demo} />)}</Grid> : <p>Aucune ressource associée pour le moment.</p>}
      </Section>
      {prj.length > 0 && <Section title="Projets liés"><Grid>{prj.map((x) => <Card key={x.id} to={`/projets/${x.id}`} tag={x.status} title={x.name} summary={x.description} demo={x.demo} />)}</Grid></Section>}
      <div className="container page-body"><Link className="text-link" to="/genie-biomedical">Toutes les rubriques</Link></div>
    </>
  );
}
