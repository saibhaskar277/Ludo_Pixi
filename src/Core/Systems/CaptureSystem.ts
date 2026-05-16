import { PieceState, PositionType } from "../State/GameState";
import { LudoRules } from "../../GameConfigs/LudoRules";

export class CaptureSystem {
  public checkCapture(
    movedPiece: PieceState,
    allPieces: PieceState[],
  ): PieceState[] {
    if (movedPiece.positionType !== PositionType.TRACK) {
      return [];
    }

    // Cannot capture on star tiles or start tiles
    if (LudoRules.SAFE_TILES.has(movedPiece.positionIndex)) {
      return [];
    }

    return allPieces.filter((piece) => {
      // 1. Friendly pieces (and the moved piece itself) cannot be captured
      if (piece.color === movedPiece.color) {
        return false;
      }

      // 2. Capture enemy pieces on the exact same track tile
      return (
        piece.positionType === PositionType.TRACK &&
        piece.positionIndex === movedPiece.positionIndex
      );
    });
  }

  public sendToYard(piece: PieceState): PieceState {
    return {
      ...piece,
      positionType: PositionType.YARD,
      positionIndex: 0,
    };
  }
}
