import "pixi.js/unsafe-eval";
import { Application, Assets } from "pixi.js";
import { GameScene } from "./Scenes/GameScene";
import { GameConfig } from "./GameConfigs/GameConfig";

async function bootstrap() {
  const app = new Application();

  await app.init({
    width: GameConfig.GAME_WIDTH,
    height: GameConfig.GAME_HEIGHT,
    background: GameConfig.BACKGROUND_COLOR,
    antialias: true,
  });

  // --- MOBILE RESPONSIVE & CENTERING CSS ---
  document.body.style.margin = "0";
  document.body.style.backgroundColor = "#111111"; // Outer background
  document.body.style.display = "flex";
  document.body.style.justifyContent = "center";
  document.body.style.alignItems = "center";
  document.body.style.height = "100vh";
  document.body.style.overflow = "hidden"; // Prevents scrolling on mobile

  // This scales the canvas to fit the screen without stretching it
  app.canvas.style.maxWidth = "100%";
  app.canvas.style.maxHeight = "100%";
  app.canvas.style.objectFit = "contain";
  // -----------------------------------------

  document.body.appendChild(app.canvas);

  const fullAssetPath = GameConfig.BOARD_IMAGE_PATH;
  await Assets.load(fullAssetPath);

  const gameScene = new GameScene(app);
  app.stage.addChild(gameScene);
}

bootstrap();
