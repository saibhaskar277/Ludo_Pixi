import { GameState, PieceState, PositionType } from "../State/GameState";
import { LudoRules } from "../../GameConfigs/LudoRules";

export class MovementValidator {
  public canMovePiece(
    gameState: GameState,
    piece: PieceState,
    roll: number,
  ): boolean {
    if (gameState.currentTurn !== piece.color) return false;

    // Pieces in the goal can no longer move
    if (piece.positionType === PositionType.GOAL) return false;

    if (piece.positionType === PositionType.YARD) return roll === 6;

    if (piece.positionType === PositionType.HOME_PATH) {
      return piece.positionIndex + roll <= LudoRules.HOME_PATH_LENGTH;
    }

    if (piece.positionType === PositionType.TRACK) {
      const homeEntry = LudoRules.HOME_ENTRY_INDEX[piece.color];
      const distanceToEntry =
        (homeEntry - piece.positionIndex + LudoRules.TRACK_LENGTH) %
        LudoRules.TRACK_LENGTH;

      // Check bounds if moving from track directly into the home path / goal
      if (roll > distanceToEntry) {
        const homeSteps = roll - distanceToEntry - 1;
        return homeSteps <= LudoRules.HOME_PATH_LENGTH;
      }
    }

    return true;
  }
}
