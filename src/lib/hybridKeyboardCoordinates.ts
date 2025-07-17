import { KeyboardCoordinateGetter, KeyboardCode } from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/utilities";

export const hybridKeyboardCoordinates: KeyboardCoordinateGetter = (
  event,
  { currentCoordinates },
): Coordinates | undefined => {
  const delta = 50;

  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + delta,
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - delta,
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + delta,
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - delta,
      };
    default:
      return currentCoordinates;
  }
};
