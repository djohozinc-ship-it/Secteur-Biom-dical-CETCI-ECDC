import { normalize } from './format';

// Un élément correspond si TOUS les mots saisis apparaissent dans son texte.
export function matchScore(query: string, title: string, text: string): number {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 1;
  const t = normalize(title);
  const x = normalize(text);
  let score = 0;
  for (const term of terms) {
    if (t.includes(term)) score += 3;
    else if (x.includes(term)) score += 1;
    else return 0;
  }
  return score;
}
