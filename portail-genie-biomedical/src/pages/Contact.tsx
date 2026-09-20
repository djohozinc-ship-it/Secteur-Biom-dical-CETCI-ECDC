import { useState } from 'react';
import { site } from '../config/site';
import { PageHeader } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

const subjects = ["Contacter l'équipe", 'Proposer un article', 'Soumettre un projet', 'Signaler une ressource', 'Proposer un partenariat'];

export default function Contact() {
  usePageMeta('Contact et contribution', "Contacter l'équipe, proposer un article, un projet ou un partenariat.");
  const [subject, setSubject] = useState(subjects[0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { email, telephone, adresse } = site.contact;
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${name}`)}` : '';
  return (
    <>
      <PageHeader title="Contact et contribution" intro="Écrire à l'équipe, proposer un article, soumettre un projet, signaler une ressource ou proposer un partenariat." crumbs={[{ label: 'Contact' }]} />
      <div className="container narrow page-body">
        <div className="notice" role="note">
          <p><strong>Comment ça fonctionne</strong></p>
          <ul>
            <li>Ce site n'a pas de serveur : <strong>aucun message n'est envoyé ni stocké</strong> par le site.</li>
            <li>Le bouton ci-dessous <strong>ouvre la messagerie de votre appareil</strong> avec un message prérempli. C'est vous qui l'envoyez.</li>
            <li>Ce que vous saisissez ici reste dans votre navigateur.</li>
          </ul>
        </div>
        {!email && <p className="notice">Aucune adresse de contact n'est encore configurée : le bouton est désactivé pour le moment.</p>}
        <div className="form">
          <label className="field"><span>Motif</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <label className="field"><span>Votre nom</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label className="field"><span>Message</span><textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
          {mailto ? <a className="btn" href={mailto}>Ouvrir ma messagerie</a> : <button className="btn" disabled>Ouvrir ma messagerie</button>}
        </div>
        {(email || telephone || adresse || site.externalFormUrl || site.whatsapp) && (
          <>
            <h2>Coordonnées</h2>
            <ul>
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {telephone && <li>{telephone}</li>}
              {adresse && <li>{adresse}</li>}
              {site.externalFormUrl && <li><a href={site.externalFormUrl} target="_blank" rel="noopener noreferrer">Formulaire externe</a></li>}
              {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            </ul>
          </>
        )}
        <h2>Limites de cette solution</h2>
        <ul>
          <li>Elle dépend d'une application de messagerie installée sur l'appareil du visiteur.</li>
          <li>Un formulaire externe gratuit, s'il est ajouté, a des quotas et confie les données à un service tiers.</li>
          <li>Aucun suivi automatique des messages n'existe côté site.</li>
        </ul>
      </div>
    </>
  );
}
