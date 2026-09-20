import { PageHeader, Section, Grid } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

// Contenu provisoire : à remplacer lorsque les informations officielles seront disponibles.
const blocks = [
  { title: 'Mission', text: "Rassembler et partager les connaissances du génie biomédical au Bénin, et valoriser celles et ceux qui font fonctionner les équipements de santé." },
  { title: 'Vision', text: "Une communauté biomédicale active, connectée et reconnue, qui contribue à des soins plus sûrs et mieux équipés." },
  { title: 'Valeurs', text: "Rigueur technique, partage, entraide, intégrité et respect de la sécurité des patients." },
];
const objectifs = ['Informer les professionnels du secteur', 'Valoriser les ingénieurs et techniciens biomédicaux', 'Partager des ressources techniques', 'Présenter les formations et établissements', 'Mettre en avant les projets et innovations', 'Faciliter la mise en relation des acteurs'];
const publics = ['Étudiants', 'Techniciens et ingénieurs biomédicaux', 'Enseignants et chercheurs', 'Établissements de santé', 'Entreprises et partenaires'];

export default function About() {
  usePageMeta('À propos', 'Mission, vision, objectifs et valeurs du portail.');
  return (
    <>
      <PageHeader title="À propos" intro="Présentation provisoire de la plateforme. Les informations officielles (statut, partenaires) seront ajoutées lorsqu'elles seront disponibles." crumbs={[{ label: 'À propos' }]} />
      <Section title="Mission, vision et valeurs"><Grid>{blocks.map((b) => <article key={b.title} className="card"><div className="card-body"><h3>{b.title}</h3><p>{b.text}</p></div></article>)}</Grid></Section>
      <Section title="Objectifs" tone="mist"><ul className="checklist">{objectifs.map((o) => <li key={o}>{o}</li>)}</ul></Section>
      <Section title="Publics concernés"><ul className="checklist">{publics.map((o) => <li key={o}>{o}</li>)}</ul></Section>
    </>
  );
}
