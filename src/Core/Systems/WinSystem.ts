import { PieceState, PositionType } from "../State/GameState";

export class WinSystem {
  public hasPlayerWon(pieces: PieceState[]) {
    return pieces.every((piece) => piece.positionType === PositionType.GOAL);
  }
}
