import { site } from '../config/site';
import { annuaire } from '../utils/content';
import { Badge, DemoBadge, EmptyState, FactList, PageHeader, SideFilter } from '../components/ui';
import { useFilter } from '../hooks/useFilter';
import { usePageMeta } from '../hooks/usePageMeta';
import { formatDate } from '../utils/format';

export default function Directory() {
  usePageMeta('Annuaire biomédical');
  const f = useFilter(annuaire, (e) => ({ title: e.nom, text: `${e.description} ${e.fonction ?? ''} ${e.organisme ?? ''}`, category: e.typeProfil }));
  if (!site.annuaireEnabled) {
    return (
      <>
        <PageHeader title="Annuaire biomédical" crumbs={[{ label: 'Annuaire' }]} />
        <div className="container page-body">
          <EmptyState title="L'annuaire n'est pas encore activé">Il sera ouvert lorsque les autorisations de publication auront été obtenues.</EmptyState>
        </div>
      </>
    );
  }
  return (
    <>
      <PageHeader title="Annuaire biomédical" intro="Personnes, établissements, associations et laboratoires ayant donné leur accord de publication." crumbs={[{ label: 'Annuaire' }]} />
      <div className="container page-body">
        {annuaire.length === 0 ? <EmptyState title="Contenu à venir">Aucune entrée n'est publiée : chaque profil nécessite une autorisation.</EmptyState> : (
          <div className="with-side">
            <SideFilter {...f} catLabel="Type de profil" />
            <ul className="catalog-list">
              {f.result.length === 0 && <li><EmptyState title="Aucune entrée ne correspond" /></li>}
              {f.result.map((e) => (
                <li key={e.id} className="res-item">
                  <div className="res-type"><Badge tone="dark">{e.typeProfil}</Badge></div>
                  <div>
                    <h3>{e.nom} {e.demo && <DemoBadge />}</h3>
                    <p>{e.description}</p>
                    <FactList items={[
                      { label: 'Fonction', value: e.fonction }, { label: 'Organisme', value: e.organisme },
                      { label: 'Email', value: e.coordonneesAutorisees && e.coordonnees?.email ? <a href={`mailto:${e.coordonnees.email}`}>{e.coordonnees.email}</a> : undefined },
                      { label: 'Téléphone', value: e.coordonneesAutorisees ? e.coordonnees?.telephone : undefined },
                      { label: 'Source', value: e.source }, { label: 'Validé le', value: e.dateValidation ? formatDate(e.dateValidation) : undefined },
                    ]} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
