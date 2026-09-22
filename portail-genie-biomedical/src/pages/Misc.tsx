import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const lastUpdated = '22 septembre 2026';

function LegalIntro() {
  return (
    <div className="legal-meta">
      <p><strong>Dernière mise à jour :</strong> {lastUpdated}</p>
      <p>
        Ces pages présentent les règles générales applicables au portail du Secteur
        Biomédical du CETCI/ECDC. Elles doivent être complétées ou ajustées si
        l'organisation, les responsables, les coordonnées ou les services du portail évoluent.
      </p>
    </div>
  );
}

export function Legal() {
  usePageMeta('Mentions légales');
  return (
    <>
      <PageHeader title="Mentions légales" crumbs={[{ label: 'Mentions légales' }]} />
      <article className="container legal-page prose">
        <LegalIntro />

        <h2>1. Éditeur du site</h2>
        <p>
          Le présent portail est édité par le <strong>Secteur Biomédical du CETCI/ECDC</strong>,
          communauté d'ingénierie, d'innovation et de collaboration dédiée au développement
          de compétences et de solutions technologiques dans le domaine biomédical.
        </p>
        <dl className="legal-facts">
          <div><dt>Organisme / communauté</dt><dd>{site.organisme}</dd></div>
          <div><dt>Secteur</dt><dd>Secteur Biomédical</dd></div>
          <div><dt>Pays</dt><dd>République du Bénin</dd></div>
          <div><dt>Responsable du portail</dt><dd>Cédric DJOHOZIN</dd></div>
          <div><dt>Contact</dt><dd>{site.contact.email || 'Adresse e-mail à renseigner'}</dd></div>
          <div><dt>Site</dt><dd>{site.siteUrl}</dd></div>
        </dl>
        <p className="notice">
          <strong>Statut du portail.</strong> {site.statutMention} Ce portail ne constitue pas,
          par lui-même, un site officiel du Gouvernement du Bénin, du Ministère de la Santé,
          de l'EPAC ou d'une autre institution publique.
        </p>

        <h2>2. Objet du portail</h2>
        <p>
          Le portail a pour objectif de présenter les activités, projets, membres, réalisations,
          ressources et initiatives du Secteur Biomédical du CETCI/ECDC. Il vise notamment à
          informer, valoriser les travaux, faciliter les collaborations et partager des ressources
          techniques et scientifiques.
        </p>

        <h2>3. Nature des informations publiées</h2>
        <p>
          Les informations publiées sont fournies à titre informatif. Certains projets, prototypes,
          concepts ou résultats peuvent correspondre à des travaux en cours, des prototypes
          expérimentaux, des travaux académiques ou des activités de recherche et développement.
        </p>
        <p className="notice">
          <strong>Important :</strong> la présentation d'un prototype, d'un algorithme, d'un
          dispositif ou d'une technologie sur ce portail ne signifie pas qu'il est homologué,
          certifié ou autorisé pour une utilisation clinique.
        </p>

        <h2>4. Responsabilité</h2>
        <p>
          L'équipe du portail s'efforce de publier des informations exactes et à jour. Toutefois,
          aucune garantie absolue n'est donnée concernant l'exhaustivité, l'actualité permanente,
          l'absence d'erreurs ou la disponibilité continue du portail.
        </p>
        <p>
          Le portail ne constitue pas une plateforme de diagnostic, de prescription ou de prise
          en charge médicale. Aucune information publiée ne doit être interprétée comme un avis
          médical personnalisé.
        </p>

        <h2>5. Propriété intellectuelle</h2>
        <p>
          Sauf indication contraire, les textes, photographies, graphiques, logos, documents,
          interfaces et autres contenus publiés sur le portail sont protégés par les règles
          applicables en matière de propriété intellectuelle.
        </p>
        <p>
          Les contenus produits par le Secteur Biomédical du CETCI/ECDC ne peuvent être reproduits,
          modifiés, distribués ou exploités à des fins commerciales sans autorisation préalable,
          sauf lorsque la loi ou une licence applicable l'autorise.
        </p>
        <p>
          Les contenus appartenant à des tiers restent la propriété de leurs auteurs ou titulaires
          respectifs. Les licences open source ou autres licences indiquées sur un projet prévalent
          pour le contenu concerné.
        </p>

        <h2>6. Photographies et droit à l'image</h2>
        <p>
          Les photographies publiées peuvent représenter des membres, étudiants, partenaires,
          activités, formations, événements ou réalisations du CETCI/ECDC. Leur publication doit
          respecter les autorisations et règles applicables.
        </p>
        <p>
          Une personne identifiable qui estime qu'une photographie la représentant a été publiée
          de manière inappropriée peut contacter l'équipe du portail afin de demander son examen.
        </p>

        <h2>7. Liens externes</h2>
        <p>
          Le portail peut contenir des liens vers des sites, plateformes ou services tiers.
          Ces services disposent de leurs propres conditions et politiques. Le Secteur Biomédical
          du CETCI/ECDC ne contrôle pas nécessairement leurs contenus ou pratiques.
        </p>

        <h2>8. Hébergement et disponibilité</h2>
        <p>
          Le portail est actuellement publié sous forme de site statique sur GitHub Pages.
          Des opérations de maintenance, des mises à jour ou des incidents techniques peuvent
          temporairement affecter sa disponibilité.
        </p>

        <h2>9. Contact</h2>
        <p>
          Pour toute question concernant le portail, ses contenus, une photographie, un document
          ou une demande relative à la confidentialité, utilisez la page <Link to="/contact">Contact et contribution</Link>.
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

        <h2>1. Notre principe</h2>
        <p>
          La protection des données personnelles constitue un principe important du portail.
          Nous cherchons à ne collecter que les informations nécessaires au fonctionnement du
          portail et aux finalités clairement identifiées.
        </p>

        <h2>2. Données communiquées volontairement</h2>
        <p>
          Selon les fonctionnalités disponibles, une personne peut volontairement communiquer
          son nom, son adresse e-mail, son établissement, sa fonction, son domaine d'activité
          ou le contenu d'un message envoyé au portail.
        </p>

        <h2>3. Données techniques</h2>
        <p>
          La consultation d'un site web peut donner lieu au traitement de certaines informations
          techniques par l'hébergement ou des services techniques utilisés, par exemple des
          informations relatives au navigateur, à l'appareil, à la connexion ou à la consultation.
          Ces informations peuvent notamment servir à la sécurité et au fonctionnement technique.
        </p>

        <h2>4. Données de santé</h2>
        <p className="notice">
          <strong>Le portail n'a pas vocation à collecter ou stocker des dossiers médicaux,
          résultats d'examens, antécédents médicaux ou autres données de santé de patients.</strong>
        </p>
        <p>
          Les visiteurs ne doivent pas transmettre de données médicales personnelles via les
          formulaires généraux du site. Si une fonctionnalité future devait nécessiter un traitement
          de données de santé, elle devra faire l'objet d'un dispositif spécifique et d'informations
          adaptées avant toute collecte.
        </p>

        <h2>5. Finalités</h2>
        <ul>
          <li>répondre aux demandes de contact ;</li>
          <li>communiquer avec les membres, étudiants et partenaires ;</li>
          <li>assurer le fonctionnement et la sécurité du portail ;</li>
          <li>améliorer les contenus et l'expérience utilisateur ;</li>
          <li>gérer les contributions, candidatures ou participations lorsque ces fonctionnalités existent ;</li>
          <li>documenter les activités du CETCI/ECDC.</li>
        </ul>

        <h2>6. Cookies et technologies similaires</h2>
        <p>
          Le portail n'a pas vocation à utiliser des cookies publicitaires. Des cookies ou
          technologies similaires peuvent toutefois être utilisés par certaines fonctionnalités
          techniques ou certains services externes. Lorsqu'un mécanisme de consentement est
          nécessaire, il doit être mis en place avant les traitements concernés.
        </p>

        <h2>7. Services tiers</h2>
        <p>
          Le portail peut s'appuyer sur des services externes pour l'hébergement, la diffusion
          de contenus, les formulaires, les statistiques ou d'autres fonctionnalités. Ces services
          peuvent appliquer leurs propres politiques de confidentialité.
        </p>

        <h2>8. Conservation</h2>
        <p>
          Les données personnelles doivent être conservées pendant la durée nécessaire à la finalité
          pour laquelle elles ont été communiquées, ou pendant la durée requise par une obligation
          applicable. Lorsqu'elles ne sont plus nécessaires, elles peuvent être supprimées ou
          anonymisées.
        </p>

        <h2>9. Sécurité</h2>
        <p>
          Des mesures techniques et organisationnelles raisonnables sont mises en œuvre pour
          protéger les informations contre les accès, modifications, pertes, divulgations ou
          destructions non autorisés. Aucun système connecté à Internet ne peut toutefois garantir
          une sécurité absolue.
        </p>

        <h2>10. Partage des données</h2>
        <p>
          Les données personnelles ne sont pas destinées à être vendues. Elles peuvent être
          communiquées à des prestataires techniques lorsque cela est nécessaire au fonctionnement
          du portail, ou lorsque la loi l'exige, dans la mesure nécessaire à la finalité concernée.
        </p>

        <h2>11. Profils des membres</h2>
        <p>
          Les profils publiés peuvent contenir certaines informations professionnelles ou
          académiques, telles que le nom, la photographie, la fonction, les domaines de compétence,
          le parcours ou les projets. Ces informations doivent être publiées avec l'accord approprié
          des personnes concernées.
        </p>

        <h2>12. Vos droits</h2>
        <p>
          Selon le cadre juridique applicable, les personnes concernées peuvent disposer de droits
          concernant l'accès, la rectification, la suppression, la limitation de certains traitements,
          l'opposition lorsque celle-ci est applicable et le retrait du consentement lorsqu'un
          traitement repose sur celui-ci.
        </p>
        <p>
          Pour exercer une demande, utilisez la page <Link to="/contact">Contact et contribution</Link>.
        </p>

        <h2>13. Mineurs</h2>
        <p>
          Le portail n'est pas destiné à collecter volontairement des données personnelles de mineurs.
          Toute fonctionnalité nécessitant une telle collecte devra prévoir des mesures adaptées.
        </p>

        <h2>14. Modifications</h2>
        <p>
          Cette politique peut être mise à jour lorsque le portail, ses fonctionnalités ou les
          exigences applicables évoluent. La date de dernière modification est indiquée en tête de page.
        </p>

        <h2>15. Contact relatif à la confidentialité</h2>
        <p>
          <strong>Secteur Biomédical CETCI/ECDC</strong><br />
          Bénin<br />
          {site.contact.email || 'Adresse e-mail officielle à renseigner'}
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

        <h2>1. Acceptation</h2>
        <p>
          L'accès au portail implique la prise de connaissance des présentes conditions. Si vous
          n'acceptez pas une partie de ces conditions, vous devez éviter d'utiliser les fonctionnalités
          concernées.
        </p>

        <h2>2. Utilisation autorisée</h2>
        <p>
          Le portail peut être utilisé pour consulter les informations publiées, découvrir les
          activités du secteur, accéder aux ressources disponibles et prendre contact avec la communauté
          dans un cadre légal et respectueux.
        </p>

        <h2>3. Utilisations interdites</h2>
        <p>Il est notamment interdit d'utiliser le portail pour :</p>
        <ul>
          <li>contourner ou compromettre ses mécanismes de sécurité ;</li>
          <li>introduire volontairement des contenus malveillants ;</li>
          <li>usurper l'identité d'une personne ou d'une organisation ;</li>
          <li>utiliser les contenus à des fins frauduleuses ou illicites ;</li>
          <li>perturber volontairement le fonctionnement du service.</li>
        </ul>

        <h2>4. Contenus biomédicaux et prototypes</h2>
        <p>
          Les informations techniques et scientifiques publiées ont une vocation documentaire,
          pédagogique ou de présentation de projets. Elles ne remplacent pas les recommandations
          d'un professionnel qualifié et ne constituent pas une autorisation d'utilisation clinique.
        </p>

        <h2>5. Contributions des utilisateurs</h2>
        <p>
          Lorsqu'une fonctionnalité permet de transmettre une contribution, son auteur doit disposer
          des droits nécessaires sur les contenus transmis et ne doit pas communiquer de données
          personnelles ou médicales qui ne sont pas nécessaires.
        </p>

        <h2>6. Liens et services tiers</h2>
        <p>
          Les liens externes sont proposés pour faciliter l'accès à des ressources complémentaires.
          Leur présence ne signifie pas nécessairement que le CETCI/ECDC approuve l'ensemble de leur contenu.
        </p>

        <h2>7. Évolution du portail</h2>
        <p>
          Le contenu, les fonctionnalités et l'organisation du portail peuvent évoluer, être
          suspendus ou supprimés lorsque cela est nécessaire.
        </p>

        <h2>8. Contact</h2>
        <p><Link className="btn" to="/contact">Contact et contribution</Link></p>
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

        <h2>1. Principes</h2>
        <p>
          Le portail présente des contenus issus des activités du CETCI/ECDC, du Secteur Biomédical,
          de ses membres, de partenaires et, lorsque cela est indiqué, de tiers. Les droits sont
          attachés à leurs auteurs ou titulaires respectifs.
        </p>

        <h2>2. Projets et prototypes</h2>
        <p>
          La publication d'un projet ou d'un prototype ne signifie pas que le portail transfère,
          abandonne ou concède automatiquement les droits de propriété intellectuelle qui peuvent
          être attachés à ce projet.
        </p>
        <p>
          Les plans, schémas, cartes électroniques, logiciels, modèles, rapports, photographies,
          méthodes et autres éléments peuvent être soumis à des règles particulières selon leurs
          auteurs, leurs partenaires, les financements ou les licences applicables.
        </p>

        <h2>3. Logiciels et licences</h2>
        <p>
          Lorsqu'un projet utilise ou publie un logiciel sous une licence open source ou une autre
          licence, les conditions de cette licence s'appliquent au contenu concerné. Les notices
          de licence et d'attribution doivent être conservées lorsque cela est requis.
        </p>

        <h2>4. Utilisation des contenus</h2>
        <p>
          Toute réutilisation substantielle d'un contenu original du portail à des fins commerciales,
          promotionnelles ou institutionnelles doit faire l'objet d'une autorisation lorsque celle-ci
          est requise. Une réutilisation autorisée doit conserver les mentions d'auteur et d'origine
          applicables.
        </p>

        <h2>5. Marques et logos</h2>
        <p>
          Les noms, marques et logos du CETCI/ECDC, du Secteur Biomédical et des partenaires restent
          la propriété de leurs titulaires respectifs. Leur présence sur le portail ne constitue pas
          une autorisation générale de les reproduire ou de suggérer une affiliation non établie.
        </p>

        <h2>6. Demande d'autorisation</h2>
        <p>
          Pour demander une autorisation de réutilisation d'un contenu ou signaler un problème de
          propriété intellectuelle, utilisez la page <Link to="/contact">Contact et contribution</Link>.
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
