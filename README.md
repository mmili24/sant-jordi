# Runs & Roses 🌹

A Phaser 3 platform game built with Vite and Bun. Help Sant Jordi collect all 10 roses before time runs out!

## Versions

This project has been built with:

- **Phaser** 3.87.0
- **Vite** 6.0.0
- **Bun** 1.x

## Requirements

[Bun](https://bun.sh/) is required to install dependencies and run scripts.

## Available Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install project dependencies |
| `bun run dev` | Launch a development web server |
| `bun run build` | Create a production build in the `dist` folder |
| `bunx vite` | Alternative way to launch the dev server |

## Getting Started

After cloning the repo, run `bun install` from your project directory. Then start the local development server:

```bash
bun run dev
```

The local development server runs on `http://localhost:5173` by default.

Once the server is running you can edit any of the files in the `src` folder. Vite will automatically recompile your code and reload the browser.

## How to Play

| Key | Action |
|-----|--------|
| `←` `→` | Move Sant Jordi |
| `↑` | Jump |

Collect all **10 roses** scattered across the platforms before the **60 second** timer runs out. If you collect them all, you win. If time runs out, game over!

## Project Structure

```
runs-and-roses/
├── public/
│   └── assets/         Game sprites and images. Served directly at runtime.
├── src/
│   ├── scenes/         All Phaser game scenes.
│   │   ├── BootScene.js      Asset loading + animations
│   │   ├── GameScene.js      Main game orchestrator
│   │   └── UIScene.js        HUD running in parallel
│   ├── entities/       Game entities (sprites).
│   │   ├── Player.js         Sant Jordi — movement and animations
│   │   └── Rose.js           Collectible rose
│   ├── events/
│   │   └── EventBus.js       Singleton for inter-scene communication
│   ├── config/
│   │   └── gameConfig.js     Phaser configuration
│   ├── style.css       Landing page styles
│   └── main.js         Application entry point
├── index.html
├── vite.config.js
└── package.json
```

## Handling Assets

All static assets are placed in the `public/assets` folder and loaded via Phaser's loader:

```javascript
preload() {
  this.load.image('sky', 'assets/fondo.png');
  this.load.spritesheet('jordi', 'assets/jordi-sprite.png', {
    frameWidth: 68,
    frameHeight: 68
  });
}
```

When you run `bun run build`, all static assets are automatically copied to the `dist/assets` folder.

## Architecture

This project follows **SOLID principles** applied to game development:

**SRP — Single Responsibility**
Each file has one single responsibility. `BootScene` loads assets. `GameScene` orchestrates the game. `UIScene` manages the HUD. None of them do what the others should.

**OCP — Open/Closed**
New entities can be added by extending the base `Phaser.Physics.Arcade.Sprite` class without modifying existing code.

**DIP — Dependency Inversion**
Scenes communicate through `EventBus` as an abstraction. `GameScene` emits events, `UIScene` listens — neither knows about the other directly.

```
GameScene ──emit──► EventBus ──on──► UIScene
   │                                    │
   └── 'rose-collected'                 └── updateRoses()
   └── 'timer-update'                   └── updateTimer()
```

## Deploying to Production

Run the build command:

```bash
bun run build
```

Your game will be built into the `dist` folder. Upload all contents of `dist` to any static web server, or deploy to Vercel:

```bash
bunx vercel --prod
```

## Technologies

- [Phaser 3](https://phaser.io/) — HTML5 game framework
- [Vite](https://vitejs.dev/) — fast bundler with Hot Module Replacement
- [Bun](https://bun.sh/) — ultra-fast JavaScript runtime and package manager

---

Made by Mili — Institut MVM · Sant Jordi 2026
