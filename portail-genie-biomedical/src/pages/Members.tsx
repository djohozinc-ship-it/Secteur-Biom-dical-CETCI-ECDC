import { useEffect, useState } from 'react';
import { membres } from '../utils/content';
import { PageHeader, Avatar, DemoBadge, EmptyState } from '../components/ui';
import { usePageMeta } from '../hooks/usePageMeta';
import './members.css';

export default function Members() {
  usePageMeta('Membres', 'Les membres de la communauté du secteur biomédical.');

  const poles = Array.from(new Set(membres.map((m) => m.pole))).sort();
  const [pole, setPole] = useState('');
  const shown = membres.filter((m) => !pole || m.pole === pole);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [pole]);

  const current = shown[index];

  const previous = () => {
    setIndex((value) => (value - 1 + shown.length) % shown.length);
  };

  const next = () => {
    setIndex((value) => (value + 1) % shown.length);
  };

  return (
    <>
      <PageHeader
        title="Membres"
        eyebrow="Le secteur biomédical"
        intro="Découvrez les acteurs qui contribuent au développement du génie biomédical au Bénin."
        crumbs={[{ label: 'Membres' }]}
      />

      <div className="container page-body">
        <div className="tabs members-tabs" role="group" aria-label="Filtrer par pôle">
          <button
            className={pole === '' ? 'is-on' : ''}
            aria-pressed={pole === ''}
            onClick={() => setPole('')}
          >
            Tous
          </button>
          {poles.map((p) => (
            <button
              key={p}
              className={pole === p ? 'is-on' : ''}
              aria-pressed={pole === p}
              onClick={() => setPole(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <EmptyState title="Contenu à venir">
            La présentation des membres sera publiée avec leur accord.
          </EmptyState>
        ) : (
          <section className="members-showcase" aria-label="Présentation des membres">
            <div className="members-showcase-head">
              <div>
                <p className="eyebrow">Notre communauté</p>
                <h2>Les acteurs du secteur biomédical</h2>
              </div>
              <p className="members-counter" aria-live="polite">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden="true"> / </span>
                {String(shown.length).padStart(2, '0')}
              </p>
            </div>

            <article className="member-profile" aria-live="polite">
              <div className="member-profile-photo">
                <Avatar name={current.name} photo={current.photo} />
                <div className="member-profile-index">
                  Profil {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="member-profile-content">
                <p className="member-profile-kicker">{current.pole}</p>
                <h3>{current.name}</h3>
                <p className="member-profile-role">
                  {current.role} {current.demo && <DemoBadge />}
                </p>
                <div className="member-profile-line" />
                <p className="member-profile-bio">{current.bio}</p>

                {current.links && current.links.length > 0 && (
                  <div className="member-profile-links">
                    {current.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}

                <div className="member-profile-controls">
                  <button
                    type="button"
                    className="member-arrow"
                    onClick={previous}
                    aria-label="Profil précédent"
                    disabled={shown.length < 2}
                  >
                    <span aria-hidden="true">←</span>
                    <span>Précédent</span>
                  </button>

                  <div className="member-progress" aria-hidden="true">
                    {shown.map((member, memberIndex) => (
                      <button
                        key={member.id}
                        type="button"
                        className={memberIndex === index ? 'is-active' : ''}
                        onClick={() => setIndex(memberIndex)}
                        tabIndex={-1}
                        aria-label={`Afficher le profil de ${member.name}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="member-arrow member-arrow-next"
                    onClick={next}
                    aria-label="Profil suivant"
                    disabled={shown.length < 2}
                  >
                    <span>Suivant</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>

            <p className="members-note">
              Les profils sont publiés avec l'accord des personnes concernées.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
