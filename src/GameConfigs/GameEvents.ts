export enum GameEvents {
  DICE_ROLLED = "DICE_ROLLED",
  PIECE_MOVED = "PIECE_MOVED",
  PIECE_CAPTURED = "PIECE_CAPTURED",
  TURN_CHANGED = "TURN_CHANGED",
}

export type GameEventMap = {
  [GameEvents.DICE_ROLLED]: {
    color: string;
    value: number;
  };

  [GameEvents.PIECE_MOVED]: {
    pieceId: number;
    color: string;
    from: number;
    to: number;
  };

  [GameEvents.PIECE_CAPTURED]: {
    attackerId: number;
    victimId: number;
  };

  [GameEvents.TURN_CHANGED]: {
    currentTurn: string;
  };
};
