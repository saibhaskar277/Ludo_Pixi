export enum Color {
  RED = "RED",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  BLUE = "BLUE",
}

export interface Point2D {
  x: number;
  y: number;
}

export interface BoardLayoutConfiguration {
  // Maps a common track index (0-51) to screen coordinates
  commonTrackCoordinates: Point2D[];
  // Maps home track indexes (0-4) per color to screen coordinates
  homeTrackCoordinates: Record<Color, Point2D[]>;
  // Maps the 4 pocket coordinates for pieces inside their home yard
  yardCoordinates: Record<Color, Point2D[]>;
}
