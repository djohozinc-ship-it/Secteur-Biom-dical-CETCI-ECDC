import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { PageHeader, Section } from '../components/ui';
import { asset } from '../utils/format';
import { usePageMeta } from '../hooks/usePageMeta';

const sectors = [
  'Secteur biomédical',
  'Secteur de l’électronique',
  'Secteur de l’électricité',
  'Secteur de la maintenance des systèmes',
  'Secteur de la robotique',
  'Secteur de l’IA et informatique'
  'Secteur du génie civil et de l’architecture',
  'Secteur juridique',
  'Secteur de la mécanique',
  'Secteur du dessin industriel',
];

const poles = [
  'Sciences Biomédicales et Recherches',
  'Ingénierie et Technologies Médicales',
  'Numérique, IA et cybersécurité',
  'Qualité, Normes et Coordination,
];

const skills = [
  'Travail en équipe',
  'Gestion de projet',
  'Conception et prototypage',
  'Résolution de problèmes',
  'Documentation technique',
  'Communication scientifique',
  'Innovation',
];

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="about-media-placeholder" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

export default function About() {
  usePageMeta(
    'À propos',
    'Présentation du CETCI/ECDC et du Secteur Biomédical : vision, organisation, compétences et ambition technologique.'
  );

  return (
    <>
      <PageHeader
        title="Le CETCI/ECDC : concevoir aujourd’hui les solutions technologiques de demain"
        eyebrow="À propos"
        intro="Une communauté d’ingénierie, d’innovation et de collaboration."
        crumbs={[{ label: 'À propos' }]}
      />

      <main>
        <Section title="Une communauté d’ingénierie, d’innovation et de collaboration" id="communaute">
          <div className="about-intro-grid">
            <div className="prose">
              <p>
                Le <strong>Centre d’Élaboration des Technologies de Conception en Ingénierie / Engineering Concepts Development Center (CETCI/ECDC)</strong> est une communauté fondée en 2024 à l’initiative d’une association d’étudiants, avec une ambition claire : <strong>mettre les compétences scientifiques, techniques et créatives de ses membres au service de la conception de solutions technologiques adaptées aux réalités nationales et aux besoins de la sous-région</strong>.
              </p>
              <p>
                Le CETCI/ECDC est né d’une volonté de rapprocher les connaissances académiques des problématiques concrètes rencontrées sur le terrain, tout en préparant une vision plus ambitieuse pour l’avenir : <strong>contribuer progressivement à la mise en place, sur le territoire béninois, d’un véritable espace de conception et de développement d’équipements et de solutions technologiques adaptés aux réalités du pays et de la région</strong>.
              </p>
              <p>
                Cette vision repose sur une conviction : le développement technologique ne doit pas uniquement consister à importer et à utiliser des technologies conçues ailleurs. Il doit également permettre de <strong>développer localement les compétences, les idées, les prototypes et, à terme, les solutions capables de répondre aux besoins du contexte béninois et africain</strong>.
              </p>
              <p>
                Dans cette perspective, le CETCI/ECDC constitue aujourd’hui un espace de <strong>réflexion, d’apprentissage, d’expérimentation, de conception et de collaboration</strong>. Il encourage ses membres à aller au-delà des enseignements théoriques pour explorer des approches pratiques, développer leurs compétences et participer à la conception de solutions répondant à des besoins réels.
              </p>
              <p>
                L’objectif est ainsi de créer progressivement un environnement dans lequel un besoin identifié peut être transformé en idée, puis en concept, en prototype et, à terme, en solution technologique exploitable.
              </p>
            </div>

            <aside className="about-identity">
              <img src={asset('images/logo-cetci.png')} alt="Logo du CETCI/ECDC" />
              <p><strong>Fondation</strong><span>2024</span></p>
              <p><strong>Nature</strong><span>Communauté d’ingénierie, d’innovation et de collaboration</span></p>
              <p><strong>Portée</strong><span>Bénin et sous-région</span></p>
            </aside>
          </div>
        </Section>

        <Section title="Une communauté fondée sur la diversité des compétences" tone="paper" id="diversite">
          <div className="about-two-col">
            <div className="prose">
              <p>
                La communauté rassemble aujourd’hui <strong>plus de 24 étudiants</strong> issus de différentes institutions universitaires et formations, notamment l’<strong>École Polytechnique d’Abomey-Calavi (EPAC)</strong>, l’<strong>Institut National Supérieur de Technologie Industrielle (INSTI)</strong>, la <strong>Faculté des Sciences de la Santé (FSS)</strong>, l’<strong>Université Grenoble Alpes</strong> et d’autres établissements.
              </p>
              <p>
                Cette diversité constitue l’une des principales richesses du CETCI/ECDC. Les problématiques technologiques contemporaines sont rarement limitées à une seule discipline. Concevoir un dispositif médical, un système automatisé, une machine ou une solution intelligente peut nécessiter des compétences en électronique, mécanique, informatique, électricité, robotique, maintenance, conception industrielle, sciences de la santé, architecture ou encore en droit.
              </p>
              <p>
                Le CETCI/ECDC cherche donc à créer un environnement où ces différentes compétences peuvent se rencontrer et être mobilisées autour d’un même objectif : <strong>concevoir des solutions pertinentes, fonctionnelles et adaptées à leur contexte d’utilisation</strong>.
              </p>
              <p>
                La communauté encourage ainsi la rencontre des savoir-faire, la confrontation des idées et le partage d’expériences entre des étudiants aux profils complémentaires. Chaque membre peut apporter son regard, ses connaissances et sa créativité à la réalisation d’initiatives communes.
              </p>
            </div>
            <figure className="fig fig-wide about-figure">
              <div className="fig-frame">
                <img src={asset('images/equipe-secteur-biomedical.jpg')} alt="Membres du Secteur Biomédical du CETCI/ECDC" loading="lazy" />
              </div>
              <figcaption>Équipe du Secteur Biomédical — une illustration de la dynamique collective de la communauté.</figcaption>
            </figure>
          </div>
        </Section>

        <Section title="Une organisation fondée sur la complémentarité des compétences" id="organisation">
          <div className="prose">
            <p>
              Le CETCI/ECDC s’appuie sur plusieurs secteurs spécialisés représentant différentes dimensions de l’ingénierie et de la conception technologique. Chaque secteur apporte une expertise particulière et contribue, selon ses compétences, à la réflexion et au développement des initiatives de la communauté.
            </p>
          </div>
          <ul className="about-sector-grid">
            {sectors.map((sector) => <li key={sector}>{sector}</li>)}
          </ul>
          <div className="prose">
            <p>
              Cette organisation permet de valoriser les compétences individuelles tout en encourageant les collaborations interdisciplinaires. Un projet peut ainsi mobiliser plusieurs secteurs : la mécanique peut intervenir dans la conception physique d’un dispositif, l’électronique dans son système de commande, la programmation dans son intelligence, le secteur biomédical dans la définition des besoins sanitaires et la maintenance dans la réflexion sur sa fiabilité et sa durabilité.
            </p>
            <p>
              Cette approche permet au CETCI/ECDC de favoriser une <strong>culture de conception intégrée</strong>, dans laquelle les différentes disciplines ne travaillent pas isolément mais participent à une même chaîne de développement.
            </p>
          </div>
        </Section>

        <Section title="Une vision tournée vers la souveraineté technologique" tone="paper" id="souverainete">
          <div className="about-reading">
            <div className="prose">
              <p>
                Le CETCI/ECDC porte une vision dans laquelle l’ingénierie ne se limite pas à la maîtrise des technologies existantes. Elle doit également permettre d’<strong>imaginer, concevoir, adapter et développer de nouvelles solutions à partir des réalités locales</strong>.
              </p>
              <p>
                Dans de nombreux domaines, les besoins des pays africains peuvent être différents de ceux pour lesquels certains équipements ou systèmes ont initialement été conçus. Les contraintes liées au coût, à la disponibilité des pièces détachées, aux infrastructures, aux conditions environnementales, à la maintenance ou encore aux compétences disponibles peuvent nécessiter des approches différentes.
              </p>
              <p>
                Le CETCI/ECDC souhaite donc encourager une réflexion autour de solutions pensées dès leur conception pour être <strong>adaptées, accessibles, maintenables et pertinentes dans leur environnement d’utilisation</strong>.
              </p>
              <p>
                Cette démarche participe à une ambition plus large : contribuer au développement d’une culture où le Bénin et, plus largement, les pays de la sous-région peuvent progressivement passer du statut d’utilisateurs de technologies à celui de <strong>concepteurs et de développeurs de solutions technologiques</strong>.
              </p>
            </div>
          </div>
        </Section>

        <Section title="De la formation à la conception : construire progressivement une capacité technologique locale" id="formation-conception">
          <div className="about-two-col">
            <div className="prose">
              <p>
                L’une des ambitions du CETCI/ECDC est de faire de l’expérience étudiante un véritable point de départ vers la conception technologique.
              </p>
              <p>
                La communauté offre à ses membres un cadre dans lequel ils peuvent apprendre à identifier une problématique, analyser un besoin, rechercher des solutions, concevoir un système, expérimenter, réaliser des prototypes, tester et améliorer leurs idées.
              </p>
              <p>
                Cette démarche permet également de développer des compétences qui dépassent les connaissances purement académiques : <strong>travail en équipe, gestion de projet, conception, prototypage, résolution de problèmes, documentation technique, communication scientifique et innovation</strong>.
              </p>
              <ul className="theme-list">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </div>
            <div>
              <MediaPlaceholder label="Photographie d’un prototype ou d’une séance de conception à intégrer" />
            </div>
          </div>
        </Section>

        <Section title="Le secteur biomédical : l’ingénierie au service de la santé" tone="paper" id="biomedical">
          <div className="about-biomedical-head">
            <img src={asset('images/logo-secteur-biomedical.png')} alt="Logo du Secteur Biomédical CETCI/ECDC" />
            <div className="prose">
              <p>
                Le <strong>secteur biomédical constitue l’un des piliers essentiels de la communauté CETCI/ECDC</strong>. Placé sous la direction de <strong>Cédric DJOHOZIN</strong>, il participe activement aux activités et aux initiatives de la communauté en apportant une perspective orientée vers les sciences de la santé, les technologies médicales et les besoins du milieu hospitalier.
              </p>
              <p>
                À la croisée de l’ingénierie et de la santé, le secteur biomédical s’intéresse à la manière dont les connaissances scientifiques et les technologies peuvent contribuer à répondre aux problématiques rencontrées dans le domaine sanitaire.
              </p>
              <p>
                Son approche repose sur la complémentarité entre la compréhension des besoins de santé et la mobilisation des compétences techniques nécessaires à la conception de solutions adaptées.
              </p>
              <p>
                Le secteur s’inscrit ainsi dans la dynamique générale du CETCI/ECDC : <strong>transformer les connaissances en solutions, les problématiques en projets et les idées en innovations technologiques</strong>.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Une équipe pluridisciplinaire organisée en quatre pôles" id="poles">
          <div className="prose">
            <p>
              Le secteur biomédical regroupe actuellement <strong>sept étudiants issus notamment de l’EPAC et de la Faculté des Sciences de la Santé (FSS)</strong>. Cette diversité de parcours favorise la complémentarité entre les compétences en ingénierie et les connaissances liées aux sciences de la santé.
            </p>
            <p>
              Pour structurer ses activités et faciliter la collaboration, le secteur est organisé en <strong>quatre pôles complémentaires</strong>. Cette organisation permet de répartir les responsabilités, de favoriser les échanges et de mobiliser les compétences de l’équipe autour d’objectifs communs.
            </p>
          </div>
          <ol className="about-poles">
            {poles.map((pole, index) => <li key={pole}><span>{String(index + 1).padStart(2, '0')}</span><strong>{pole}</strong></li>)}
          </ol>
          <p className="muted">Les intitulés et responsabilités détaillés des pôles pourront être précisés dans les pages dédiées du secteur.</p>
        </Section>

        <Section title="De la problématique de santé à la conception d’une solution" tone="paper" id="solutions">
          <div className="about-two-col">
            <div className="prose">
              <p>
                La mission du secteur biomédical consiste à <strong>appliquer les sciences de l’ingénieur à la résolution de problématiques de santé</strong>, avec une attention particulière portée aux réalités et aux besoins locaux.
              </p>
              <p>
                Cette démarche peut notamment concerner les équipements médicaux, les systèmes électroniques, l’instrumentation, l’automatisation, les systèmes embarqués, la maintenance, la surveillance des paramètres physiologiques, les technologies d’assistance et, plus largement, les nouvelles technologies appliquées à la santé.
              </p>
              <p>
                Le secteur encourage également une réflexion autour des <strong>dispositifs médicaux intelligents</strong>, de l’intégration de capteurs, de l’électronique embarquée, de l’intelligence artificielle, de la robotique médicale et des technologies connectées.
              </p>
              <p>
                L’objectif n’est cependant pas uniquement de développer des technologies complexes. Il s’agit avant tout de rechercher des solutions <strong>utiles, pertinentes, accessibles et adaptées à leur environnement d’utilisation</strong>.
              </p>
              <p>
                Une solution biomédicale pertinente doit tenir compte de son fonctionnement technique, mais également de son coût, de sa facilité d’utilisation, de sa maintenance, de la disponibilité des composants et des compétences nécessaires à son exploitation.
              </p>
              <p>
                Cette vision place donc l’utilisateur et le besoin de santé au cœur du processus de conception.
              </p>
            </div>
            <MediaPlaceholder label="Photographie d’une activité biomédicale ou d’un prototype à intégrer" />
          </div>
        </Section>

        <Section title="Une dynamique collective reconnue au sein de la communauté" id="reconnaissance">
          <div className="prose">
            <p>
              Au-delà de ses activités liées à l’ingénierie biomédicale, le secteur participe activement à la vie communautaire du CETCI/ECDC. Sa participation aux initiatives collectives contribue à renforcer les liens entre les membres et à faire vivre les valeurs de collaboration, d’engagement, de partage et d’innovation qui caractérisent la communauté.
            </p>
            <p>
              Le secteur biomédical s’est notamment distingué lors du festival communautaire <strong>« 1 mot, 1 idée »</strong>, au cours duquel il a été désigné <strong>secteur champion à deux reprises</strong>.
            </p>
            <p>
              Ces deux distinctions successives, matérialisées par les étoiles inscrites à son <em>Hall of Fame</em> du festival, constituent des moments importants de son parcours au sein de la communauté. Elles témoignent de son implication dans les activités collectives et constituent une source de motivation supplémentaire pour poursuivre les efforts engagés.
            </p>
          </div>
          <div className="about-gallery">
            <MediaPlaceholder label="Attestation / Hall of Fame — distinction 1 à intégrer" />
            <MediaPlaceholder label="Attestation / Hall of Fame — distinction 2 à intégrer" />
          </div>
        </Section>

        <Section title="Une ambition à long terme : concevoir au Bénin pour le Bénin et au-delà" tone="paper" id="ambition">
          <div className="prose">
            <p>
              L’ambition du secteur biomédical s’inscrit dans la vision globale du CETCI/ECDC : contribuer à l’émergence progressive d’une capacité locale de conception technologique.
            </p>
            <p>
              Dans le domaine de la santé, cette ambition signifie notamment pouvoir développer au Bénin des solutions adaptées aux besoins des établissements de santé, des professionnels et des populations.
            </p>
            <p>
              À terme, le secteur souhaite contribuer à faire émerger un environnement dans lequel des étudiants, ingénieurs, professionnels de santé, chercheurs et partenaires pourront collaborer pour <strong>concevoir, prototyper, tester et développer des dispositifs et technologies biomédicales répondant aux réalités africaines</strong>.
            </p>
            <p>
              Cette vision dépasse la simple utilisation des technologies existantes. Elle s’inscrit dans une perspective de développement de compétences et de capacités locales permettant progressivement de participer à toute la chaîne de valeur technologique.
            </p>
            <p>
              L’objectif à long terme est de contribuer à la naissance d’une véritable dynamique de <strong>conception et de développement de dispositifs médicaux au Bénin</strong>, avec la possibilité, lorsque les conditions techniques, réglementaires, industrielles et économiques seront réunies, de faire évoluer certaines innovations vers une production destinée non seulement au marché national, mais également à la sous-région et à d’autres marchés.
            </p>
            <blockquote>
              Ne pas seulement importer les technologies dont nous avons besoin, mais développer progressivement la capacité de concevoir celles qui répondent à nos propres réalités.
            </blockquote>
          </div>
        </Section>

        <Section title="Une vision pour l’avenir" id="avenir">
          <div className="about-future">
            <div className="prose">
              <p>
                Le CETCI/ECDC entend poursuivre son développement en renforçant les compétences de ses membres, en multipliant les collaborations interdisciplinaires et en encourageant la réalisation de projets concrets.
              </p>
              <p>
                À travers ses différents secteurs, la communauté souhaite contribuer à faire émerger une nouvelle génération de concepteurs, d’ingénieurs, de chercheurs et d’innovateurs capables d’identifier les défis de leur environnement et de proposer des réponses technologiques pertinentes.
              </p>
              <p>
                Le chemin est progressif : <strong>former, expérimenter, concevoir, prototyper, améliorer, développer et, à terme, produire.</strong>
              </p>
              <p>
                Le CETCI/ECDC se positionne ainsi comme un espace où les idées peuvent commencer à prendre forme aujourd’hui, avec la volonté de contribuer demain à une capacité technologique plus forte, plus autonome et davantage tournée vers les besoins du Bénin et de l’Afrique.
              </p>
            </div>
            <aside className="about-closing">
              <p className="eyebrow">CETCI / ECDC</p>
              <p className="statement">Concevoir aujourd’hui les solutions technologiques de demain.</p>
              <Link className="more-link" to="/membres">Découvrir les membres <span aria-hidden="true">→</span></Link>
            </aside>
          </div>
        </Section>
      </main>

      <Section title="À propos du portail" tone="dark" id="portail">
        <p>
          {site.statutMention} Le contenu institutionnel du portail est publié à partir des informations communiquées par la communauté et pourra être complété au fur et à mesure de la formalisation des documents, responsables, partenaires et références officielles.
        </p>
      </Section>
    </>
  );
}
