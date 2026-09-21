import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSlide } from '../types';
import { asset } from '../utils/format';
import { Glyph } from './illustrations';

// Diaporama d'accueil : photo pleine largeur, encadré de légende, bouton d'action.
// Accessibilité : défilement automatique pausable (bouton), arrêté au survol et au focus,
// désactivé si l'utilisateur préfère réduire les animations ; boutons et pastilles au clavier.
export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const n = slides.length;
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [hold, setHold] = useState(false); // survol ou focus

  useEffect(() => {
    if (n < 2 || !playing || hold) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), 7000);
    return () => window.clearTimeout(t);
  }, [index, playing, hold, n]);

  if (n === 0) return null;
  const go = (i: number) => setIndex((i + n) % n);

  return (
    <section
      className={`slider${n > 1 ? ' slider--multi' : ''}`}
      aria-roledescription="carousel"
      aria-label="À la une"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="slides" aria-live={playing && n > 1 ? 'off' : 'polite'}>
        {slides.map((s, i) => (
          <div key={`${s.image}-${i}`} className={`slide${i === index ? ' is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} sur ${n}`} aria-hidden={i !== index}>
            <div className="slide-media">
              <img src={asset(s.image)} alt={s.alt} style={{ objectPosition: s.position ?? '50% 50%' }} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
            <div className="slide-caption">
              <div className="container">
                <div className="caption-box">
                  {s.kicker && <p className="caption-kicker">{s.kicker}</p>}
                  <h2>{s.title}</h2>
                  {s.text && <p>{s.text}</p>}
                  {s.cta && <Link className="btn btn-light" to={s.cta.to} tabIndex={i === index ? 0 : -1}>{s.cta.label}</Link>}
                </div>
              </div>
            </div>
            {s.credit && <p className="slide-credit">Crédit : {s.credit}</p>}
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <button type="button" className="slider-arrow slider-prev" onClick={() => go(index - 1)} aria-label="Diapositive précédente"><Glyph name="chevL" /></button>
          <button type="button" className="slider-arrow slider-next" onClick={() => go(index + 1)} aria-label="Diapositive suivante"><Glyph name="chevR" /></button>
          <div className="slider-bar">
            <div className="container">
              <div className="slider-controls">
                <button type="button" className="slider-pause" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Mettre en pause le défilement' : 'Reprendre le défilement'}>
                  <Glyph name={playing ? 'pause' : 'play'} size={18} />
                </button>
                <ul className="slider-dots">
                  {slides.map((s, i) => (
                    <li key={`${s.image}-${i}`}><button type="button" className={i === index ? 'is-on' : ''} onClick={() => setIndex(i)} aria-label={`Aller à la diapositive ${i + 1}`} aria-current={i === index ? 'true' : undefined} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
