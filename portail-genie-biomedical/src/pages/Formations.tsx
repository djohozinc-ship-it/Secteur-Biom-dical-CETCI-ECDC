import { formations } from '../utils/content';
import { Badge, DemoBadge, EmptyState, FactList, PageHeader, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../utils/format';
import type { Formation } from '../types';

export default function Formations() {
  usePageMeta('Formations et établissements', "Formations en génie biomédical et établissements d'enseignement.");
  const f = useFilter(formations, (x) => ({ title: x.formation ?? x.etablissement, text: `${x.etablissement} ${x.description} ${x.ville ?? ''} ${x.diplome ?? ''} ${x.niveau ?? ''}`, category: x.type }));
  // Regroupement par établissement
  const byEtab = new Map<string, Formation[]>();
  f.result.forEach((x) => byEtab.set(x.etablissement, [...(byEtab.get(x.etablissement) ?? []), x]));
  return (
    <>
      <PageHeader title="Formations et établissements" eyebrow="Se former" intro="Fiches organisées par établissement et par niveau. Les informations sont à vérifier auprès des établissements avant toute décision." crumbs={[{ label: 'Formations' }]} />
      <div className="container page-body">
        {formations.length === 0 ? (
          <EmptyState title="Fiches en cours de vérification">Aucune formation ni aucun établissement n'est publié tant que les informations n'ont pas été vérifiées auprès des sources officielles.</EmptyState>
        ) : (
          <div className="with-side">
            <SideFilter {...f} catLabel="Type" />
            <div>
              {byEtab.size === 0 ? <EmptyState title="Aucun résultat" /> : Array.from(byEtab.entries()).map(([etab, list]) => {
                const head = list[0];
                return (
                  <section key={etab} className="etab" aria-labelledby={`e-${head.id}`}>
                    <header>
                      <h2 id={`e-${head.id}`}>{etab}</h2>
                      <p className="meta">{head.ville ?? ''}{head.demo && <> <DemoBadge /></>}</p>
                    </header>
                    {list.map((x) => (
                      <article key={x.id} className="formation">
                        <div className="tags"><Badge>{x.type}</Badge>{x.niveau && <Badge tone="ochre">{x.niveau}</Badge>}</div>
                        {x.formation && <h3>{x.formation}</h3>}
                        <p>{x.description}</p>
                        <FactList items={[
                          { label: 'Diplôme', value: x.diplome }, { label: 'Admission', value: x.admission }, { label: 'Contact', value: x.contact },
                          { label: 'Source', value: x.source }, { label: 'Vérifié le', value: x.dateVerification ? formatDate(x.dateVerification) : undefined },
                        ]} />
                        {x.siteOfficiel ? <a className="btn btn-small" href={x.siteOfficiel} target="_blank" rel="noopener noreferrer">Site officiel</a> : <span className="muted">Site officiel à venir</span>}
                      </article>
                    ))}
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
