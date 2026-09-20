import { Link, useSearchParams } from 'react-router-dom';
import { searchIndex } from '../utils/content';
import { matchScore } from '../utils/search';
import { DemoBadge, EmptyState, PageHeader } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SearchPage() {
  usePageMeta('Recherche');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const kind = params.get('type') ?? '';
  const kinds = Array.from(new Set(searchIndex.map((i) => i.kind)));
  const results = searchIndex
    .filter((i) => !kind || i.kind === kind)
    .map((i) => ({ i, s: matchScore(q, i.title, `${i.text} ${i.category}`) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);
  const update = (k: string, v: string) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  return (
    <>
      <PageHeader title="Recherche" crumbs={[{ label: 'Recherche' }]} />
      <div className="container page-body">
        <div className="filter" role="search">
          <label className="field"><span>Mots-clés</span><input type="search" autoFocus value={q} onChange={(e) => update('q', e.target.value)} /></label>
          <label className="field"><span>Type de contenu</span>
            <select value={kind} onChange={(e) => update('type', e.target.value)}>
              <option value="">Tous</option>{kinds.map((k) => <option key={k}>{k}</option>)}
            </select>
          </label>
        </div>
        <p aria-live="polite">{q ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Saisissez un mot-clé pour rechercher.'}</p>
        {q && results.length === 0 ? <EmptyState title="Aucun résultat">Vérifiez l'orthographe ou essayez un mot plus général.</EmptyState> : (
          <ul className="results">
            {q && results.map(({ i }) => (
              <li key={i.id}><Link to={i.to}><strong>{i.title}</strong></Link> <span className="badge">{i.kind}</span> <span className="badge badge-line">{i.category}</span> {i.demo && <DemoBadge />}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
