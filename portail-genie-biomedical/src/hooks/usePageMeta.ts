import { useEffect } from 'react';
import { site } from '../config/site';

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} – ${site.name}` : site.name;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description ?? site.description);
    window.scrollTo(0, 0);
  }, [title, description]);
}
