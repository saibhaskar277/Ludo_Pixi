import { Application, Assets } from "pixi.js";
import { GameScene } from "./Scenes/GameScene"; // adjust path if needed
import { GameConfig } from "./GameConfigs/GameConfig";

async function bootstrap() {
  const app = new Application();

  // Use the fixed dimensions from GameConfig
  await app.init({
    width: GameConfig.GAME_WIDTH,
    height: GameConfig.GAME_HEIGHT,
    background: GameConfig.BACKGROUND_COLOR,
    antialias: true,
  });

  document.body.style.margin = "0";
  document.body.appendChild(app.canvas);

  // PRELOAD the board image so it's ready before the scene renders
  await Assets.load(GameConfig.BOARD_IMAGE_PATH);

  const gameScene = new GameScene(app);
  app.stage.addChild(gameScene);
}

bootstrap();
