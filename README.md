# 🎲 Ludo PixiJS


## 🚀 Live Demo
**[(https://saibhaskar277.github.io/Ludo_Pixi/)]**


A modern, fully interactive Ludo game built with **TypeScript**, **PixiJS v8**, and **GSAP**.

This project is designed with a scalable architecture that cleanly separates:

- core gameplay logic
- rendering systems
- animations
- state management

The goal is to create a smooth, visually polished, and extensible board game experience suitable for future multiplayer and mobile support.

---

# ✨ Features

## 🎮 Complete Ludo Rules Engine

Implements core gameplay mechanics including:

- Safe tiles
- Piece capturing
- Home path restrictions
- Exact-roll goal entry
- Extra turns on rolling 6
- Automatic turn skipping

---

## 🧩 Dynamic Piece Stacking

When multiple pieces occupy the same tile, they automatically:

- scale down
- reposition
- arrange into a clean grid

This avoids:

- overlapping pieces
- z-index issues
- unreadable stacks

---

## 🎞️ Smooth Tile-by-Tile Animations

Powered by **GSAP**.

Pieces move:

- tile-by-tile
- with smooth interpolation
- using path-based movement

instead of teleporting instantly.

---

## 🎲 Developer Cheat Panel

Includes built-in debugging tools for:

- forcing dice rolls
- testing edge cases
- validating gameplay rules quickly

Useful during gameplay system development.

---

## 🏗️ Scalable Architecture

The project follows a modular architecture with:

- Engine layer
- Rendering layer
- Systems layer
- State layer

This structure makes it easy to extend into:

- multiplayer
- replay systems
- AI players
- mobile builds

---

# 🛠️ Tech Stack

- **TypeScript**
- **PixiJS v8**
- **GSAP**
- **Vite**

---

# 📂 Project Structure

```txt
src/
 ├── Core/
 │    ├── Engine/
 │    ├── Logic/
 │    ├── State/
 │    └── Systems/
 │
 ├── Rendering/
 │
 ├── Scenes/
 │
 ├── GameConfigs/
 │
 └── HelperClasses/
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm

---

## Installation

```bash
git clone <repo-url>

cd ludo-pixijs

npm install
```

---

## Run Development Server

```bash
npm run dev
```

# 🎯 Future Improvements

Planned features:

- Online multiplayer
- Mobile support
- AI players
- Sound effects
- Particle systems
- Matchmaking
- Replay system
