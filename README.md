🎲 Ludo PixiJS
A fully interactive, visually rich, and modern Ludo game built from scratch using TypeScript, PixiJS (v8), and GSAP.

This project features a robust architecture with a strict separation between the core game logic (Engine) and the visual representation (Renderer). It includes smooth tile-by-tile animations, dynamic piece stacking, and a custom developer debug UI.

✨ Features
Complete Ludo Rules Engine: Accurately handles safe zones, capturing opponents, home path restrictions, and exact-roll goal entries.

Dynamic Piece Stacking: When multiple pieces occupy the same tile, they automatically scale down and arrange themselves into a neat grid to avoid overlapping and layering issues.

Smooth Pathfinding Animations: Pieces physically "walk" step-by-step along the track instead of teleporting, powered by GSAP.

Auto-Turn Skipping: If a player rolls the dice but has no valid moves (e.g., all pieces are in the yard and they didn't roll a 6), the engine automatically skips their turn.

Extra Turn Rewards: Rolling a 6 or capturing an opponent's piece correctly grants the player an extra turn.

Developer Cheat UI: A modular, built-in cheat panel to force specific dice rolls (1-6) for rapid debugging and edge-case testing.

🛠️ Tech Stack
Language: TypeScript

Rendering: PixiJS (Canvas/WebGL)

Animations: GSAP (GreenSock Animation Platform)

Bundler: Vite

🚀 Getting Started
Prerequisites
Make sure you have Node.js installed on your machine.
