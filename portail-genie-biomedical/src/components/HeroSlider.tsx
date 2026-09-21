import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { HeroSlide } from '../types';
import { asset } from '../utils/format';
import { Glyph } from './illustrations';

// Extrait l'identifiant d'une vidéo YouTube (adresse complète, courte ou identifiant seul).
export function youtubeId(input: string): string | null {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) ?? input.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

function VideoDialog({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return (
    <dialog ref={ref} className="video-dialog" aria-label={title} onClose={onClose} onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
      <div className="video-dialog-head">
        <span>{title}</span>
        <button type="button" className="btn btn-small btn-light" onClick={() => ref.current?.close()}>Fermer</button>
      </div>
      <div className="video-frame">
        {/* youtube-nocookie : pas de cookie de suivi tant que la vidéo n'est pas lue */}
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      </div>
    </dialog>
  );
}

const mime = (src: string) => (src.endsWith('.webm') ? 'video/webm' : 'video/mp4');

// Diaporama d'accueil : photo ou vidéo pleine largeur, encadré de légende, bouton d'action.
// Accessibilité : défilement automatique pausable, arrêté au survol et au focus, désactivé si l'utilisateur
// préfère réduire les animations ; bouton dédié pour lire/mettre en pause la vidéo.
export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const n = slides.length;
  const env = typeof window !== 'undefined';
  const reduced = env && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const saveData = env && !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const wide = env && !!window.matchMedia?.('(min-width: 720px)').matches;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [hold, setHold] = useState(false);
  // Lecture automatique de la vidéo : seulement sur grand écran, sans « économie de données », sans mouvement réduit.
  const [videoOn, setVideoOn] = useState(!reduced && !saveData && wide);
  const [dialogId, setDialogId] = useState<string | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (n < 2 || !playing || hold || dialogId) return;
    const s = slides[index];
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % n), s.durationMs ?? (s.video ? 15000 : 7000));
    return () => window.clearTimeout(t);
  }, [index, playing, hold, n, slides, dialogId]);

  // Lecture / pause de la vidéo de la diapositive active
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && videoOn && !dialogId) v.play().catch(() => setVideoOn(false));
      else { v.pause(); if (i !== index) v.currentTime = 0; }
    });
  }, [index, videoOn, dialogId]);

  if (n === 0) return null;
  const go = (i: number) => setIndex((i + n) % n);
  const active = slides[index];
  const activeYt = active.youtube ? youtubeId(active.youtube) : null;

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
        {slides.map((s, i) => {
          const yt = s.youtube ? youtubeId(s.youtube) : null;
          return (
            <div key={`${s.image}-${i}`} className={`slide${i === index ? ' is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} sur ${n}`} aria-hidden={i !== index}>
              <div className="slide-media">
                {s.video ? (
                  <video ref={(el) => { videos.current[i] = el; }} muted loop playsInline preload="metadata" poster={asset(s.image)} aria-label={s.alt} style={{ objectPosition: s.position ?? '50% 50%' }}>
                    <source src={asset(s.video.src)} type={mime(s.video.src)} />
                  </video>
                ) : (
                  <img src={asset(s.image)} alt={s.alt} style={{ objectPosition: s.position ?? '50% 50%' }} loading={i === 0 ? 'eager' : 'lazy'} />
                )}
                {s.video && i === index && (
                  <button type="button" className="video-toggle" onClick={() => setVideoOn(!videoOn)} aria-label={videoOn ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}>
                    <Glyph name={videoOn ? 'pause' : 'play'} size={18} /><span>{videoOn ? 'Pause' : 'Lire la vidéo'}</span>
                  </button>
                )}
              </div>
              <div className="slide-caption">
                <div className="container">
                  <div className="caption-box">
                    {s.kicker && <p className="caption-kicker">{s.kicker}</p>}
                    <h2>{s.title}</h2>
                    {s.text && <p>{s.text}</p>}
                    <div className="caption-actions">
                      {s.cta && <Link className="btn btn-light" to={s.cta.to} tabIndex={i === index ? 0 : -1}>{s.cta.label}</Link>}
                      {yt && <button type="button" className="btn btn-outline-light" tabIndex={i === index ? 0 : -1} onClick={() => setDialogId(yt)}><Glyph name="play" size={16} /> Regarder la vidéo</button>}
                    </div>
                  </div>
                </div>
              </div>
              {s.credit && <p className="slide-credit">Crédit : {s.credit}</p>}
            </div>
          );
        })}
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
      {dialogId && <VideoDialog id={dialogId} title={activeYt ? active.title : 'Vidéo'} onClose={() => setDialogId(null)} />}
    </section>
  );
}
