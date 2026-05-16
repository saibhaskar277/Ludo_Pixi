import { BoardLayoutConfiguration, Color } from "../GameConfigs/BoardConfig";

const TILE_SIZE = 48;
// Offset by exactly half a tile so the circles center perfectly in the grid cells
const OFFSET_X = 24;
const OFFSET_Y = 24;

function cell(col: number, row: number) {
  return {
    x: OFFSET_X + col * TILE_SIZE,
    y: OFFSET_Y + row * TILE_SIZE,
  };
}

export const BoardLayout: BoardLayoutConfiguration = {
  // Ordered explicitly starting from Red's Start Tile (6, 13) and moving clockwise.
  commonTrackCoordinates: [
    cell(6, 13), // 0: Red Start
    cell(6, 12),
    cell(6, 11),
    cell(6, 10),
    cell(6, 9),
    cell(5, 8), // 5
    cell(4, 8),
    cell(3, 8),
    cell(2, 8),
    cell(1, 8),
    cell(0, 8), // 10
    cell(0, 7), // 11: Green Home Entry Tile
    cell(0, 6),
    cell(1, 6), // 13: Green Start
    cell(2, 6),
    cell(3, 6), // 15
    cell(4, 6),
    cell(5, 6),
    cell(6, 5),
    cell(6, 4),
    cell(6, 3), // 20
    cell(6, 2),
    cell(6, 1),
    cell(6, 0),
    cell(7, 0), // 24: Yellow Home Entry Tile
    cell(8, 0), // 25
    cell(8, 1), // 26: Yellow Start
    cell(8, 2),
    cell(8, 3),
    cell(8, 4),
    cell(8, 5), // 30
    cell(9, 6),
    cell(10, 6),
    cell(11, 6),
    cell(12, 6),
    cell(13, 6), // 35
    cell(14, 6),
    cell(14, 7), // 37: Blue Home Entry Tile
    cell(14, 8),
    cell(13, 8), // 39: Blue Start
    cell(12, 8), // 40
    cell(11, 8),
    cell(10, 8),
    cell(9, 8),
    cell(8, 9),
    cell(8, 10), // 45
    cell(8, 11),
    cell(8, 12),
    cell(8, 13),
    cell(8, 14),
    cell(7, 14), // 50: Red Home Entry Tile
    cell(6, 14), // 51
  ],

  // Maps the colored paths leading to the center goal
  homeTrackCoordinates: {
    [Color.RED]: [
      cell(7, 13),
      cell(7, 12),
      cell(7, 11),
      cell(7, 10),
      cell(7, 9),
    ], // Bottom flowing Up
    [Color.GREEN]: [cell(1, 7), cell(2, 7), cell(3, 7), cell(4, 7), cell(5, 7)], // Left flowing Right
    [Color.YELLOW]: [
      cell(7, 1),
      cell(7, 2),
      cell(7, 3),
      cell(7, 4),
      cell(7, 5),
    ], // Top flowing Down
    [Color.BLUE]: [
      cell(13, 7),
      cell(12, 7),
      cell(11, 7),
      cell(10, 7),
      cell(9, 7),
    ], // Right flowing Left
  },

  // Maps directly to the white circles inside the colored bases
  yardCoordinates: {
    // Top-Left corner (Center is 144, 144)
    [Color.GREEN]: [
      { x: 96, y: 96 },
      { x: 192, y: 96 },
      { x: 96, y: 192 },
      { x: 192, y: 192 },
    ],

    // Top-Right corner (Center is 576, 144)
    [Color.YELLOW]: [
      { x: 528, y: 96 },
      { x: 624, y: 96 },
      { x: 528, y: 192 },
      { x: 624, y: 192 },
    ],

    // Bottom-Left corner (Center is 144, 576)
    [Color.RED]: [
      { x: 96, y: 528 },
      { x: 192, y: 528 },
      { x: 96, y: 624 },
      { x: 192, y: 624 },
    ],

    // Bottom-Right corner (Center is 576, 576)
    [Color.BLUE]: [
      { x: 528, y: 528 },
      { x: 624, y: 528 },
      { x: 528, y: 624 },
      { x: 624, y: 624 },
    ],
  },
};
