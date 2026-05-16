import { Color } from "./BoardConfig";

export class LudoRules {
  public static readonly TRACK_LENGTH = 52;

  public static readonly HOME_PATH_LENGTH = 5;

  public static readonly START_INDEX: Record<Color, number> = {
    [Color.RED]: 0,
    [Color.GREEN]: 13,
    [Color.YELLOW]: 26,
    [Color.BLUE]: 39,
  };

  public static readonly HOME_ENTRY_INDEX: Record<Color, number> = {
    [Color.RED]: 50,
    [Color.GREEN]: 11,
    [Color.YELLOW]: 24,
    [Color.BLUE]: 37,
  };

  public static readonly SAFE_TILES = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
}
