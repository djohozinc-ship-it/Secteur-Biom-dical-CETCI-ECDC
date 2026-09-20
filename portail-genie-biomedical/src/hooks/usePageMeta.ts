import { useEffect } from 'react';
import { site } from '../config/site';

function setMeta(selector: string, attr: 'content', value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

// Met à jour le titre et les métadonnées de la page (moteurs de recherche, partages).
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} – ${site.name}` : site.name;
    const desc = description ?? site.description;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    window.scrollTo(0, 0);
  }, [title, description]);
}
