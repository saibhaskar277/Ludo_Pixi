import { Color } from "../../GameConfigs/BoardConfig";
import { DiceSystem } from "../Systems/DiceSystem";
import {
  GamePhase,
  GameState,
  PieceState,
  PlayerState,
  PositionType,
} from "../State/GameState";
import { MovementValidator } from "../Logic/MovementValidator";
import { MovementSystem } from "../Systems/MovementSystem";
import { TurnManager } from "../Logic/TurnManager";
import { CaptureSystem } from "../Systems/CaptureSystem";
import { WinSystem } from "../Systems/WinSystem";

export class GameEngine {
  public gameState: GameState;

  private diceSystem = new DiceSystem();
  private movementValidator = new MovementValidator();
  private movementSystem = new MovementSystem();
  private turnManager = new TurnManager();
  private captureSystem = new CaptureSystem();
  private winSystem = new WinSystem();

  constructor() {
    this.gameState = this.createInitialGameState();
  }

  private createPlayer(color: Color): PlayerState {
    return {
      color,
      isActive: true,
      hasRolled: false,
      pieces: [0, 1, 2, 3].map((id) => ({
        id,
        color,
        positionType: PositionType.YARD,
        positionIndex: 0,
      })),
    };
  }

  private createInitialGameState(): GameState {
    return {
      players: {
        [Color.RED]: this.createPlayer(Color.RED),
        [Color.GREEN]: this.createPlayer(Color.GREEN),
        [Color.YELLOW]: this.createPlayer(Color.YELLOW),
        [Color.BLUE]: this.createPlayer(Color.BLUE),
      },
      currentTurn: Color.RED,
      currentDiceRoll: null,
      gameState: GamePhase.WAITING_FOR_ROLL,
      winner: null,
    };
  }

  public rollDice(forcedValue?: number) {
    // If a cheat value is provided, use it. Otherwise, roll randomly.
    const value =
      forcedValue !== undefined ? forcedValue : this.diceSystem.roll();

    this.gameState.currentDiceRoll = value;
    this.gameState.gameState = GamePhase.WAITING_FOR_MOVE;

    return value;
  }

  public hasValidMoves(color: Color, roll: number): boolean {
    const player = this.gameState.players[color];
    return player.pieces.some((piece) =>
      this.movementValidator.canMovePiece(this.gameState, piece, roll),
    );
  }

  public skipTurn() {
    this.gameState.currentTurn = this.turnManager.getNextTurn(
      this.gameState.currentTurn,
    );
    this.gameState.currentDiceRoll = null;
    this.gameState.gameState = GamePhase.WAITING_FOR_ROLL;
  }

  public movePiece(piece: PieceState) {
    const roll = this.gameState.currentDiceRoll;

    if (roll == null) return null;
    if (!this.movementValidator.canMovePiece(this.gameState, piece, roll))
      return null;

    const updatedPiece = this.movementSystem.movePiece(piece, roll);
    const player = this.gameState.players[piece.color];
    const index = player.pieces.findIndex((p) => p.id === piece.id);

    // Update piece position in state
    player.pieces[index] = updatedPiece;

    // Fetch all pieces to check for collisions
    const allPieces = Object.values(this.gameState.players).flatMap(
      (p) => p.pieces,
    );

    // Process captures using the fixed capture system
    const captured = this.captureSystem.checkCapture(updatedPiece, allPieces);

    captured.forEach((capturedPiece) => {
      const owner = this.gameState.players[capturedPiece.color];
      const i = owner.pieces.findIndex((p) => p.id === capturedPiece.id);
      owner.pieces[i] = this.captureSystem.sendToYard(capturedPiece);
    });

    // Check Win Condition
    if (this.winSystem.hasPlayerWon(player.pieces)) {
      this.gameState.gameState = GamePhase.GAME_OVER;
      this.gameState.winner = piece.color;
      return updatedPiece;
    }

    // Determine Turn Logic: Player gets another turn if they rolled a 6 OR captured an enemy
    const getsExtraTurn = roll === 6 || captured.length > 0;

    if (!getsExtraTurn) {
      this.gameState.currentTurn = this.turnManager.getNextTurn(
        this.gameState.currentTurn,
      );
    }

    // Reset phase for the next roll
    this.gameState.currentDiceRoll = null;
    this.gameState.gameState = GamePhase.WAITING_FOR_ROLL;

    return updatedPiece;
  }
}
