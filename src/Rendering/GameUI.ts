import { Container, Text, Graphics } from "pixi.js";
import { GamePhase } from "../Core/State/GameState";
import { Color } from "../GameConfigs/BoardConfig";
import { GameConfig } from "../GameConfigs/GameConfig";

export class GameUI extends Container {
  private turnText: Text;
  private diceText: Text;
  private instructionText: Text;

  constructor() {
    super();

    // Side panel background
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

    this.addChild(this.turnText, this.diceText, this.instructionText);
  }

  public update(turn: Color, roll: number | null, phase: GamePhase) {
    this.turnText.text = `Turn:\n${turn}`;

    // Dynamically change text color based on turn
    const colors: Record<Color, number> = {
      [Color.RED]: 0xff4444,
      [Color.GREEN]: 0x44ff44,
      [Color.YELLOW]: 0xffff44,
      [Color.BLUE]: 0x4444ff,
    };
    this.turnText.style.fill = colors[turn] || 0xffffff;

    this.diceText.text = roll !== null ? `Roll: ${roll}` : `Roll: -`;

    if (phase === GamePhase.WAITING_FOR_ROLL) {
      this.instructionText.text = "Press SPACE\nto roll dice";
    } else if (phase === GamePhase.WAITING_FOR_MOVE) {
      this.instructionText.text = "Click a valid\npiece to move";
    } else if (phase === GamePhase.GAME_OVER) {
      this.instructionText.text = "GAME OVER!";
    }
  }
}
