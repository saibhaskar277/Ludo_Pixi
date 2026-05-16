import { BoardLayoutConfiguration, Color } from "../GameConfigs/BoardConfig";
import { GameConfig } from "../GameConfigs/GameConfig";

// 1. DYNAMIC MATH CALCULATION
const TILE_SIZE = GameConfig.BOARD_SIZE / 15;
const CENTER_OFFSET = TILE_SIZE / 2;

// Used for track and home paths (centers the piece inside the tile)
function cell(col: number, row: number) {
  return {
    x: col * TILE_SIZE + CENTER_OFFSET,
    y: row * TILE_SIZE + CENTER_OFFSET,
  };
}

// Used for Yard pieces (your white circles rest exactly on grid intersections)
function yard(colRatio: number, rowRatio: number) {
  return {
    x: colRatio * TILE_SIZE,
    y: rowRatio * TILE_SIZE,
  };
}

export const BoardLayout: BoardLayoutConfiguration = {
  commonTrackCoordinates: [
    cell(6, 13),
    cell(6, 12),
    cell(6, 11),
    cell(6, 10),
    cell(6, 9),
    cell(5, 8),
    cell(4, 8),
    cell(3, 8),
    cell(2, 8),
    cell(1, 8),
    cell(0, 8),
    cell(0, 7),
    cell(0, 6),
    cell(1, 6),
    cell(2, 6),
    cell(3, 6),
    cell(4, 6),
    cell(5, 6),
    cell(6, 5),
    cell(6, 4),
    cell(6, 3),
    cell(6, 2),
    cell(6, 1),
    cell(6, 0),
    cell(7, 0),
    cell(8, 0),
    cell(8, 1),
    cell(8, 2),
    cell(8, 3),
    cell(8, 4),
    cell(8, 5),
    cell(9, 6),
    cell(10, 6),
    cell(11, 6),
    cell(12, 6),
    cell(13, 6),
    cell(14, 6),
    cell(14, 7),
    cell(14, 8),
    cell(13, 8),
    cell(12, 8),
    cell(11, 8),
    cell(10, 8),
    cell(9, 8),
    cell(8, 9),
    cell(8, 10),
    cell(8, 11),
    cell(8, 12),
    cell(8, 13),
    cell(8, 14),
    cell(7, 14),
    cell(6, 14),
  ],

  homeTrackCoordinates: {
    [Color.RED]: [
      cell(7, 13),
      cell(7, 12),
      cell(7, 11),
      cell(7, 10),
      cell(7, 9),
    ],
    [Color.GREEN]: [cell(1, 7), cell(2, 7), cell(3, 7), cell(4, 7), cell(5, 7)],
    [Color.YELLOW]: [
      cell(7, 1),
      cell(7, 2),
      cell(7, 3),
      cell(7, 4),
      cell(7, 5),
    ],
    [Color.BLUE]: [
      cell(13, 7),
      cell(12, 7),
      cell(11, 7),
      cell(10, 7),
      cell(9, 7),
    ],
  },

  // Completely dynamic yard coordinates!
  // Multipliers 2, 4, 11, and 13 define the 4 corners proportionally.
  yardCoordinates: {
    [Color.GREEN]: [yard(2, 2), yard(4, 2), yard(2, 4), yard(4, 4)],
    [Color.YELLOW]: [yard(11, 2), yard(13, 2), yard(11, 4), yard(13, 4)],
    [Color.RED]: [yard(2, 11), yard(4, 11), yard(2, 13), yard(4, 13)],
    [Color.BLUE]: [yard(11, 11), yard(13, 11), yard(11, 13), yard(13, 13)],
  },
};
