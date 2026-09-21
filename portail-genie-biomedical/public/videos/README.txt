AJOUTER UNE VIDÉO AU DIAPORAMA D'ACCUEIL
========================================
Deux méthodes. Choisissez selon la vidéo.

MÉTHODE A — Vidéo d'arrière-plan (courte, SANS son), hébergée sur le site
  Pour : une boucle de 8 à 15 secondes qui remplace la photo (la photo reste affichée pendant le chargement).
  1. Préparer la vidéo (voir « Compression » ci-dessous) : format MP4, 1280 px de large, sans son, moins de 10 Mo.
  2. La copier dans ce dossier : public/videos/presentation.mp4
  3. Dans src/config/site.ts, décommenter la ligne :  video: { src: 'videos/presentation.mp4' },
  4. Envoyer les fichiers sur GitHub (commit) : le déploiement se fait tout seul.
  Comportement : lecture automatique, sans son, en boucle, sur ordinateur et tablette. Sur téléphone, en mode
  « économie de données » ou si l'utilisateur réduit les animations, la photo s'affiche avec un bouton « Lire la vidéo ».
  Un bouton Pause est toujours proposé.

MÉTHODE B — Vidéo complète AVEC son (présentation, interview), hébergée sur YouTube
  Pour : une vidéo longue. Elle ne pèse rien sur le site et s'ouvre dans une fenêtre au clic.
  1. Mettre la vidéo sur YouTube (compte gratuit ; « non répertoriée » ou « publique »).
  2. Copier son adresse (ex. https://youtu.be/AbCdEfGhIjK).
  3. Dans src/config/site.ts, décommenter la ligne :  youtube: 'https://youtu.be/AbCdEfGhIjK',
  4. Envoyer sur GitHub. Un bouton « Regarder la vidéo » apparaît dans la légende de la diapositive.
  On peut combiner A et B (boucle en arrière-plan + vidéo complète au clic).

COMPRESSION (méthode A)
  Poids maximum conseillé : 10 Mo (limite GitHub : 100 Mo par fichier, 25 Mo par envoi depuis le navigateur).
  Outil gratuit sans ligne de commande : HandBrake (handbrake.fr) → préréglage « Fast 720p30 », format MP4,
  supprimer la piste audio, durée réduite à 15 s, qualité RF 26-28.
  En ligne de commande (ffmpeg) :
    ffmpeg -i original.mp4 -t 15 -an -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart presentation.mp4
  Cadrage : le sujet principal dans la moitié haute de l'image (la légende occupe le bas).
  Droits : ne publier que des vidéos dont vous détenez les droits, avec l'accord des personnes filmées.
