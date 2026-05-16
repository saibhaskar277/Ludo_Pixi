import { Application, Container } from "pixi.js";
import gsap from "gsap"; // <--- Add this import
import { BoardView } from "../Rendering/BoardView";
import { GameEngine } from "../Core/Engine/GameEngine";
import { PieceView } from "../Rendering/PieceView";
import { PieceAnimator } from "../Rendering/PieceAnimator";
import { GameUI } from "../Rendering/GameUI";
import { PathResolver } from "../Rendering/PathReslover";
import { GamePhase, PositionType } from "../Core/State/GameState";
import { GameConfig } from "../GameConfigs/GameConfig";
import { CheatUI } from "../Rendering/CheatUI";
import { PiecePositionResolver } from "../Rendering/PiecePositionReslover";
import { Point2D } from "../GameConfigs/BoardConfig";

export class GameScene extends Container {
  private engine = new GameEngine();
  private pieceViews: PieceView[] = [];
  private animator = new PieceAnimator();
  private ui: GameUI;
  private cheatUI: CheatUI;
  private boardContainer = new Container();
  private isAnimating = false;

  constructor(app: Application) {
    super();

    this.ui = new GameUI();
    this.addChild(this.ui);

    this.cheatUI = new CheatUI();
    this.cheatUI.position.set(0, 400);
    this.addChild(this.cheatUI);

    this.boardContainer.position.set(GameConfig.UI_WIDTH, 0);
    this.addChild(this.boardContainer);

    const board = new BoardView();
    this.boardContainer.addChild(board);

    this.createPieces();
    this.updatePieceLayout(false); // <--- Initial static layout
    this.updateUI();

    window.addEventListener("keydown", (e) => {
      if (
        e.key === " " &&
        this.engine.gameState.gameState === GamePhase.WAITING_FOR_ROLL &&
        !this.isAnimating
      ) {
        this.handleRoll();
      }
    });
  }

  private handleRoll() {
    const forcedRoll = this.cheatUI.getForcedRoll();
    const roll = this.engine.rollDice(
      forcedRoll !== null ? forcedRoll : undefined,
    );

    this.updateUI();

    const turnColor = this.engine.gameState.currentTurn;
    const hasMoves = this.engine.hasValidMoves(turnColor, roll);

    if (!hasMoves) {
      setTimeout(() => {
        this.engine.skipTurn();
        this.updateUI();
      }, 800);
    }
  }

  private async handlePieceClick(pieceView: PieceView) {
    if (this.isAnimating) return;
    if (this.engine.gameState.gameState !== GamePhase.WAITING_FOR_MOVE) return;
    if (pieceView.pieceState.color !== this.engine.gameState.currentTurn)
      return;

    const startState = { ...pieceView.pieceState };
    const roll = this.engine.gameState.currentDiceRoll;

    const updatedPiece = this.engine.movePiece(startState);
    if (!updatedPiece) return;

    this.isAnimating = true;

    // Bring the moving piece to the front
    this.boardContainer.addChild(pieceView);

    const path = PathResolver.getPath(startState, updatedPiece, roll!);
    await this.animator.moveAlongPath(pieceView, path);

    // After animation, smoothly shuffle all pieces to handle new stacking or captures
    this.updatePieceLayout(true);

    this.isAnimating = false;
    this.updateUI();
  }

  private createPieces() {
    Object.values(this.engine.gameState.players).forEach((player) => {
      player.pieces.forEach((piece) => {
        const pieceView = new PieceView(piece);
        pieceView.makeInteractive(() => this.handlePieceClick(pieceView));
        this.pieceViews.push(pieceView);
        this.boardContainer.addChild(pieceView);
      });
    });
  }

  private updatePieceLayout(animate: boolean) {
    const groupedPieces: Record<string, PieceView[]> = {};

    this.pieceViews.forEach((pv) => {
      const owner = this.engine.gameState.players[pv.pieceState.color];
      const enginePiece = owner.pieces.find((p) => p.id === pv.pieceState.id);
      if (enginePiece) pv.updateState(enginePiece);

      const state = pv.pieceState;

      if (state.positionType === PositionType.YARD) {
        this.applyPosition(
          pv,
          PiecePositionResolver.resolve(state),
          1,
          animate,
        );
        return;
      }

      // Distinguish Home Path and Goal keys by color, so Blue and Yellow don't stack!
      let key = `${state.positionType}-${state.positionIndex}`;
      if (
        state.positionType === PositionType.HOME_PATH ||
        state.positionType === PositionType.GOAL
      ) {
        key = `${state.positionType}-${state.color}-${state.positionIndex}`;
      }

      if (!groupedPieces[key]) groupedPieces[key] = [];
      groupedPieces[key].push(pv);
    });

    Object.values(groupedPieces).forEach((group) => {
      const basePos = PiecePositionResolver.resolve(group[0].pieceState);
      const count = group.length;

      if (count === 1) {
        this.applyPosition(group[0], basePos, 1, animate);
      } else if (count === 2) {
        this.applyPosition(
          group[0],
          { x: basePos.x - 12, y: basePos.y },
          0.8,
          animate,
        );
        this.applyPosition(
          group[1],
          { x: basePos.x + 12, y: basePos.y },
          0.8,
          animate,
        );
      } else if (count === 3) {
        this.applyPosition(
          group[0],
          { x: basePos.x - 12, y: basePos.y + 10 },
          0.75,
          animate,
        );
        this.applyPosition(
          group[1],
          { x: basePos.x + 12, y: basePos.y + 10 },
          0.75,
          animate,
        );
        this.applyPosition(
          group[2],
          { x: basePos.x, y: basePos.y - 12 },
          0.75,
          animate,
        );
      } else {
        group.forEach((pv, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          this.applyPosition(
            pv,
            { x: basePos.x - 12 + col * 24, y: basePos.y - 12 + row * 24 },
            0.65,
            animate,
          );
        });
      }
    });
  }

  private applyPosition(
    pv: PieceView,
    pos: Point2D,
    scale: number,
    animate: boolean,
  ) {
    pv.baseScale = scale; // Save scale so hovering knows what to return to

    if (animate) {
      gsap.to(pv, {
        x: pos.x,
        y: pos.y,
        duration: 0.25,
        ease: "back.out(1.2)",
      });
      gsap.to(pv.scale, { x: scale, y: scale, duration: 0.25 });
    } else {
      pv.position.set(pos.x, pos.y);
      pv.scale.set(scale);
    }
  }
  // --------------------------

  private updateUI() {
    this.ui.update(
      this.engine.gameState.currentTurn,
      this.engine.gameState.currentDiceRoll,
      this.engine.gameState.gameState,
    );
  }
}
