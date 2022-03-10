import CanvasContainer from '../../graphics';
import {
  FLOOR_TYPE,
  PLAYER_TYPE,
  PLAYER_COLOR,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ENEMY_TYPE,
} from '../../../constants';
import AbstractEntity from '../abstract';

type Controls = {
  [key: string]: ({ x, y }: Position) => ({ x: number, y: number });
};

export default class Player extends AbstractEntity {
  type = PLAYER_TYPE;

  color = PLAYER_COLOR;

  width = PLAYER_WIDTH;

  height = PLAYER_HEIGHT;

  position = {
    x: 0,
    y: 0,
  };

  getLevelElement: ((x: number, y: number) => AbstractEntity) | null = null;

  controls: Controls = {
    KeyW: ({ x, y }: Position) => ({ x, y: y - this.height }),
    KeyS: ({ x, y }: Position) => ({ x, y: y + this.height }),
    KeyD: ({ x, y }: Position) => ({ x: x + this.width, y }),
    KeyA: ({ x, y }: Position) => ({ x: x - this.width, y }),
  };

  constructor(
    canvas: CanvasContainer,
    regenerateGrid: () => void,
    getLevelElement: (x: number, y: number) => AbstractEntity,
    cleanLevelElement: (position: Record<string, number>) => void,
  ) {
    super(canvas, regenerateGrid, cleanLevelElement);

    this.getLevelElement = getLevelElement;

    this.init();

    this.setPosition(20, 20);
  }

  init() {
    window.addEventListener('keydown', (e) => this.move(e));
  }

  checkPosition(x: number, y: number) {
    const nextCell = this.getLevelElement?.(x, y);

    if (nextCell?.type === ENEMY_TYPE) {
      this.attack(nextCell as AbstractEntity);
    }

    return nextCell?.type === FLOOR_TYPE;
  }

  move(event: KeyboardEvent) {
    try {
      const keyCode = event.code;

      const getNextPosition = this.controls[keyCode];
      const { x, y } = getNextPosition(this.position);
      const isNextPositionValid = this.checkPosition(x, y);

      if (isNextPositionValid) {
        this.setPosition(x, y);
        this.regenerateGrid?.();
      }
    } catch (error) {
      // console.error(error);
    }
  }
}
