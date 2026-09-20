import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function Legal() {
  usePageMeta('Mentions légales');
  return (
    <>
      <PageHeader title="Mentions légales" crumbs={[{ label: 'Mentions légales' }]} />
      <div className="container narrow page-body prose">
        <p className="notice">Texte provisoire. Il sera complété avec les informations officielles de l'organisation (statut, responsable de publication).</p>
        <h2>Éditeur</h2><p>Communauté du secteur biomédical — informations à renseigner.</p>
        <h2>Hébergement</h2><p>Site statique hébergé gratuitement sur GitHub Pages.</p>
        {site.showDemo && <><h2>Contenus</h2><p>Les contenus marqués « Démonstration » sont fictifs et ne constituent pas des informations réelles.</p></>}
      </div>
    </>
  );
}

export function Privacy() {
  usePageMeta('Confidentialité');
  return (
    <>
      <PageHeader title="Politique de confidentialité" crumbs={[{ label: 'Confidentialité' }]} />
      <div className="container narrow page-body prose">
        <p className="notice">Texte provisoire à faire valider.</p>
        <p>Ce site n'utilise ni base de données, ni compte, ni traceur publicitaire. Il ne collecte aucune donnée personnelle.</p>
        <p>Les personnes présentées (membres, annuaire) ne sont publiées qu'avec leur accord.</p>
        <p>Les liens de contact ouvrent votre messagerie ou un service externe, qui applique sa propre politique.</p>
      </div>
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
