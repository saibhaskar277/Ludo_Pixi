import { Color } from "../../GameConfigs/BoardConfig";

export enum PositionType {
  YARD,
  TRACK,
  HOME_PATH,
  GOAL,
}

export enum GamePhase {
  WAITING_FOR_ROLL,
  WAITING_FOR_MOVE,
  GAME_OVER,
}
export interface PieceState {
  id: number;
  color: Color;
  positionType: PositionType;

  // 0-51 => common track
  // 0-5 => home path
  positionIndex: number;
}

export interface PlayerState {
  color: Color;
  isActive: boolean;
  hasRolled: boolean;
  pieces: PieceState[];
}

export interface GameState {
  players: Record<Color, PlayerState>;
  currentTurn: Color;
  currentDiceRoll: number | null;
  gameState: GamePhase;
  winner: Color | null;
}
