# Portail Génie Biomédical Bénin

Site statique (React + TypeScript + Vite), sans backend ni base de données. Hébergement gratuit sur GitHub Pages.

## Lancer en local
1. Installer Node.js (version 20 ou plus) : https://nodejs.org
2. Dans le dossier du projet : `npm install` puis `npm run dev`
3. Ouvrir l'adresse affichée (souvent http://localhost:5173)

## Vérifier avant publication
`npm run build` doit se terminer sans erreur.

## Modifier le contenu
| Contenu | Où | Comment |
|---|---|---|
| Nom, email, réseaux, annuaire | `src/config/site.ts` | changer les valeurs |
| Actualités | `src/data/articles/*.md` | 1 fichier = 1 article (voir les exemples). Supprimer le fichier = supprimer l'article. `statut: brouillon` = masqué |
| Communiqués | `src/data/communiques/communiques.json` | ajouter/modifier un bloc. PDF dans `public/documents/`, puis `"pdf": "documents/nom.pdf"` |
| Ressources, projets, formations, opportunités | `src/data/<rubrique>/*.json` | ajouter/modifier un bloc |
| Membres | `src/data/membres/membres.json` | `"consentement": true` obligatoire pour afficher |
| Photos des membres | `public/images/membres/` | `"photo": "images/membres/nom.jpg"` |
| Rubriques Génie biomédical | `src/data/rubriques/rubriques.json` | |

Supprimez les contenus « Démo » (`"demo": true`) une fois vos vrais contenus ajoutés.
Attention aux virgules dans les fichiers JSON : entre deux blocs, pas après le dernier.

## Publier sur GitHub Pages (gratuit)
1. Créer un compte sur github.com, puis un dépôt public (ex. `portail-biomedical`).
2. Envoyer les fichiers du projet dans le dépôt (branche `main`).
3. Dépôt > Settings > Pages > Source : **GitHub Actions**.
4. Chaque envoi sur `main` déclenche le déploiement (onglet Actions).
5. Adresse publique : `https://VOTRE-COMPTE.github.io/portail-biomedical/`
6. Mettre cette adresse dans `public/sitemap.xml` et `public/robots.txt`.

## Limites
- Pas de formulaire d'envoi réel (mailto ou formulaire externe).
- Pas d'administration en ligne : on modifie des fichiers.
- Adresses en `/#/page` (HashRouter), pour éviter les erreurs 404 sur GitHub Pages.
- Images à ajouter (aucune image fournie) ; illustration d'accueil provisoire.
