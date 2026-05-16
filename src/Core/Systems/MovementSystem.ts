import { LudoRules } from "../../GameConfigs/LudoRules";
import { PieceState, PositionType } from "../State/GameState";

export class MovementSystem {
  public movePiece(piece: PieceState, roll: number): PieceState {
    if (piece.positionType === PositionType.YARD) {
      return {
        ...piece,
        positionType: PositionType.TRACK,
        positionIndex: LudoRules.START_INDEX[piece.color],
      };
    }

    if (piece.positionType === PositionType.TRACK) {
      const homeEntry = LudoRules.HOME_ENTRY_INDEX[piece.color];
      const distanceToEntry =
        (homeEntry - piece.positionIndex + LudoRules.TRACK_LENGTH) %
        LudoRules.TRACK_LENGTH;

      if (roll > distanceToEntry) {
        const homeSteps = roll - distanceToEntry - 1;

        if (homeSteps === LudoRules.HOME_PATH_LENGTH) {
          return {
            ...piece,
            positionType: PositionType.GOAL,
            positionIndex: homeSteps,
          };
        }

        return {
          ...piece,
          positionType: PositionType.HOME_PATH,
          positionIndex: homeSteps,
        };
      }

      return {
        ...piece,
        positionType: PositionType.TRACK,
        positionIndex: (piece.positionIndex + roll) % LudoRules.TRACK_LENGTH,
      };
    }

    if (piece.positionType === PositionType.HOME_PATH) {
      const next = piece.positionIndex + roll;

      if (next === LudoRules.HOME_PATH_LENGTH) {
        return {
          ...piece,
          positionType: PositionType.GOAL,
          positionIndex: next,
        };
      }

      return {
        ...piece,
        positionType: PositionType.HOME_PATH,
        positionIndex: next,
      };
    }

    return piece;
  }
}
