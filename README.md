# 💣 TIC TAC BOOM - Jeu Multijoueur

Jeu de mots explosif multijoueur jusqu'à 30 joueurs en P2P !

## 🚀 Installation

### Option 1: Installation locale
1. Téléchargez tous les fichiers dans un dossier
2. Ouvrez `index.html` dans un navigateur moderne
3. C'est prêt !

### Option 2: Installation PWA (Application Web Progressive)
1. Hébergez les fichiers sur un serveur HTTPS
2. Ouvrez l'application dans Chrome/Edge/Safari
3. Cliquez sur "Installer" dans la barre d'adresse
4. L'app sera installée sur votre appareil !

## 📁 Structure des fichiers

```
tic-tac-boom/
├── index.html              # Fichier principal
├── dictionary.js           # Dictionnaire français (50k+ mots)
├── manifest.json           # Configuration PWA
├── service-worker.js       # Cache et mode hors-ligne
├── icon-72.png            # Icône 72x72
├── icon-96.png            # Icône 96x96
├── icon-128.png           # Icône 128x128
├── icon-144.png           # Icône 144x144
├── icon-152.png           # Icône 152x152
├── icon-192.png           # Icône 192x192
├── icon-384.png           # Icône 384x384
└── icon-512.png           # Icône 512x512
```

## 🎨 Génération des icônes

### Méthode automatique (recommandée)
Utilisez un générateur d'icônes PWA en ligne :
- https://www.pwabuilder.com/imageGenerator
- https://maskable.app/editor

1. Créez une image 512x512px avec le logo 💣
2. Uploadez-la sur un générateur
3. Téléchargez toutes les tailles
4. Placez-les dans le dossier du jeu

### Méthode manuelle
Utilisez Photoshop, GIMP ou Figma :
1. Créez un carré 512x512px
2. Fond: #0a0c14 (bleu foncé)
3. Emoji 💣 centré (taille ~400px)
4. Exportez en PNG aux dimensions suivantes :
   - 72x72, 96x96, 128x128, 144x144
   - 152x152, 192x192, 384x384, 512x512

## ✨ Fonctionnalités

### Modes de jeu
- **🎯 Classique** : Syllabe n'importe où dans le mot
- **🎓 Expert** : Syllabe au début OU à la fin uniquement
- **⚡ Survival** : Timer réduit de 10% après chaque mot
- **🎨 Thématique** : Mots d'une catégorie (Animaux, Pays, etc.)

### Paramètres
- 1-5 vies par joueur
- Timer : 5-30 secondes
- Difficulté : Facile, Moyen, Difficile
- Thème sombre/clair
- Mode économie d'énergie
- Statistiques réseau (ping)

### Réseau
- Architecture P2P (PeerJS)
- Jusqu'à 30 joueurs simultanés
- Calcul du ping en temps réel
- Indicateurs de qualité réseau
- Synchronisation optimisée
- Compensation de latence

### Sécurité
- Sanitisation XSS
- Protection race conditions
- Validation stricte des mots
- Nettoyage automatique de la mémoire

## 🎮 Comment jouer

### Créer une partie
1. Entrez votre pseudo (2+ caractères)
2. Cliquez sur "Créer une partie"
3. Configurez les paramètres
4. Partagez le code à 4 lettres
5. Cliquez sur "Lancer" (min. 2 joueurs)

### Rejoindre une partie
1. Entrez votre pseudo
2. Cliquez sur "Rejoindre"
3. Entrez le code de la partie
4. Attendez que l'hôte lance !

### Pendant le jeu
- Une syllabe s'affiche à l'écran
- À votre tour, trouvez un mot contenant cette syllabe
- Tapez le mot et validez (ou Entrée)
- Le mot doit :
  - Contenir la syllabe (sauf mode Expert)
  - Avoir au moins 3 lettres
  - Être dans le dictionnaire
  - Ne pas avoir été déjà utilisé
- Attention au timer ! 💣
- Si le temps expire, vous perdez une vie
- Dernier joueur en vie = VICTOIRE ! 🏆

## 🔧 Configuration requise

### Navigateurs supportés
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Réseau
- Connexion Internet active (P2P)
- Ports non bloqués
- Pas de pare-feu strict

### Performances
- CPU : Moderne (2015+)
- RAM : 1 GB minimum
- GPU : Intégré suffit

## 🐛 Dépannage

### Le dictionnaire ne charge pas
1. Vérifiez votre connexion Internet
2. Le jeu utilisera un dictionnaire de secours (500 mots)
3. Rechargez la page après 10 secondes

### Impossible de rejoindre un salon
1. Vérifiez le code (4 caractères)
2. Assurez-vous que la partie n'a pas démarré
3. Le salon peut être plein (30 joueurs max)
4. Vérifiez votre connexion Internet

### Lag/latence élevée
1. Fermez les autres onglets
2. Rapprochez-vous du routeur Wi-Fi
3. Activez "Mode économie d'énergie"
4. L'hôte doit avoir une bonne connexion

### L'app ne s'installe pas
1. Utilisez HTTPS (pas HTTP)
2. Le manifest.json doit être accessible
3. Toutes les icônes doivent exister
4. Essayez Chrome/Edge (meilleur support PWA)

## 📊 Performances

### Optimisations réseau
- Broadcast throttling (50ms minimum)
- Batch DOM updates
- Event listener cleanup
- Compensation de latence du timer

### Optimisations mémoire
- Dictionnaire lazy-loaded
- DocumentFragment pour rendu
- WeakMap pour connections
- Garbage collection automatique

## 🤝 Contribution

Ce jeu est open-source ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter des modes de jeu
- Traduire dans d'autres langues

## 📜 Licence

MIT License - Libre d'utilisation et de modification

## 🎉 Crédits

- **Design** : Interface moderne avec Tailwind concepts
- **Réseau** : PeerJS pour le P2P
- **Animations** : Canvas Confetti
- **Dictionnaire** : Lexique.org (140k formes fléchies)
- **Polices** : Google Fonts (Poppins, Outfit)

---

Fait avec ❤️ pour les amateurs de jeux de mots !

**Version** : 1.0.0  
**Dernière mise à jour** : 2025
