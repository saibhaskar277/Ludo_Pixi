import { Color } from "../../GameConfigs/BoardConfig";

export class TurnManager {
  private turnOrder: Color[] = [
    Color.RED,
    Color.GREEN,
    Color.YELLOW,
    Color.BLUE,
  ];

  public getNextTurn(current: Color): Color {
    const index = this.turnOrder.indexOf(current);

    return this.turnOrder[(index + 1) % this.turnOrder.length];
  }
}
