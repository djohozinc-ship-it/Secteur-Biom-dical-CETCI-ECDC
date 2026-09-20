import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { site } from '../config/site';
import { PageHeader } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';
import { contributionModes } from '../utils/taxonomy';

const teamSubject = "Contacter l'équipe";

export default function Contact() {
  usePageMeta('Contact et contribution', "Contacter l'équipe, proposer un article, un projet, une ressource ou un partenariat.");
  const [params] = useSearchParams();
  const initial = contributionModes.find((m) => m.key === params.get('motif'))?.subject ?? teamSubject;
  const [subject, setSubject] = useState(initial);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { email, telephone, adresse } = site.contact;
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${name}`)}` : '';
  const hasCoords = email || telephone || adresse || site.externalFormUrl || site.whatsapp;
  return (
    <>
      <PageHeader title="Contact et contribution" eyebrow="Le portail" intro="Écrire à l'équipe, ou contribuer au contenu du portail." crumbs={[{ label: 'Contact' }]} />
      <div className="container page-body contact-layout">
        <div>
          <h2>Contribuer</h2>
          <ul className="contrib-list">
            {contributionModes.map((m) => (
              <li key={m.key}><strong>{m.label}</strong><span>{m.desc}</span></li>
            ))}
          </ul>
          <p className="muted">Toute contribution est relue avant publication. Indiquez vos sources ; aucune donnée personnelle de tiers n'est publiée sans autorisation.</p>

          <h2>Coordonnées</h2>
          {hasCoords ? (
            <ul className="plain">
              {email && <li>Email : <a href={`mailto:${email}`}>{email}</a></li>}
              {telephone && <li>Téléphone : {telephone}</li>}
              {adresse && <li>Adresse : {adresse}</li>}
              {site.externalFormUrl && <li><a href={site.externalFormUrl} target="_blank" rel="noopener noreferrer">Formulaire externe</a></li>}
              {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            </ul>
          ) : <p className="notice">Les coordonnées officielles seront publiées après vérification. Aucune n'est affichée pour l'instant.</p>}
        </div>

        <div className="contact-form">
          <h2>Préparer un message</h2>
          <div className="notice" role="note">
            <p><strong>Comment ça fonctionne</strong></p>
            <ul>
              <li>Ce site n'a pas de serveur : <strong>il ne stocke aucun message</strong>.</li>
              <li>Le bouton <strong>ouvre la messagerie de votre appareil</strong> avec un message prérempli ; c'est vous qui l'envoyez.</li>
              <li>Ce que vous saisissez reste dans votre navigateur.</li>
            </ul>
          </div>
          <div className="form">
            <label className="field"><span>Motif</span>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option>{teamSubject}</option>
                {contributionModes.map((m) => <option key={m.key}>{m.subject}</option>)}
              </select>
            </label>
            <label className="field"><span>Votre nom</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
            <label className="field"><span>Message</span><textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
            {mailto ? <a className="btn" href={mailto}>Ouvrir ma messagerie</a> : <button className="btn" disabled>Ouvrir ma messagerie</button>}
            {!email && <p className="muted">Bouton désactivé : aucune adresse de contact n'est encore configurée.</p>}
          </div>
          <p className="muted">Limites : dépend d'une application de messagerie installée ; aucun suivi automatique des messages.</p>
        </div>
      </div>
    </>
  );
}
