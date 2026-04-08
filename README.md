# Tic-Tac-Boom

A fast-paced vocabulary game built with web technologies. Find a word containing the given syllable before the bomb explodes.

**Play here:** [https://sanobld.github.io/Tic-Tac-Boom/](https://sanobld.github.io/Tic-Tac-Boom/)

---

## Game Modes

### Solo Mode
- Progressive difficulty scaling.
- Local high-score tracking.
- Achievement system.

### Multiplayer (P2P)
- **Host**: Create a room and share the unique access code.
- **Player**: Join via room code.
- **Tech**: Uses **PeerJS** for direct peer-to-peer connection and minimal latency.

---

## Technical Features

### PWA Support
- Installable on iOS, Android, Windows, and macOS.
- Offline capability via Service Worker caching.

### Dictionary & Validation
- Integrated French word database (`French.txt`).
- Asynchronous loading to prevent UI blocking.
- Instant validation using JavaScript `Set` for O(1) performance.

### Visuals & Audio
- UI built with Glassmorphism principles.
- Animations powered by **GSAP**.
- Audio managed via **Howler.js**.

---

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript.
- **Animations**: GSAP.
- **Networking**: PeerJS (WebRTC).
- **Audio**: Howler.js.
- **Analytics**: Umami.