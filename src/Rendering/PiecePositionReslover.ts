import { PieceState, PositionType } from "../Core/State/GameState";
import { BoardLayout } from "./BoardLayout";
import { Color } from "../GameConfigs/BoardConfig";
import { GameConfig } from "../GameConfigs/GameConfig";

export class PiecePositionResolver {
  public static resolve(piece: PieceState) {
    switch (piece.positionType) {
      case PositionType.TRACK:
        return BoardLayout.commonTrackCoordinates[piece.positionIndex];

      case PositionType.HOME_PATH:
        return BoardLayout.homeTrackCoordinates[piece.color][
          piece.positionIndex
        ];

      case PositionType.YARD:
        return BoardLayout.yardCoordinates[piece.color][piece.id];

      case PositionType.GOAL:
        // 1. Find exact center of whatever the board size is
        const CENTER = GameConfig.BOARD_SIZE / 2;

        // 2. Offset pieces by ~60% of a tile size into their triangle
        const TILE_SIZE = GameConfig.BOARD_SIZE / 15;
        const OFFSET = TILE_SIZE * 0.6;

        if (piece.color === Color.RED) return { x: CENTER, y: CENTER + OFFSET };
        if (piece.color === Color.GREEN)
          return { x: CENTER - OFFSET, y: CENTER };
        if (piece.color === Color.YELLOW)
          return { x: CENTER, y: CENTER - OFFSET };
        if (piece.color === Color.BLUE)
          return { x: CENTER + OFFSET, y: CENTER };

        return { x: CENTER, y: CENTER };

      default:
        return { x: -1000, y: -1000 };
    }
  }
}
