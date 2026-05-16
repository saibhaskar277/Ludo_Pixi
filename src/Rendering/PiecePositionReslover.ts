import { PieceState, PositionType } from "../Core/State/GameState";
import { BoardLayout } from "./BoardLayout";
import { Color } from "../GameConfigs/BoardConfig";

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
        // --- NEW: Calculate exact centers of the inner triangles! ---
        // The exact center of your 720x720 board is (360, 360)
        const CENTER_X = 360;
        const CENTER_Y = 360;

        // How far into the triangle the piece should sit (tweak this number!)
        const OFFSET = 28;

        if (piece.color === Color.RED) {
          // Red is the Bottom triangle, push Y down
          return { x: CENTER_X, y: CENTER_Y + OFFSET };
        }
        if (piece.color === Color.GREEN) {
          // Green is the Left triangle, push X left
          return { x: CENTER_X - OFFSET, y: CENTER_Y };
        }
        if (piece.color === Color.YELLOW) {
          // Yellow is the Top triangle, push Y up
          return { x: CENTER_X, y: CENTER_Y - OFFSET };
        }
        if (piece.color === Color.BLUE) {
          // Blue is the Right triangle, push X right
          return { x: CENTER_X + OFFSET, y: CENTER_Y };
        }

        return { x: CENTER_X, y: CENTER_Y };
    }
  }
}
