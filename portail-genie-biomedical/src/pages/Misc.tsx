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

const contactLine = site.contact.email || 'via le formulaire de la page Contact du site';

export function Legal() {
  usePageMeta('Mentions légales', 'Mentions légales du site du Secteur Biomédical du CETCI/ECDC : éditeur, responsable de la publication, hébergeur, propriété intellectuelle et responsabilité.');
  return (
    <>
      <PageHeader title="Mentions légales" crumbs={[{ label: 'Mentions légales' }]} />
      <article className="container legal-page prose">
        <LegalIntro />
        <p>
          Conformément aux dispositions applicables à la communication au public en ligne, les présentes mentions
          identifient l’éditeur, le responsable de la publication et l’hébergeur du site
          <strong> {site.siteUrl}</strong> (ci-après « le Site »).
        </p>

        <h2>Article 1 – Éditeur du Site</h2>
        <dl className="legal-facts">
          <div><dt>Dénomination</dt><dd>Secteur Biomédical du CETCI/ECDC</dd></div>
          <div><dt>Organisation de rattachement</dt><dd>Centre d’Élaboration des Technologies de Conception en Ingénierie / Engineering Concepts Development Center (CETCI/ECDC)</dd></div>
          <div><dt>Nature</dt><dd>Groupe d’étudiants, au sein d’une organisation privée et indépendante, fondée en 2024</dd></div>
          <div><dt>Pays d’établissement</dt><dd>République du Bénin</dd></div>
          <div><dt>Contact</dt><dd>{contactLine}</dd></div>
        </dl>

        <h2>Article 2 – Responsable de la publication</h2>
        <p>
          Le responsable de la publication est <strong>Cédric DJOHOZIN</strong>, chef du Secteur Biomédical du CETCI/ECDC.
        </p>

        <h2>Article 3 – Hébergeur</h2>
        <dl className="legal-facts">
          <div><dt>Société</dt><dd>GitHub, Inc. (service GitHub Pages)</dd></div>
          <div><dt>Adresse</dt><dd>88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis</dd></div>
          <div><dt>Site</dt><dd>github.com</dd></div>
        </dl>

        <h2>Article 4 – Nature de l’organisation et absence de lien institutionnel</h2>
        <p>
          Le CETCI/ECDC est une organisation privée et indépendante. Le Site n’est pas le site d’un organisme public :
          il n’est édité ni par le Gouvernement du Bénin, ni par un ministère, ni par l’École Polytechnique
          d’Abomey-Calavi (EPAC) ou une autre université, ni par un établissement de santé. Les membres du secteur sont
          des étudiants, dont certains sont inscrits dans ces établissements, qui s’expriment ici en leur nom propre
          et au nom du secteur.
        </p>
        <p>
          Le Secteur Biomédical ne commercialise aucun équipement ni dispositif médical et ne fournit aucune prestation
          de soin.
        </p>

        <h2>Article 5 – Contenu et absence de valeur médicale</h2>
        <p>
          Les informations publiées sur le Site présentent les activités, les projets et les membres du secteur. Elles
          sont fournies à titre informatif et pédagogique et ne remplacent en aucun cas l’avis d’un professionnel de
          santé ou d’un ingénieur biomédical qualifié.
        </p>
        <p className="notice">
          Les projets présentés sont des prototypes ou des travaux d’apprentissage. Aucun n’a fait l’objet d’une
          homologation, d’une certification ou d’une autorisation pour un usage clinique.
        </p>

        <h2>Article 6 – Propriété intellectuelle</h2>
        <p>
          Sauf mention contraire, les textes, photographies, schémas, logos et autres éléments du Site sont protégés et
          restent la propriété de leurs auteurs ou du secteur. Toute reproduction ou utilisation à des fins
          commerciales sans autorisation écrite préalable est interdite. Les modalités détaillées figurent dans la page{' '}
          <Link to="/propriete-intellectuelle">Propriété intellectuelle</Link>.
        </p>

        <h2>Article 7 – Droit à l’image</h2>
        <p>
          Les photographies de personnes ne sont publiées qu’avec leur accord. Toute personne qui souhaite le retrait ou
          la modification d’une image ou d’une information la concernant peut en faire la demande depuis la page{' '}
          <Link to="/contact">Contact</Link> ; la demande est traitée dans les meilleurs délais.
        </p>

        <h2>Article 8 – Liens hypertextes</h2>
        <p>
          Le Site peut renvoyer vers des sites tiers (portfolios, dépôts de code, réseaux professionnels). Le secteur
          n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </p>

        <h2>Article 9 – Responsabilité</h2>
        <p>
          Le secteur s’efforce de publier des informations exactes et à jour, mais ne garantit ni leur exhaustivité,
          ni l’absence d’erreur, ni la disponibilité continue du Site. Il ne saurait être tenu responsable d’un
          dommage résultant de l’utilisation des informations publiées.
        </p>

        <h2>Article 10 – Droit applicable</h2>
        <p>
          Les présentes mentions sont régies par le droit béninois. Pour tout différend, une solution amiable est
          recherchée avant toute autre démarche.
        </p>
      </article>
    </>
  );
}

export function Privacy() {
  usePageMeta('Politique de confidentialité', 'Politique de confidentialité du site du Secteur Biomédical du CETCI/ECDC : données traitées, finalités, droits des personnes et contact.');
  return (
    <>
      <PageHeader title="Politique de confidentialité" crumbs={[{ label: 'Confidentialité' }]} />
      <article className="container legal-page prose">
        <LegalIntro />
        <p>
          Le Secteur Biomédical du CETCI/ECDC attache de l’importance à la protection de la vie privée. La présente
          politique explique quelles informations sont traitées lorsque vous visitez le Site, pourquoi, et comment
          exercer vos droits.
        </p>

        <h2>Article 1 – Responsable du traitement</h2>
        <p>
          Le responsable du traitement est le <strong>Secteur Biomédical du CETCI/ECDC</strong>, représenté par son chef,
          Cédric DJOHOZIN. Contact : {contactLine}.
        </p>

        <h2>Article 2 – Données traitées</h2>
        <p>Le Site ne comporte ni compte utilisateur, ni espace membre, ni base de données de visiteurs.</p>
        <ul>
          <li><strong>Données de navigation :</strong> comme tout site web, l’hébergeur peut enregistrer des données techniques (adresse IP, type de navigateur, pages demandées) nécessaires à l’acheminement et à la sécurité du service.</li>
          <li><strong>Messages :</strong> si vous nous écrivez, nous traitons les informations que vous nous transmettez (nom, adresse de contact, contenu du message) pour vous répondre.</li>
          <li><strong>Profils des membres :</strong> nom, photographie, fonction et parcours des membres, publiés avec leur accord.</li>
        </ul>

        <h2>Article 3 – Finalités et base du traitement</h2>
        <p>
          Les données sont utilisées pour assurer le fonctionnement et la sécurité du Site, répondre aux messages reçus
          et présenter les membres du secteur. Elles ne sont ni vendues, ni cédées à des fins publicitaires. Les profils
          des membres reposent sur leur consentement.
        </p>

        <h2>Article 4 – Cookies et traceurs</h2>
        <p>
          Le Site n’utilise ni cookie publicitaire, ni outil de mesure d’audience, ni traceur de réseaux sociaux. Le
          navigateur peut conserver localement de simples préférences d’affichage, qui ne quittent pas votre appareil.
          Les contenus intégrés depuis d’autres sites, par exemple une vidéo YouTube, relèvent de la politique de ces
          sites.
        </p>

        <h2>Article 5 – Destinataires et hébergement</h2>
        <p>
          Les données sont accessibles aux responsables du secteur. Le Site est hébergé par GitHub, Inc. (GitHub Pages),
          aux États-Unis, selon sa propre politique de confidentialité.
        </p>

        <h2>Article 6 – Durée de conservation</h2>
        <p>
          Les messages sont conservés le temps nécessaire pour y répondre, puis supprimés. Les profils des membres sont
          publiés tant que la personne concernée n’en demande pas le retrait.
        </p>

        <h2>Article 7 – Données de santé</h2>
        <p className="notice">
          <strong>Ne nous transmettez aucune donnée médicale personnelle</strong> (dossier, résultats d’examens,
          antécédents). Le Site n’est pas destiné à en recevoir et le secteur n’est pas un service de soins.
        </p>

        <h2>Article 8 – Vos droits</h2>
        <p>
          Vous pouvez demander l’accès aux informations vous concernant, leur rectification, leur suppression ou
          l’opposition à leur traitement, et retirer à tout moment un consentement donné. Adressez votre demande depuis
          la page <Link to="/contact">Contact</Link> en précisant l’objet. Vous pouvez également vous adresser à
          l’autorité béninoise chargée de la protection des données personnelles (APDP).
        </p>

        <h2>Article 9 – Sécurité</h2>
        <p>
          Le Site est servi en connexion chiffrée (HTTPS). Le secteur limite les données collectées au strict
          nécessaire.
        </p>

        <h2>Article 10 – Modification de la politique</h2>
        <p>
          La présente politique peut être mise à jour. La date de dernière mise à jour figure en haut de la page.
        </p>
      </article>
    </>
  );
}

export function Terms() {
  usePageMeta("Conditions générales d'utilisation", 'Conditions générales d’utilisation du site du Secteur Biomédical du CETCI/ECDC : accès, usages autorisés, responsabilité et droit applicable.');
  return (
    <>
      <PageHeader title="Conditions générales d’utilisation" crumbs={[{ label: 'Conditions d’utilisation' }]} />
      <article className="container legal-page prose">
        <LegalIntro />
        <p>
          Les présentes conditions générales d’utilisation (« CGU ») encadrent l’accès au Site du Secteur Biomédical du
          CETCI/ECDC et son utilisation. En naviguant sur le Site, vous reconnaissez les avoir lues et acceptées.
        </p>

        <h2>Article 1 – Objet</h2>
        <p>
          Le Site présente le secteur, ses membres, ses projets et ses actualités, et propose des contenus
          pédagogiques en génie biomédical.
        </p>

        <h2>Article 2 – Accès au Site</h2>
        <p>
          L’accès est libre et gratuit, hors frais de connexion supportés par l’utilisateur. Le secteur peut suspendre
          ou modifier le Site, en tout ou partie, sans préavis, notamment pour maintenance ou mise à jour.
        </p>

        <h2>Article 3 – Usages autorisés</h2>
        <p>
          L’utilisateur peut consulter le Site, en citer des extraits avec mention de la source, et utiliser le
          formulaire ou les coordonnées de la page Contact pour écrire au secteur.
        </p>

        <h2>Article 4 – Usages interdits</h2>
        <ul>
          <li>porter atteinte à la sécurité ou au bon fonctionnement du Site ;</li>
          <li>y introduire des programmes ou contenus malveillants ;</li>
          <li>usurper l’identité d’une personne ou d’une organisation, ou laisser croire à un lien officiel qui n’existe pas ;</li>
          <li>extraire ou réutiliser massivement les contenus à des fins commerciales sans autorisation ;</li>
          <li>utiliser les contenus à des fins illicites, frauduleuses ou diffamatoires.</li>
        </ul>

        <h2>Article 5 – Contenus biomédicaux et prototypes</h2>
        <p>
          Les contenus techniques et scientifiques ont une vocation pédagogique. Ils ne constituent ni un avis médical,
          ni une instruction de maintenance opposable, et les prototypes décrits ne sont pas des dispositifs médicaux
          certifiés. Tout usage clinique est exclu.
        </p>

        <h2>Article 6 – Propriété intellectuelle</h2>
        <p>
          Les contenus du Site sont protégés. Leur utilisation est régie par la page{' '}
          <Link to="/propriete-intellectuelle">Propriété intellectuelle</Link>.
        </p>

        <h2>Article 7 – Liens externes</h2>
        <p>
          Les liens vers des sites tiers sont fournis à titre d’information. Leur présence n’emporte aucune approbation
          de leur contenu par le secteur ou par le CETCI/ECDC.
        </p>

        <h2>Article 8 – Responsabilité</h2>
        <p>
          Le secteur ne peut être tenu responsable des dommages directs ou indirects liés à l’accès au Site, à son
          indisponibilité ou à l’utilisation des informations qui y figurent.
        </p>

        <h2>Article 9 – Modification des CGU</h2>
        <p>
          Les CGU peuvent être modifiées à tout moment ; la version applicable est celle publiée à la date de la
          consultation.
        </p>

        <h2>Article 10 – Droit applicable</h2>
        <p>
          Les CGU sont soumises au droit béninois. Les parties recherchent d’abord une solution amiable.
        </p>

        <p><Link className="btn" to="/contact">Nous contacter</Link></p>
      </article>
    </>
  );
}

export function IntellectualProperty() {
  usePageMeta('Propriété intellectuelle', 'Règles de propriété intellectuelle du site du Secteur Biomédical du CETCI/ECDC : droits sur les contenus, projets, logiciels, marques et réutilisation.');
  return (
    <>
      <PageHeader title="Propriété intellectuelle" crumbs={[{ label: 'Propriété intellectuelle' }]} />
      <article className="container legal-page prose">
        <LegalIntro />
        <p>
          La présente page précise les droits attachés aux contenus publiés sur le Site et les conditions dans
          lesquelles ils peuvent être réutilisés.
        </p>

        <h2>Article 1 – Droits sur les contenus</h2>
        <p>
          Les textes, photographies, schémas, illustrations, logos et mises en page du Site sont protégés. Ils
          appartiennent au Secteur Biomédical du CETCI/ECDC, au CETCI/ECDC ou à leurs auteurs respectifs. Les
          contenus de tiers sont signalés comme tels et restent la propriété de leurs titulaires.
        </p>

        <h2>Article 2 – Projets et travaux des membres</h2>
        <p>
          Les projets présentés (plans, schémas, cartes électroniques, programmes, rapports) ont été réalisés par les
          membres indiqués sous la mention « Réalisé par ». Leur publication sur le Site n’emporte aucune cession de
          droits : chaque auteur conserve ses droits sur son travail, sous réserve des règles de son établissement de
          formation ou de ses partenaires.
        </p>

        <h2>Article 3 – Logiciels et licences</h2>
        <p>
          Lorsqu’un projet est diffusé sous licence libre, les conditions de cette licence s’appliquent, notamment la
          conservation des mentions d’auteur et de licence. À défaut de licence indiquée, tous droits sont réservés.
        </p>

        <h2>Article 4 – Réutilisation</h2>
        <p>
          La citation courte, avec mention de l’auteur et de la source, est permise. Toute autre reproduction,
          représentation ou adaptation, en particulier à des fins commerciales ou promotionnelles, requiert une
          autorisation écrite préalable.
        </p>

        <h2>Article 5 – Dénominations et logos</h2>
        <p>
          Les noms « CETCI/ECDC » et « Secteur Biomédical du CETCI/ECDC » ainsi que les logos associés ne peuvent pas
          être utilisés pour suggérer un partenariat, une approbation ou un lien qui n’existe pas.
        </p>

        <h2>Article 6 – Signalement</h2>
        <p>
          Si vous estimez qu’un contenu du Site porte atteinte à vos droits, indiquez-nous le contenu concerné et
          l’objet de votre demande depuis la page <Link to="/contact">Contact</Link> ; nous l’examinerons rapidement et
          le retirerons si nécessaire.
        </p>

        <h2>Article 7 – Demande d’autorisation</h2>
        <p>
          Pour toute demande d’autorisation de réutilisation, précisez l’usage prévu, le support et la durée, depuis la
          page <Link to="/contact">Contact</Link>.
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
