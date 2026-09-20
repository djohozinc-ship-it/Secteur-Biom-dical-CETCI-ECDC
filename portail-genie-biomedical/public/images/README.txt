PHOTOGRAPHIES ÉDITORIALES — mode d'emploi
=========================================
Le design prévoit 4 emplacements photo. Tant qu'un fichier n'est pas renseigné dans
src/config/site.ts (section "images"), le site affiche un emplacement neutre « Photographie à venir ».

Pour chaque photo : copier le fichier dans ce dossier (public/images/), puis renseigner dans site.ts :
  src : 'images/nom-du-fichier.jpg'
  alt : description précise de ce que montre la photo (obligatoire, pour l'accessibilité)
  caption : légende éditoriale (facultatif)
  credit : nom du photographe ou de la source (facultatif)

Sujets recommandés (chaque image doit avoir une fonction éditoriale) :
  hero          Technicien ou ingénieur biomédical en situation de travail réelle sur un équipement
                (laboratoire, atelier de maintenance, service hospitalier). Pas de pose face caméra.
                Format conseillé : carré ou proche du carré, 1600 x 1600 px minimum.
  presentation  Équipement médical en cours de vérification ou de maintenance, ou contrôle d'un appareil.
                Format : 3:2 ou 4:5, 1600 px de large minimum.
  innovation    Prototype, carte électronique, banc d'essai ou travail d'étudiants en ingénierie.
                Format : 3:2, 1600 px de large minimum.
  formation     Étudiants en atelier ou en travaux pratiques d'électronique / maintenance biomédicale.
                Format : 3:2, 1600 px de large minimum.

Règles
  - N'utiliser que des photos dont vous détenez les droits (prises par la communauté, ou autorisation écrite).
  - Obtenir l'accord des personnes photographiées ; éviter toute donnée visible de patients.
  - Ne pas utiliser d'images générées par IA, ni de banques d'images sans rapport avec le sujet.
  - Optimiser avant d'envoyer : JPEG ou WebP, environ 200 à 400 Ko par image.
  - Cadrage : les images sont recadrées automatiquement au ratio de leur emplacement (object-fit: cover).
    Placer le sujet principal au centre.
