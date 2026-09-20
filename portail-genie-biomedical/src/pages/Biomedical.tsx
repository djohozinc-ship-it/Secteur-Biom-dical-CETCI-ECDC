import { Link, useParams } from 'react-router-dom';
import { articles, projets, ressources, rubriques } from '../utils/content';
import { Badge, DemoBadge, DocRow, EmptyState, PageHeader } from '../components/ui';
import { Glyph } from '../components/illustrations';
import { usePageMeta } from '../hooks/usePageMeta';
import { NotFound } from './Misc';

const groupIntro: Record<string, string> = {
  Fondamentaux: "Les bases communes à tout établissement : maintenir, mesurer, sécuriser et gérer les équipements.",
  'Services et équipements': "Les équipements propres à chaque service de soins et de diagnostic.",
  Technologies: "Les technologies émergentes qui transforment les outils de santé.",
};
const groupGlyph: Record<string, string> = { Fondamentaux: 'wrench', 'Services et équipements': 'monitor', Technologies: 'chip' };

export function BiomedicalIndex() {
  usePageMeta('Génie biomédical', 'Les grands domaines du génie biomédical.');
  const groupes = Array.from(new Set(rubriques.map((r) => r.groupe)));
  return (
    <>
      <PageHeader title="Génie biomédical" eyebrow="Le secteur" intro="Le génie biomédical réunit les compétences qui permettent de choisir, installer, utiliser et maintenir en sécurité les équipements de santé. Voici ses grands domaines." crumbs={[{ label: 'Génie biomédical' }]} />
      <div className="container page-body">
        {groupes.map((g) => (
          <section key={g} className="domain-block" aria-labelledby={`g-${g}`}>
            <div className="domain-block-head">
              <Glyph name={groupGlyph[g] ?? 'doc'} />
              <div><h2 id={`g-${g}`}>{g}</h2><p>{groupIntro[g]}</p></div>
            </div>
            <ol className="domain-index">
              {rubriques.filter((r) => r.groupe === g).map((r) => (
                <li key={r.slug}>
                  <h3><Link to={`/genie-biomedical/${r.slug}`}>{r.title}</Link></h3>
                  <p>{r.intro}</p>
                  <p className="chips-inline">{r.themes.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}

export function BiomedicalDetail() {
  const { slug } = useParams();
  const idx = rubriques.findIndex((x) => x.slug === slug);
  const r = rubriques[idx];
  usePageMeta(r?.title, r?.intro);
  if (!r) return <NotFound />;
  const arts = articles.filter((a) => a.rubrique === r.slug && a.statut === 'publie');
  const res = ressources.filter((x) => x.rubrique === r.slug);
  const prj = projets.filter((x) => x.rubrique === r.slug);
  const prev = rubriques[idx - 1];
  const next = rubriques[idx + 1];
  return (
    <>
      <PageHeader title={r.title} eyebrow={r.groupe} intro={r.intro} crumbs={[{ label: 'Génie biomédical', to: '/genie-biomedical' }, { label: r.title }]} />
      <div className="container page-body reading">
        <div className="reading-main">
          <section id="themes" aria-labelledby="t-themes">
            <h2 id="t-themes">Thèmes abordés</h2>
            <ul className="theme-list">{r.themes.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="muted">Présentation générale. Des contenus détaillés et vérifiés seront ajoutés progressivement.</p>
          </section>
          <section id="ressources" aria-labelledby="t-res">
            <h2 id="t-res">Ressources associées</h2>
            {res.length ? <ul className="plain">{res.map((x) => <li key={x.id}><strong>{x.title}</strong> <Badge tone="dark">{x.typeDocument}</Badge>{x.demo && <> <DemoBadge /></>}<br /><span className="muted">{x.description}</span></li>)}</ul>
              : <EmptyState title="Ressources à venir">Aucune ressource n'est encore associée à ce domaine.</EmptyState>}
          </section>
          <section id="articles" aria-labelledby="t-art">
            <h2 id="t-art">Articles associés</h2>
            {arts.length ? <div className="doclist">{arts.map((a) => <DocRow key={a.slug} to={`/actualites/${a.slug}`} date={a.date} tag={a.category} title={a.title} summary={a.summary} demo={a.demo} />)}</div>
              : <EmptyState title="Articles à venir">Aucun article n'est encore associé à ce domaine.</EmptyState>}
          </section>
          {prj.length > 0 && (
            <section id="projets" aria-labelledby="t-prj">
              <h2 id="t-prj">Projets liés</h2>
              <ul className="plain">{prj.map((x) => <li key={x.id}><Link to={`/projets/${x.id}`}>{x.name}</Link> <Badge tone="ochre">{x.status}</Badge>{x.demo && <> <DemoBadge /></>}</li>)}</ul>
            </section>
          )}
          <nav className="prev-next" aria-label="Autres domaines">
            {prev ? <Link to={`/genie-biomedical/${prev.slug}`}>← {prev.title}</Link> : <span />}
            {next ? <Link to={`/genie-biomedical/${next.slug}`}>{next.title} →</Link> : <span />}
          </nav>
        </div>
        <aside className="reading-side toc" aria-label="Sommaire">
          <p className="side-title">Sur cette page</p>
          <ul className="plain">
            <li><a href="#themes">Thèmes abordés</a></li>
            <li><a href="#ressources">Ressources associées</a></li>
            <li><a href="#articles">Articles associés</a></li>
            {prj.length > 0 && <li><a href="#projets">Projets liés</a></li>}
          </ul>
          <p className="side-title">Dans « {r.groupe} »</p>
          <ul className="plain">{rubriques.filter((x) => x.groupe === r.groupe).map((x) => <li key={x.slug}>{x.slug === r.slug ? <strong>{x.title}</strong> : <Link to={`/genie-biomedical/${x.slug}`}>{x.title}</Link>}</li>)}</ul>
        </aside>
      </div>
    </>
  );
}
