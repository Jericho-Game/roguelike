import {
  PLAYER_TYPE,
  PLAYER_COLOR,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
} from '../../constants';
import AbstractEntity from '../abstract/entity';
import Actor from '../actor';

type Controls = {
  [key: string]: ({ x, y }: Position) => ({ x: number, y: number });
};

type RegenerateFunc = ((entity: AbstractEntity, prevPositions: Record<string, number>) => void);
export default class Player extends Actor {
  type = PLAYER_TYPE;

  color = PLAYER_COLOR;

  width = PLAYER_WIDTH;

  height = PLAYER_HEIGHT;

  controls: Controls = {
    KeyW: ({ x, y }: Position) => ({ x, y: y - this.height }),
    KeyS: ({ x, y }: Position) => ({ x, y: y + this.height }),
    KeyD: ({ x, y }: Position) => ({ x: x + this.width, y }),
    KeyA: ({ x, y }: Position) => ({ x: x - this.width, y }),
  };

  checkElement: ((entity: AbstractEntity, position: Position) => boolean) | null = null;

  constructor(
    update: RegenerateFunc,
    checkElement: (entity: AbstractEntity, position: Position) => boolean,
  ) {
    super(update);

    this.checkElement = checkElement;

    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => this.move(e));
  }

  move(event: KeyboardEvent) {
    const keyCode = event.code;
    const prevPosition = { ...this.position };

    const getNextPosition = this.controls[keyCode];
    const position = getNextPosition(this.position);
    const isValidPosition = this.checkElement?.(this, position);

    if (isValidPosition) {
      this.position = position;

      this.update?.(this, prevPosition);
    }
  }
}
