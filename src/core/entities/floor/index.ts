import {
  RectMode, FLOOR_TYPE, CELL_WIDTH, CELL_HEIGHT,
} from '../../../constants';
import AbstractEntity from '../abstract';

export default class Floor extends AbstractEntity {
  type = FLOOR_TYPE;

  draw() {
    this.canvas?.rect(
      this.position.x,
      this.position.y,
      CELL_WIDTH,
      CELL_HEIGHT,
      RectMode.Stroke,
      this.color,
    );
  }
}
