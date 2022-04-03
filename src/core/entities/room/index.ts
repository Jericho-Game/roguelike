import { CELL_HEIGHT, CELL_WIDTH } from '../../constants';
import Floor from '../floor';
import Enemy from '../enemy';
import Player from '../player';
import Wall from '../wall';
import GameObject from '../abstract/gameObject';

export default class Room extends GameObject {
  width = 0;

  height = 0;

  constructor(position: Position, height: number, width: number) {
    super(position);

    this.height = height;
    this.width = width;
  }

  generate(level: Map<string, Player | Enemy | Wall>) {
    const { x, y } = this.position;

    for (let i = y; i < this.height + y; i += CELL_HEIGHT) {
      for (let k = x; k < this.width + x; k += CELL_WIDTH) {
        const floor = new Floor(() => {}, { x: k, y: i });

        level.set(`${i} - ${k}`, floor);
      }
    }
  }
}
