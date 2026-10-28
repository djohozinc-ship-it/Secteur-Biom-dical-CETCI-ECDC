import { Link } from 'react-router-dom';
import { PageHeader, Section } from '../components/ui';
import { asset } from '../utils/format';
import { usePageMeta } from '../hooks/usePageMeta';

const sectors = [
  'Secteur biomédical',
  'Secteur de l’électronique',
  'Secteur de l’électricité',
  'Secteur de la maintenance des systèmes',
  'Secteur de la robotique',
  'Secteur de l’IA et informatique',
  'Secteur du génie civil et de l’architecture',
  'Secteur juridique',
  'Secteur de la mécanique',
  'Secteur du dessin industriel',
];

const poles = [
  'Sciences Biomédicales et Recherches',
  'Ingénierie et Technologies Médicales',
  'Numérique, IA et cybersécurité',
  'Qualité, Normes et Coordination',
];

const domaines = [
  { t: 'Sciences biomédicales', items: ['Physiologie humaine et animale', 'Recherche sur les pathologies et les traitements', 'Études biomédicales et analyses cliniques'] },
  { t: 'Ingénierie biomédicale', items: ['Conception de dispositifs médicaux', 'Maintenance et optimisation des équipements hospitaliers', 'Robotique médicale', 'Instrumentation biomédicale'] },
  { t: 'Imagerie et technologies médicales', items: ['Équipements d’imagerie médicale', 'Technologies de diagnostic', 'Nucléaire médical'] },
  { t: 'Santé numérique et bio-informatique', items: ['Systèmes de e-santé', 'Gestion et sécurisation des données médicales', 'Solutions numériques de suivi sanitaire'] },
  { t: 'Dispositifs et soins vétérinaires', items: ['Conception d’équipements vétérinaires', 'Suivi physiologique animal', 'Solutions pour l’élevage et la santé animale'] },
];

const valeurs = ['Rigueur scientifique', 'Éthique médicale', 'Discipline professionnelle', 'Innovation responsable', 'Excellence technique'];

const skills = [
  'Travail en équipe',
  'Gestion de projet',
  'Conception et prototypage',
  'Résolution de problèmes',
  'Documentation technique',
  'Communication scientifique',
];

export default function About() {
  usePageMeta(
    'À propos',
    'Le Secteur Biomédical du CETCI/ECDC : un groupe d’étudiants en génie biomédical au sein d’une organisation privée et indépendante au Bénin. Pôles, activités et vision.'
  );

  return (
    <>
      <PageHeader
        title="Le secteur biomédical du CETCI/ECDC"
        eyebrow="À propos"
        intro="Des étudiants en génie biomédical et en santé, réunis au sein d’une organisation privée et indépendante fondée en 2024."
        crumbs={[{ label: 'À propos' }]}
      />

      <main>
        <Section title="Le CETCI/ECDC" id="cetci">
          <div className="about-intro-grid">
            <div className="prose">
              <p>
                Le <strong>Centre d’Élaboration des Technologies de Conception en Ingénierie / Engineering Concepts Development Center (CETCI/ECDC)</strong> est une organisation privée et indépendante, fondée en 2024 à l’initiative d’une association d’étudiants. Elle réunit plus de 24 étudiants, issus notamment de l’École Polytechnique d’Abomey-Calavi (EPAC), de l’Institut National Supérieur de Technologie Industrielle (INSTI), de la Faculté des Sciences de la Santé (FSS) et de l’Université Grenoble Alpes.
              </p>
              <p>
                L’idée de départ est simple : rapprocher ce qu’on apprend en cours des problèmes rencontrés sur le terrain, et s’entraîner à y répondre en concevant soi-même. Un besoin identifié devient une idée, puis un concept, un prototype et, avec le temps, une solution utilisable.
              </p>
              <p>
                Le CETCI/ECDC est organisé en dix secteurs. Un même projet peut en mobiliser plusieurs : la mécanique pour la forme d’un dispositif, l’électronique pour sa commande, l’informatique pour son logiciel, le secteur biomédical pour le besoin de santé.
              </p>
              <ul className="about-sector-grid">
                {sectors.map((sector) => <li key={sector}>{sector}</li>)}
              </ul>
            </div>

            <aside className="about-identity">
              <img src={asset('images/logo-cetci.png')} alt="Logo du CETCI/ECDC" />
              <p><strong>Fondation</strong><span>2024</span></p>
              <p><strong>Statut</strong><span>Organisation privée et indépendante</span></p>
              <p><strong>Membres</strong><span>Plus de 24 étudiants</span></p>
              <p><strong>Pays</strong><span>Bénin</span></p>
            </aside>
          </div>
        </Section>

        <Section title="Le secteur biomédical" tone="paper" id="biomedical">
          <div className="about-biomedical-head">
            <img src={asset('images/logo-secteur-biomedical.png')} alt="Logo du Secteur Biomédical CETCI/ECDC" />
            <div className="prose">
              <p>
                Le secteur biomédical est l’un de ces dix secteurs. Il réunit <strong>sept étudiants</strong>, notamment de l’EPAC et de la FSS, et il est dirigé par <strong>Cédric DJOHOZIN</strong>, chef du secteur depuis sa création. Les étudiants en maintenance biomédicale y côtoient des étudiants en sciences de la santé : les uns connaissent les machines, les autres les besoins des patients et des soignants.
              </p>
              <p>
                Sa mission est de développer les compétences scientifiques et techniques de ses membres dans le domaine biomédical, de concevoir des dispositifs et des solutions de santé, de promouvoir l’innovation en santé humaine et animale, de contribuer à la digitalisation des structures de santé et à la recherche appliquée aux problèmes de santé locaux.
              </p>
              <p>
                Chaque réalisation part d’un besoin de santé réel, avec une attention au coût, à la facilité d’utilisation, à la maintenance et à la disponibilité des composants.
              </p>
              <p className="notice">
                Le secteur ne vend pas d’équipements médicaux et n’est pas un organisme public. Ses réalisations sont des travaux d’étudiants, notamment des mémoires de fin de formation de cycle licence, et des prototypes : aucune n’est un dispositif médical certifié.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Quatre pôles" id="poles">
          <div className="prose">
            <p>
              Pour s’organiser, le secteur est réparti en quatre pôles. Vous retrouvez chaque membre et son pôle sur la page <Link to="/membres">Membres</Link>.
            </p>
          </div>
          <ol className="about-poles">
            {poles.map((pole, index) => <li key={pole}><span>{String(index + 1).padStart(2, '0')}</span><strong>{pole}</strong></li>)}
          </ol>
        </Section>

        <Section title="Domaines de compétence" tone="paper" id="domaines">
          <div className="about-domains">
            {domaines.map((d) => (
              <div key={d.t}>
                <h3>{d.t}</h3>
                <ul className="theme-list">{d.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Ce que les membres y apprennent" id="competences">
          <div className="about-two-col">
            <div className="prose">
              <p>
                Le secteur offre un cadre pour apprendre à identifier un problème, analyser un besoin, chercher des solutions, concevoir un système, réaliser un prototype, le tester et l’améliorer.
              </p>
              <p>
                Au-delà des connaissances techniques, c’est aussi une école de méthode : travailler en équipe, mener un projet, documenter son travail et le présenter.
              </p>
              <ul className="theme-list">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
            <figure className="fig fig-wide about-figure">
              <div className="fig-frame">
                <img src={asset('images/equipe-secteur-biomedical.jpg')} alt="Membres du CETCI/ECDC en polos bleu clair, devant un tableau blanc" loading="lazy" />
              </div>
              <figcaption>Des membres du CETCI/ECDC.</figcaption>
            </figure>
          </div>
        </Section>

        <Section title="Une distinction au sein de la communauté" tone="paper" id="distinction">
          <div className="prose">
            <p>
              Lors du festival communautaire <strong>« 1 mot, 1 idée »</strong> du CETCI/ECDC, le secteur biomédical a été désigné <strong>secteur champion à deux reprises</strong>. Ces deux victoires sont inscrites au Hall of Fame du festival.
            </p>
          </div>
        </Section>

        <Section title="Notre vision" id="vision">
          <div className="about-future">
            <div className="prose">
              <p>
                Les besoins de santé du Bénin ne sont pas toujours ceux pour lesquels les équipements importés ont été conçus : coût, pièces détachées, infrastructures, conditions d’utilisation. Le secteur veut apprendre à concevoir des solutions pensées dès le départ pour être accessibles et faciles à maintenir sur place.
              </p>
              <p>
                À long terme, le secteur ambitionne de devenir un pôle de référence en ingénierie biomédicale et en santé numérique, et un incubateur de solutions biomédicales adaptées aux réalités africaines. Le chemin est progressif : se former, expérimenter, concevoir, prototyper, améliorer.
              </p>
              <p><strong>Nos valeurs :</strong> {valeurs.join(', ').toLowerCase()}.</p>
              <blockquote>
                Ne pas seulement importer les technologies dont nous avons besoin, mais développer progressivement la capacité de concevoir celles qui répondent à nos propres réalités.
              </blockquote>
            </div>
            <aside className="about-closing">
              <p className="eyebrow">CETCI / ECDC</p>
              <p className="statement">Concevoir aujourd’hui les solutions technologiques de demain.</p>
              <Link className="more-link" to="/membres">Découvrir les membres <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </Section>
      </main>
    </>
  );
}
