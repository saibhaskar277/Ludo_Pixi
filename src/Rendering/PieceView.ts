import { Graphics, Container } from "pixi.js";
import { PieceState } from "../Core/State/GameState";
import { PiecePositionResolver } from "./PiecePositionReslover";
import { Color } from "../GameConfigs/BoardConfig";
import { GameConfig } from "../GameConfigs/GameConfig";

export class PieceView extends Container {
  public pieceState: PieceState;
  private body: Graphics;
  public baseScale: number = 1; // Remembers its scale when stacked

  constructor(pieceState: PieceState) {
    super();
    this.pieceState = pieceState;
    this.body = new Graphics();
    this.drawPiece();
    this.addChild(this.body);

    // Initial sync
    const pos = PiecePositionResolver.resolve(this.pieceState);
    this.position.set(pos.x, pos.y);
  }

  private drawPiece() {
    this.body.clear();
    let color = 0xffffff;

    switch (this.pieceState.color) {
      case Color.RED:
        color = 0xff0000;
        break;
      case Color.GREEN:
        color = 0x00ff00;
        break;
      case Color.YELLOW:
        color = 0xffff00;
        break;
      case Color.BLUE:
        color = 0x0000ff;
        break;
    }

    const TILE_SIZE = GameConfig.BOARD_SIZE / 15;
    const PIECE_RADIUS = TILE_SIZE * 0.35; // Pieces will take up 70% of a tile

    this.body.circle(0, 0, PIECE_RADIUS);
    this.body.fill(color);
    this.body.stroke({ color: 0xffffff, width: 4 });
  }

  public makeInteractive(onClick: () => void) {
    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerdown", onClick);

    this.on("pointerover", () => {
      this.scale.set(this.baseScale * 1.15); // Scale relative to current size
      if (this.parent) {
        this.parent.addChild(this); // Bring to front visually
      }
    });

    this.on("pointerout", () => {
      this.scale.set(this.baseScale); // Restore stack size
    });
  }

  public updateState(piece: PieceState) {
    this.pieceState = piece;
  }
}
