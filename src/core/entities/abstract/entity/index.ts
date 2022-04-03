import {
  CELL_COLOR,
  CELL_HEIGHT,
  CELL_WIDTH,
  EMPTY_TYPE,
  RectMode,
} from '../../../constants';
import Position from '../gameObject';

type Update = ((entity: AbstractEntity, prevPositions: Record<string, number>) => void);

export default abstract class AbstractEntity extends Position {
  protected update: Update | null = null;

  type = EMPTY_TYPE;

  color = CELL_COLOR;

  width = CELL_WIDTH;

  height = CELL_HEIGHT;

  rectMode = RectMode.Fill;

  constructor(
    update: Update,
    position?: { x: number, y: number },
  ) {
    super(position);

    this.update = update;
  }
}
