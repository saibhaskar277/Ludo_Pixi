import { Container, Sprite } from "pixi.js";
import { GameConfig } from "../GameConfigs/GameConfig";

export class BoardView extends Container {
  constructor() {
    super();
    this.createBoard();
  }

  private createBoard() {
    const board = Sprite.from(GameConfig.BOARD_IMAGE_PATH);

    board.width = GameConfig.BOARD_SIZE;
    board.height = GameConfig.BOARD_SIZE;

    this.addChild(board);
  }
}
