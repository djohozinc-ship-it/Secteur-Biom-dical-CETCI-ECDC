import { useSearchParams } from 'react-router-dom';
import { ressources } from '../utils/content';
import { Badge, DemoBadge, EmptyState, FactList, PageHeader, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../utils/format';
import { resourceCategories } from '../utils/taxonomy';

export default function Resources() {
  usePageMeta('Ressources techniques', 'Fiches techniques, guides, tutoriels, modèles de maintenance et références.');
  const [params] = useSearchParams();
  const f = useFilter(ressources, (r) => ({ title: r.title, text: `${r.description} ${r.source ?? ''} ${r.auteur ?? ''}`, category: r.category }), { cat: params.get('cat') ?? '' });
  const counts: Record<string, number> = {};
  ressources.forEach((r) => { counts[r.category] = (counts[r.category] ?? 0) + 1; });
  const cats = Array.from(new Set([...resourceCategories.map((c) => c.label), ...f.categories]));
  const activeDesc = resourceCategories.find((c) => c.label === f.cat)?.desc;
  return (
    <>
      <PageHeader title="Ressources techniques" eyebrow="Bibliothèque" intro="Fiches, guides, tutoriels et références. Seuls les documents dont la diffusion est autorisée sont proposés, avec leur source." crumbs={[{ label: 'Ressources' }]} />
      <div className="container page-body">
        <div className="with-side">
          <SideFilter {...f} categories={cats} counts={counts} />
          <div>
            {f.cat && activeDesc && <p className="cat-desc"><strong>{f.cat}</strong> — {activeDesc}</p>}
            {ressources.length === 0 ? <EmptyState title="Le catalogue est en cours de constitution">Aucune ressource n'est encore publiée. Chaque entrée indiquera son type de document, sa source, sa date et son auteur.</EmptyState>
              : f.result.length === 0 ? <EmptyState title="Aucune ressource ne correspond">Essayez d'autres mots-clés ou une autre catégorie.</EmptyState> : (
              <ul className="catalog-list">
                {f.result.map((r) => (
                  <li key={r.id} className="res-item">
                    <div className="res-type"><Badge tone="dark">{r.typeDocument}</Badge></div>
                    <div>
                      <div className="tags"><Badge>{r.category}</Badge>{r.demo && <DemoBadge />}</div>
                      <h3>{r.title}</h3>
                      <p>{r.description}</p>
                      <FactList items={[{ label: 'Source', value: r.source }, { label: 'Auteur', value: r.auteur }, { label: 'Date', value: r.date }]} />
                      {r.url ? <a className="btn btn-small" href={asset(r.url)} target="_blank" rel="noopener noreferrer">Ouvrir la ressource</a> : <span className="muted">Lien à venir</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
