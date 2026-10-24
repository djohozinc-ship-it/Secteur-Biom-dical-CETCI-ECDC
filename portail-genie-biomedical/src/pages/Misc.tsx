import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const lastUpdated = '24 octobre 2026';

function LegalIntro() {
  return (
    <div className="legal-meta">
      <p><strong>Dernière mise à jour :</strong> {lastUpdated}</p>
    </div>
  );
}

const contactLine = site.contact.email || 'via la page Contact du site';

export function Legal() {
  usePageMeta('Mentions légales');
  return (
    <>
      <PageHeader title="Mentions légales" crumbs={[{ label: 'Mentions légales' }]} />
      <article className="container legal-page prose">
        <LegalIntro />

        <h2>1. Éditeur du site</h2>
        <p>
          Ce site est édité par le <strong>Secteur Biomédical du CETCI/ECDC</strong>, groupe d'étudiants
          du CETCI/ECDC (Centre d'Élaboration des Technologies de Conception en Ingénierie), une
          organisation privée et indépendante.
        </p>
        <dl className="legal-facts">
          <div><dt>Éditeur</dt><dd>Secteur Biomédical du CETCI/ECDC</dd></div>
          <div><dt>Statut</dt><dd>Groupe d'étudiants d'une organisation privée et indépendante</dd></div>
          <div><dt>Pays</dt><dd>Bénin</dd></div>
          <div><dt>Responsable de la publication</dt><dd>Cédric DJOHOZIN, chef du secteur</dd></div>
          <div><dt>Contact</dt><dd>{contactLine}</dd></div>
          <div><dt>Hébergement</dt><dd>GitHub Pages (GitHub, Inc.)</dd></div>
          <div><dt>Adresse du site</dt><dd>{site.siteUrl}</dd></div>
        </dl>
        <p className="notice">
          Ce site n'est pas un site officiel du Gouvernement du Bénin, du Ministère de la Santé, de l'EPAC
          ni d'une autre institution publique. Le secteur ne vend pas d'équipements médicaux.
        </p>

        <h2>2. Contenus</h2>
        <p>
          Les informations publiées présentent les activités, les projets et les membres du secteur. Elles sont
          données à titre informatif et ne remplacent pas l'avis d'un professionnel de santé.
        </p>
        <p className="notice">
          Les projets présentés sont des prototypes ou des travaux d'apprentissage. Aucun n'est homologué,
          certifié ou autorisé pour un usage clinique.
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          Les textes, photographies, schémas, logos et autres contenus produits par le secteur ne peuvent pas être
          reproduits ou utilisés à des fins commerciales sans autorisation. Les contenus appartenant à des tiers
          restent la propriété de leurs auteurs. Quand un projet est publié sous licence open source, cette licence
          s'applique à ce projet. Pour une demande d'autorisation, écrivez-nous depuis la page <Link to="/contact">Contact</Link>.
        </p>

        <h2>4. Photographies et droit à l'image</h2>
        <p>
          Les photographies de membres sont publiées avec leur accord. Toute personne qui souhaite qu'une photographie
          la concernant soit retirée peut nous le demander depuis la page <Link to="/contact">Contact</Link>.
        </p>

        <h2>5. Liens externes</h2>
        <p>
          Le site contient des liens vers d'autres sites (portfolio, GitHub, LinkedIn, etc.). Nous ne contrôlons pas
          leur contenu.
        </p>

        <h2>6. Responsabilité</h2>
        <p>
          Nous nous efforçons de publier des informations exactes et à jour, sans pouvoir garantir l'absence d'erreur
          ni la disponibilité permanente du site.
        </p>
      </article>
    </>
  );
}

export function Privacy() {
  usePageMeta('Confidentialité');
  return (
    <>
      <PageHeader title="Politique de confidentialité" crumbs={[{ label: 'Confidentialité' }]} />
      <article className="container legal-page prose">
        <LegalIntro />

        <h2>1. Ce que le site collecte</h2>
        <p>
          Le site n'a ni compte utilisateur, ni base de données, ni cookies publicitaires, ni outil de statistiques.
          Il ne collecte aucune donnée personnelle par lui-même.
        </p>
        <p>
          Le bouton « Ouvrir ma messagerie » de la page Contact ouvre l'application de messagerie de votre appareil
          avec un message prérempli. Rien n'est enregistré sur le site : c'est vous qui envoyez le message.
        </p>

        <h2>2. Hébergement et services externes</h2>
        <p>
          Le site est hébergé par GitHub Pages, qui peut enregistrer des données techniques de connexion (adresse IP,
          navigateur) selon sa propre politique de confidentialité. Les vidéos intégrées depuis un autre site, par exemple
          YouTube, dépendent de la politique de ce site.
        </p>

        <h2>3. Données de santé</h2>
        <p className="notice">
          <strong>Ne nous envoyez pas de données médicales personnelles</strong> (dossier, résultats d'examens,
          antécédents). Le site n'est pas fait pour les recevoir.
        </p>

        <h2>4. Profils des membres</h2>
        <p>
          Les profils publiés sur la page Membres (nom, photographie, fonction, parcours) le sont avec l'accord des
          personnes concernées. Chacune peut demander la modification ou le retrait de son profil.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Vous pouvez demander l'accès à vos données, leur correction ou leur suppression depuis la page{' '}
          <Link to="/contact">Contact</Link>.
        </p>

        <h2>6. Modifications</h2>
        <p>La date de dernière mise à jour est indiquée en haut de cette page.</p>

        <h2>7. Contact</h2>
        <p>
          <strong>Secteur Biomédical CETCI/ECDC</strong>, Bénin<br />
          {contactLine}
        </p>
      </article>
    </>
  );
}

export function Terms() {
  usePageMeta("Conditions d'utilisation");
  return (
    <>
      <PageHeader title="Conditions d'utilisation" crumbs={[{ label: "Conditions d'utilisation" }]} />
      <article className="container legal-page prose">
        <LegalIntro />

        <h2>1. Utilisation du site</h2>
        <p>
          Le site peut être consulté librement pour découvrir le secteur, ses projets et ses membres, et pour nous
          contacter, dans un cadre légal et respectueux.
        </p>

        <h2>2. Ce qui est interdit</h2>
        <ul>
          <li>essayer de contourner la sécurité du site ou de le perturber ;</li>
          <li>y introduire des contenus malveillants ;</li>
          <li>usurper l'identité d'une personne ou d'une organisation ;</li>
          <li>utiliser les contenus à des fins frauduleuses ou illicites.</li>
        </ul>

        <h2>3. Contenus biomédicaux et prototypes</h2>
        <p>
          Les informations techniques et scientifiques ont une vocation pédagogique ou de présentation de projets.
          Elles ne remplacent pas l'avis d'un professionnel qualifié et n'autorisent aucun usage clinique.
        </p>

        <h2>4. Liens externes</h2>
        <p>
          Les liens vers d'autres sites sont fournis à titre d'information. Leur présence ne signifie pas que le
          CETCI/ECDC approuve leur contenu.
        </p>

        <h2>5. Évolution du site</h2>
        <p>Le contenu et l'organisation du site peuvent changer à tout moment.</p>

        <p><Link className="btn" to="/contact">Nous contacter</Link></p>
      </article>
    </>
  );
}

export function IntellectualProperty() {
  usePageMeta('Propriété intellectuelle');
  return (
    <>
      <PageHeader title="Propriété intellectuelle" crumbs={[{ label: 'Propriété intellectuelle' }]} />
      <article className="container legal-page prose">
        <LegalIntro />

        <h2>1. Contenus du site</h2>
        <p>
          Le site présente des travaux du CETCI/ECDC, du Secteur Biomédical et de ses membres, ainsi que, lorsque
          c'est indiqué, des contenus de tiers. Les droits appartiennent à leurs auteurs.
        </p>

        <h2>2. Projets et prototypes</h2>
        <p>
          Publier un projet ne signifie pas abandonner les droits qui lui sont attachés. Les plans, schémas, cartes
          électroniques, logiciels et rapports peuvent relever de règles particulières selon leurs auteurs et les
          licences applicables.
        </p>

        <h2>3. Logiciels et licences</h2>
        <p>
          Lorsqu'un projet est publié sous licence open source, ses conditions s'appliquent : il faut en conserver les
          mentions d'auteur et de licence.
        </p>

        <h2>4. Réutilisation</h2>
        <p>
          Réutiliser un contenu original du site à des fins commerciales ou promotionnelles demande une autorisation
          préalable. Toute réutilisation autorisée doit citer l'auteur et l'origine du contenu.
        </p>

        <h2>5. Noms et logos</h2>
        <p>
          Les noms et logos du CETCI/ECDC, du Secteur Biomédical et de leurs partenaires restent la propriété de leurs
          titulaires. Ils ne peuvent pas être utilisés pour suggérer un lien qui n'existe pas.
        </p>

        <p>
          Pour une demande d'autorisation ou pour signaler un problème, utilisez la page <Link to="/contact">Contact</Link>.
        </p>
      </article>
    </>
  );
}

export function NotFound() {
  usePageMeta('Page introuvable');
  return (
    <>
      <PageHeader title="Page introuvable" />
      <div className="container page-body">
        <p>Cette page n'existe pas ou a été déplacée.</p>
        <p><Link className="btn" to="/">Retour à l'accueil</Link></p>
      </div>
    </>
  );
}
