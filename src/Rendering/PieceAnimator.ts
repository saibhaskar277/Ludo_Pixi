import gsap from "gsap";
import { PieceView } from "./PieceView";
import { Point2D } from "../GameConfigs/BoardConfig";

export class PieceAnimator {
  public async moveAlongPath(pieceView: PieceView, path: Point2D[]) {
    // Bring to front while animating
    const parent = pieceView.parent;
    if (parent) {
      parent.addChild(pieceView);
    }

    for (const point of path) {
      await this.moveTo(pieceView, point.x, point.y);
    }
  }

  private moveTo(pieceView: PieceView, x: number, y: number) {
    return new Promise<void>((resolve) => {
      gsap.to(pieceView, {
        x,
        y,
        duration: 0.15, // Speed of one tile step
        ease: "power1.inOut",
        onComplete: () => resolve(),
      });
    });
  }
}
