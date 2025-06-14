# Game Detector

Ce script permet de détecter si un jeu spécifique est en cours d'exécution sur votre machine.

## Organisation des fichiers

- **frontend/** : Contient les fichiers liés à l'interface utilisateur (popup, styles, etc.).
  - `popup.html` : Interface utilisateur pour afficher les informations.
- **source/** : Contient la logique métier et les calculs.
  - `bundle.js` : Code source principal pour les calculs et la logique.
- **stream/** : Contient les scripts pour gérer les streams et la détection de jeu.
  - `gameDetector.js` : Script pour détecter si un jeu est en cours d'exécution.

## Utilisation

1. Installez Node.js si ce n'est pas déjà fait.
2. Modifiez le fichier `stream/gameDetector.js` pour remplacer `nom_du_processus_du_jeu` par le nom du processus de votre jeu.
3. Exécutez le script avec la commande :
   ```bash
   node stream/gameDetector.js
   ```
4. Le script affichera `En jeu` ou `Pas en jeu` toutes les 5 secondes.

## Compatibilité

- Windows
- macOS
- Linux
