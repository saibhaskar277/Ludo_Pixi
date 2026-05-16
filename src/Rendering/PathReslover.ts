import { PieceState, PositionType } from "../Core/State/GameState";
import { LudoRules } from "../GameConfigs/LudoRules";
import { PiecePositionResolver } from "./PiecePositionReslover";
import { Point2D } from "../GameConfigs/BoardConfig";

export class PathResolver {
  public static getPath(
    startState: PieceState,
    endState: PieceState,
    roll: number,
  ): Point2D[] {
    const path: Point2D[] = [];

    // Moving out of Yard is just one jump to the starting tile
    if (
      startState.positionType === PositionType.YARD &&
      endState.positionType === PositionType.TRACK
    ) {
      path.push(PiecePositionResolver.resolve(endState));
      return path;
    }

    // Moving along the track or home path (calculate step-by-step)
    let currentType = startState.positionType;
    let currentIndex = startState.positionIndex;

    for (let i = 0; i < roll; i++) {
      if (currentType === PositionType.TRACK) {
        const homeEntry = LudoRules.HOME_ENTRY_INDEX[startState.color];
        if (currentIndex === homeEntry) {
          currentType = PositionType.HOME_PATH;
          currentIndex = 0;
        } else {
          currentIndex = (currentIndex + 1) % LudoRules.TRACK_LENGTH;
        }
      } else if (currentType === PositionType.HOME_PATH) {
        currentIndex++;
        if (currentIndex === LudoRules.HOME_PATH_LENGTH) {
          currentType = PositionType.GOAL;
        }
      }

      path.push(
        PiecePositionResolver.resolve({
          ...startState,
          positionType: currentType,
          positionIndex: currentIndex,
        }),
      );
    }

    return path;
  }
}
