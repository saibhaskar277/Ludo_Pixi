import { Container, Text, Graphics } from "pixi.js";
import { GamePhase } from "../Core/State/GameState";
import { Color } from "../GameConfigs/BoardConfig";
import { GameConfig } from "../GameConfigs/GameConfig";

export class GameUI extends Container {
  private turnText: Text;
  private diceText: Text;
  private instructionText: Text;

  // NEW: Button properties
  private rollButton: Container;
  private rollButtonBg: Graphics;
  public onRollClick: (() => void) | null = null; // Callback for GameScene

  constructor() {
    super();

    const bg = new Graphics();
    bg.rect(0, 0, GameConfig.UI_WIDTH, GameConfig.GAME_HEIGHT);
    bg.fill({ color: 0x111111 });
    this.addChild(bg);

    this.turnText = new Text({
      text: "Turn: RED",
      style: { fill: 0xffffff, fontSize: 32, fontWeight: "bold" },
    });
    this.turnText.position.set(20, 40);

    this.diceText = new Text({
      text: "Roll: -",
      style: { fill: 0xffffff, fontSize: 48, fontWeight: "bold" },
    });
    this.diceText.position.set(20, 120);

    this.instructionText = new Text({
      text: "Press SPACE\nto roll",
      style: {
        fill: 0xaaaaaa,
        fontSize: 20,
        wordWrap: true,
        wordWrapWidth: 200,
      },
    });
    this.instructionText.position.set(20, 200);

    // --- SETUP THE DICE BUTTON ---
    this.rollButton = new Container();
    this.rollButton.position.set(20, 280);

    this.rollButtonBg = new Graphics();
    this.rollButtonBg.roundRect(0, 0, 180, 50, 15);
    this.rollButtonBg.fill(0x00aa00);

    const btnText = new Text({
      text: "ROLL DICE",
      style: { fill: 0xffffff, fontSize: 24, fontWeight: "bold" },
    });
    btnText.position.set(28, 10); // Center text in button

    this.rollButton.addChild(this.rollButtonBg, btnText);

    // Add interactivity
    this.rollButton.eventMode = "static";
    this.rollButton.cursor = "pointer";
    this.rollButton.on("pointerdown", () => {
      if (this.onRollClick) this.onRollClick();
    });
    // ----------------------------

    this.addChild(
      this.turnText,
      this.diceText,
      this.instructionText,
      this.rollButton,
    );
  }

  public update(turn: Color, roll: number | null, phase: GamePhase) {
    this.turnText.text = `Turn:\n${turn}`;

    const colors: Record<Color, number> = {
      [Color.RED]: 0xff4444,
      [Color.GREEN]: 0x44ff44,
      [Color.YELLOW]: 0xffff44,
      [Color.BLUE]: 0x4444ff,
    };
    this.turnText.style.fill = colors[turn] || 0xffffff;

    this.diceText.text = roll !== null ? `Roll: ${roll}` : `Roll: -`;

    // Update instruction text AND Button State
    if (phase === GamePhase.WAITING_FOR_ROLL) {
      this.instructionText.text = "Click button\nor press SPACE";
      this.rollButton.alpha = 1; // Fully visible
      this.rollButton.eventMode = "static"; // Clickable
    } else if (phase === GamePhase.WAITING_FOR_MOVE) {
      this.instructionText.text = "Click a valid\npiece to move";
      this.rollButton.alpha = 0.3; // Faded out
      this.rollButton.eventMode = "none"; // Disabled
    } else if (phase === GamePhase.GAME_OVER) {
      this.instructionText.text = "GAME OVER!";
      this.rollButton.alpha = 0.3;
      this.rollButton.eventMode = "none";
    }
  }
}
