import {
  CELL_HEIGHT, CELL_WIDTH, RectMode,
} from '../../../constants';
import CanvasContainer from '../../graphics';

export default abstract class AbstractEntity {
  type = 'Empty';

  color = '';

  health = 100;

  damage = 100;

  canvas: CanvasContainer | null = null;

  regenerateGrid: (() => void) | null = null;

  destroyCell: ((position: Record<string, number>) => void) | null = null;

  position: Record<string, number> = {
    x: 0,
    y: 0,
  };

  constructor(
    canvas: CanvasContainer,
    regenerateGrid: () => void,
    destroyCell?: (position: Record<string, number>) => void,
    positions?: { x: number, y: number },
  ) {
    this.canvas = canvas;
    this.regenerateGrid = regenerateGrid;

    if (destroyCell) {
      this.destroyCell = destroyCell;
    }

    if (positions) {
      this.setPosition(positions.x, positions.y);
    } else {
      this.setPosition(CELL_WIDTH, CELL_HEIGHT);
    }
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  draw() {
    this.canvas?.rect(
      this.position.x,
      this.position.y,
      CELL_WIDTH,
      CELL_HEIGHT,
      RectMode.Fill,
      this.color,
    );
  }

  destroy() {
    this.destroyCell?.(this.position);
  }

  attack(entity: AbstractEntity) {
    entity.defence(this);
  }

  defence(entity: AbstractEntity) {
    if (this.health <= 0) {
      this.destroy();
    } else {
      this.health -= entity.damage;
    }
  }
}
