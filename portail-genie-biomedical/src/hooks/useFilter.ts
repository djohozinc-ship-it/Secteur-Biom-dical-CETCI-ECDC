import { useMemo, useState } from 'react';
import { matchScore } from '../utils/search';

interface Fields { title: string; text: string; category: string; }

export function useFilter<T>(items: T[], fields: (item: T) => Fields) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => fields(i).category))).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );
  const result = useMemo(
    () => items.filter((i) => {
      const f = fields(i);
      return (!cat || f.category === cat) && matchScore(q, f.title, f.text) > 0;
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, q, cat],
  );
  return { q, setQ, cat, setCat, categories, result };
}
