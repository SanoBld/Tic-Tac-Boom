# 💣 Tic-Tac-Boom

Bienvenue sur le dépôt de **Tic-Tac-Boom**, un jeu de rapidité et de vocabulaire en ligne. L'objectif est simple : une syllabe s'affiche, et vous devez trouver un mot qui la contient avant que la bombe n'explose.

🔗 **Jouer en ligne :** [https://sanobld.github.io/Tic-Tac-Boom/](https://sanobld.github.io/Tic-Tac-Boom/)

---

## 🎮 Les Modes de Jeu

Le jeu propose deux expériences distinctes pour s'adapter à toutes les situations :

### 🕹️ Mode Solo
- Défiez-vous dans une montée en difficulté progressive.
- Gagnez des points en répondant vite.
- Débloquez des succès et battez votre meilleur score (sauvegardé localement).

### 🌐 Mode Multijoueur (P2P)
- **Hôte** : Créez une salle et recevez un code unique.
- **Joueur** : Rejoignez vos amis en entrant simplement le code.
- **Technologie** : Utilise **PeerJS**, ce qui permet une connexion directe entre les joueurs pour une latence minimale.

---

## ✨ Fonctionnalités Avancées

### 📱 Progressive Web App (PWA)
Le projet est configuré comme une PWA. Vous pouvez :
- L'installer sur votre écran d'accueil (iOS, Android, Windows, macOS).
- Y jouer même avec une connexion instable grâce au **Service Worker** qui met les fichiers en cache.

### 📚 Dictionnaire Intelligent
- Utilise une base de données de mots français intégrée (`French.txt`).
- Chargement asynchrone pour ne pas ralentir le démarrage du jeu.
- Vérification instantanée via un objet `Set` en JavaScript pour des performances optimales.

### 🏅 Système de Succès
- Intégration d'un système de badges.
---

## 🛠️ Stack Technique

- **Interface** : HTML5 / CSS3 (Design moderne, Glassmorphism, Responsive).
- **Animations** : [GSAP](https://greensock.com/gsap/) pour des transitions fluides et dynamiques.
- **Réseau** : [PeerJS](https://peerjs.com/) pour la communication WebRTC en temps réel.
- **Audio** : [Howler.js](https://howlerjs.com/) pour une gestion sonore immersive.
- **Cache** : Service Worker (`sw.js`) pour le support hors-ligne.
