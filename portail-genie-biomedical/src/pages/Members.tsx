import { useState } from 'react';
import { membres } from '../utils/content';
import { PageHeader, Avatar, DemoBadge, EmptyState } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Members() {
  usePageMeta('Membres', 'Les membres de la communauté du portail.');
  const poles = Array.from(new Set(membres.map((m) => m.pole))).sort();
  const [pole, setPole] = useState('');
  const shown = membres.filter((m) => !pole || m.pole === pole);
  return (
    <>
      <PageHeader title="Membres" eyebrow="Le portail" intro="Les personnes qui font vivre la communauté. Seuls les membres ayant donné leur accord sont présentés." crumbs={[{ label: 'Membres' }]} />
      <div className="container page-body">
        <div className="tabs" role="group" aria-label="Filtrer par pôle">
          <button className={pole === '' ? 'is-on' : ''} aria-pressed={pole === ''} onClick={() => setPole('')}>Tous</button>
          {poles.map((p) => <button key={p} className={pole === p ? 'is-on' : ''} aria-pressed={pole === p} onClick={() => setPole(p)}>{p}</button>)}
        </div>
        {shown.length === 0 ? <EmptyState title="Contenu à venir">La présentation des membres sera publiée avec leur accord.</EmptyState> : (
          <ul className="member-grid">
            {shown.map((m) => (
              <li key={m.id} className="member">
                <Avatar name={m.name} photo={m.photo} />
                <h3>{m.name} {m.demo && <DemoBadge />}</h3>
                <p className="member-role">{m.role} — {m.pole}</p>
                <p>{m.bio}</p>
                {m.links && m.links.length > 0 && <p>{m.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>)}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
