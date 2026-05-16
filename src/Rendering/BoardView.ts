import { Container, Sprite } from "pixi.js";
import { GameConfig } from "../GameConfigs/GameConfig";

export class BoardView extends Container {
  constructor() {
    super();
    this.createBoard();
  }

  private createBoard() {
    // Use the fixed path from config
    const board = Sprite.from(GameConfig.BOARD_IMAGE_PATH);

    // Apply fixed dimensions
    board.width = GameConfig.BOARD_SIZE;
    board.height = GameConfig.BOARD_SIZE;

    this.addChild(board);
  }
}
