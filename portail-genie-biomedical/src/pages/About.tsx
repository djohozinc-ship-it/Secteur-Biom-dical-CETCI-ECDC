import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { PageHeader, Section } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

const missions = [
  { title: 'Informer', text: "Rassembler les informations utiles aux professionnels et aux étudiants du génie biomédical." },
  { title: 'Partager', text: "Mettre à disposition des ressources techniques dont la diffusion est autorisée, avec leur source." },
  { title: 'Valoriser', text: "Faire connaître les projets, les prototypes et les compétences du secteur au Bénin." },
  { title: 'Relier', text: "Faciliter les échanges entre étudiants, techniciens, ingénieurs, établissements et partenaires." },
];
const publics = ['Étudiants en formation biomédicale', 'Techniciens et ingénieurs biomédicaux', 'Enseignants et chercheurs', 'Établissements de santé', 'Entreprises et partenaires du secteur'];
const valeurs = ['Rigueur technique', 'Sécurité des patients et des utilisateurs', 'Partage des connaissances', 'Intégrité et transparence des sources'];

export default function About() {
  usePageMeta('À propos', 'Mission, publics et valeurs du portail du génie biomédical.');
  return (
    <>
      <PageHeader title="À propos du portail" eyebrow="Le portail" intro={`Un portail sectoriel consacré au génie biomédical au Bénin${site.organisme ? `, porté par ${site.organisme}` : ''}.`} crumbs={[{ label: 'À propos' }]} />
      <div className="container page-body reading">
        <div className="reading-main">
          <h2>Notre statut</h2>
          <p>{site.statutMention} Les informations officielles (statut juridique, responsables, partenaires) seront publiées ici lorsqu'elles seront établies et vérifiées.</p>
          <h2>Mission</h2>
          <ul className="mission-list">{missions.map((m) => <li key={m.title}><strong>{m.title}</strong><span>{m.text}</span></li>)}</ul>
          <h2>Valeurs</h2>
          <ul className="theme-list">{valeurs.map((v) => <li key={v}>{v}</li>)}</ul>
        </div>
        <aside className="reading-side doc-card" aria-label="Publics concernés">
          <p className="side-title">Publics concernés</p>
          <ul className="plain">{publics.map((p) => <li key={p}>{p}</li>)}</ul>
          <p><Link className="more-link" to="/membres">Découvrir les membres <span aria-hidden="true">→</span></Link></p>
          <p><Link className="more-link" to="/contact">Contribuer <span aria-hidden="true">→</span></Link></p>
        </aside>
      </div>
      <Section title="Ce que le portail ne fait pas" tone="paper" id="limites">
        <ul className="theme-list">
          <li>Il ne publie aucun chiffre ni document sans source vérifiée.</li>
          <li>Il ne présente aucun prototype comme un dispositif médical certifié.</li>
          <li>Il ne publie aucune donnée personnelle sans autorisation.</li>
        </ul>
      </Section>
    </>
  );
}
