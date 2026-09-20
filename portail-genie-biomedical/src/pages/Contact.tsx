import { useState } from 'react';
import { site } from '../config/site';
import { PageHeader } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

const subjects = ['Contacter l\'équipe', 'Proposer un article', 'Soumettre un projet', 'Signaler une ressource', 'Proposer un partenariat'];

export default function Contact() {
  usePageMeta('Contact et contribution', 'Contacter l\'équipe, proposer un article, un projet ou un partenariat.');
  const [subject, setSubject] = useState(subjects[0]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const mailto = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${name}`)}`
    : '';
  return (
    <>
      <PageHeader title="Contact et contribution" intro="Le site n'a pas de serveur : rien n'est envoyé depuis cette page. Le bouton ouvre votre messagerie avec le message prérempli." crumbs={[{ label: 'Contact' }]} />
      <div className="container narrow page-body">
        {!site.email && <p className="notice">Aucune adresse email n'est configurée. Renseignez <code>email</code> dans <code>src/config/site.ts</code> pour activer le bouton.</p>}
        <div className="form">
          <label className="field"><span>Motif</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
          </label>
          <label className="field"><span>Votre nom</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label className="field"><span>Message</span><textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
          {mailto ? <a className="btn" href={mailto}>Ouvrir ma messagerie</a> : <button className="btn" disabled>Ouvrir ma messagerie</button>}
        </div>
        <h2>Autres moyens</h2>
        <ul>
          {site.externalFormUrl && <li><a href={site.externalFormUrl} target="_blank" rel="noopener noreferrer">Formulaire externe</a></li>}
          {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
          {!site.externalFormUrl && !site.whatsapp && <li>Formulaire externe et WhatsApp : à configurer dans <code>src/config/site.ts</code>.</li>}
        </ul>
        <h2>Limites de ces solutions</h2>
        <ul>
          <li>Le bouton email dépend d'une application de messagerie installée sur l'appareil du visiteur.</li>
          <li>Un formulaire externe gratuit a des quotas et les données passent par un service tiers.</li>
          <li>Aucun suivi automatique des messages n'existe côté site.</li>
        </ul>
      </div>
    </>
  );
}
