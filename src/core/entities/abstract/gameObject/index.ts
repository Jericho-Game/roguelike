import { CELL_WIDTH, CELL_HEIGHT } from '../../../constants';
import { Position } from '../../../types';

export default abstract class GameObject {
  #position: Position = {
    x: CELL_WIDTH,
    y: CELL_HEIGHT,
  };

  constructor(
    position?: { x: number, y: number },
  ) {
    if (position) {
      this.#position = position;
    }
  }

  public get position() {
    return this.#position;
  }

  public set position(position: Position) {
    this.#position = position;
  }
}
