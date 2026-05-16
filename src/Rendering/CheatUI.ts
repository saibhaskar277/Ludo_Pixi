import { Container, Graphics, Text } from "pixi.js";

export class CheatUI extends Container {
  private isEnabled = false;
  private selectedValue = 6; // Default cheat roll

  private toggleBg: Graphics;
  private toggleText: Text;
  private numberButtons: { bg: Graphics; value: number }[] = [];

  constructor() {
    super();

    // 1. Cheat Mode Label
    const title = new Text({
      text: "Developer Cheat",
      style: { fill: 0xffaa00, fontSize: 18, fontWeight: "bold" },
    });
    title.position.set(20, 0);
    this.addChild(title);

    // 2. Toggle Button (ON / OFF)
    this.toggleBg = new Graphics();
    this.toggleBg.rect(0, 0, 80, 30);
    this.toggleBg.position.set(20, 30);
    this.toggleBg.eventMode = "static";
    this.toggleBg.cursor = "pointer";
    this.toggleBg.on("pointerdown", () => this.toggleCheat());

    this.toggleText = new Text({
      text: "OFF",
      style: { fill: 0xffffff, fontSize: 14, fontWeight: "bold" },
    });
    this.toggleText.position.set(45, 36); // Center text in button

    this.addChild(this.toggleBg, this.toggleText);

    // 3. Number Selector Buttons (1 to 6)
    for (let i = 1; i <= 6; i++) {
      const btn = new Graphics();
      const col = (i - 1) % 3;
      const row = Math.floor((i - 1) / 3);

      btn.rect(0, 0, 40, 40);
      btn.position.set(20 + col * 50, 80 + row * 50);
      btn.eventMode = "static";
      btn.cursor = "pointer";
      btn.on("pointerdown", () => this.selectNumber(i));

      const numText = new Text({
        text: i.toString(),
        style: { fill: 0xffffff, fontSize: 16 },
      });
      numText.position.set(btn.x + 15, btn.y + 10);

      this.addChild(btn, numText);
      this.numberButtons.push({ bg: btn, value: i });
    }

    this.renderState();
  }

  private toggleCheat() {
    this.isEnabled = !this.isEnabled;
    this.renderState();
  }

  private selectNumber(num: number) {
    if (!this.isEnabled) return; // Only allow selection if cheat is ON
    this.selectedValue = num;
    this.renderState();
  }

  private renderState() {
    // Render Toggle Button
    this.toggleBg.clear();
    this.toggleBg.rect(0, 0, 80, 30);
    this.toggleBg.fill(this.isEnabled ? 0x00aa00 : 0xaa0000); // Green if ON, Red if OFF
    this.toggleText.text = this.isEnabled ? "ON" : "OFF";

    // Render Number Buttons
    this.numberButtons.forEach((btn) => {
      btn.bg.clear();
      btn.bg.rect(0, 0, 40, 40);

      if (!this.isEnabled) {
        btn.bg.fill(0x333333); // Disabled color
      } else if (btn.value === this.selectedValue) {
        btn.bg.fill(0x0088ff); // Selected color (Blue)
      } else {
        btn.bg.fill(0x555555); // Unselected color
      }

      btn.bg.stroke({ color: 0xffffff, width: 2 });
    });
  }

  // API for the GameScene to call
  public getForcedRoll(): number | null {
    return this.isEnabled ? this.selectedValue : null;
  }
}
