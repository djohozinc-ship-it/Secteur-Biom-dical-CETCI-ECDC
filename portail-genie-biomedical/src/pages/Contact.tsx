import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { site } from '../config/site';
import { PageHeader } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';
import { contributionModes } from '../utils/taxonomy';

const teamSubject = "Contacter le secteur";

export default function Contact() {
  usePageMeta('Contact et collaboration', "Contacter le Secteur Biomédical du CETCI/ECDC : question, projet, ressource ou partenariat.");
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
      <PageHeader title="Contact et collaboration" eyebrow="Le secteur" intro="Une question, un projet, une idée de collaboration ? Écrivez-nous." crumbs={[{ label: 'Contact' }]} />
      <div className="container page-body contact-layout">
        <div>
          <h2>Collaborer</h2>
          <ul className="contrib-list">
            {contributionModes.map((m) => (
              <li key={m.key}><strong>{m.label}</strong><span>{m.desc}</span></li>
            ))}
          </ul>

          <h2>Coordonnées</h2>
          {hasCoords ? (
            <ul className="plain">
              {email && <li>Email : <a href={`mailto:${email}`}>{email}</a></li>}
              {telephone && <li>Téléphone : {telephone}</li>}
              {adresse && <li>Adresse : {adresse}</li>}
              {site.externalFormUrl && <li><a href={site.externalFormUrl} target="_blank" rel="noopener noreferrer">Formulaire en ligne</a></li>}
              {site.whatsapp && <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            </ul>
          ) : (
            <p>Une adresse e-mail dédiée sera bientôt disponible. En attendant, vous pouvez écrire au chef du secteur, Cédric DJOHOZIN, via son <a href="http://www.linkedin.com/in/concepteurdemaintenance" target="_blank" rel="noopener noreferrer">profil LinkedIn</a>.</p>
          )}
        </div>

        {email && (
          <div className="contact-form">
            <h2>Nous écrire</h2>
            <div className="form">
              <label className="field"><span>Motif</span>
                <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option>{teamSubject}</option>
                  {contributionModes.map((m) => <option key={m.key}>{m.subject}</option>)}
                </select>
              </label>
              <label className="field"><span>Votre nom</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
              <label className="field"><span>Message</span><textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
              <a className="btn" href={mailto}>Ouvrir ma messagerie</a>
              <p className="muted">Le bouton ouvre votre messagerie avec le message prérempli ; rien n'est enregistré sur ce site.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
