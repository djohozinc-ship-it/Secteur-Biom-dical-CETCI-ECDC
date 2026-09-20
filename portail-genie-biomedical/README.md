# Portail du Génie Biomédical au Bénin

Site statique (React + TypeScript + Vite), sans backend ni base de données, hébergé gratuitement sur GitHub Pages.
Routage : `HashRouter` (adresses en `/#/page`), ce qui évite toute 404 au rafraîchissement sur GitHub Pages.

## Lancer en local
`npm ci` puis `npm run dev`. Vérification avant publication : `npm run build`.

## Règle d'or : un contenu n'est visible que s'il est publié
Chaque contenu a un `statut` :
- `brouillon` : jamais affiché ;
- `publie` : affiché ;
- `archive` : affiché uniquement dans l'onglet « Archives ».
Un statut absent ou inconnu = non affiché. Les opportunités dont la date limite est dépassée passent seules en archives.

## Où modifier quoi
| Contenu | Fichier |
|---|---|
| Identité, contacts, logo, partenaires, indicateurs, interrupteurs | `src/config/site.ts` |
| Actualités | `src/data/articles/*.md` (modèle : `src/data/_modeles/article.md`) |
| Communiqués, ressources, projets, formations, opportunités, membres, annuaire | `src/data/<rubrique>/<rubrique>.json` (modèles dans `src/data/_modeles/`) |
| Domaines du génie biomédical | `src/data/rubriques/rubriques.json` |
| Images / documents | `public/images/`, `public/documents/` |

Les fichiers de données sont vides au départ : le site affiche « Contenu à venir ». N'ajoutez que des informations vérifiées, avec leur source.

## Mode démonstration
Pour voir le rendu avec des exemples fictifs : `showDemo: true` dans `src/config/site.ts`.
Une bannière et des badges « Démonstration » les identifient. Les données fictives sont dans `src/data/demo/`. **Remettre `false` avant publication.**

## Logo et identité officielle
Renseigner dans `src/config/site.ts` : `officialName`, `organisme`, `logo` (fichier dans `public/`), `contact`, `social`, `partenaires`, `liensInstitutionnels`.
Tout champ vide n'est pas affiché.

## Indicateurs
La section « Indicateurs du secteur » n'apparaît que si `indicateurs` contient des chiffres vérifiés avec leur source.

## SEO
Balises de base, Open Graph et Twitter dans `index.html` (adresse GitHub Pages actuelle). Le sitemap ne liste que la page d'accueil : avec `HashRouter`, les sous-pages ne sont pas des URL indexables séparément.
Si l'adresse du site change, mettre à jour `index.html`, `public/robots.txt`, `public/sitemap.xml` et `siteUrl`.
