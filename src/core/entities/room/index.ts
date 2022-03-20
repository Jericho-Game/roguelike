import { CELL_HEIGHT, CELL_WIDTH } from '../../constants';
import CanvasContainer from '../../graphics';
import Floor from '../floor';
import Enemy from '../enemy';
import Player from '../player';
import Wall from '../wall';

export default class Room {
  width = 0;

  height = 0;

  position = {
    x: 0,
    y: 0,
  };

  constructor(x: number, y: number, height: number, width: number) {
    this.position.x = x;
    this.position.y = y;
    this.height = height;
    this.width = width;
  }

  draw(context: CanvasContainer, level: Map<string, Player | Enemy | Wall>) {
    const { x, y } = this.position;

    for (let i = y; i < this.height + y; i += CELL_HEIGHT) {
      for (let k = x; k < this.width + x; k += CELL_WIDTH) {
        const floor = new Floor(context, () => {}, () => {}, { x: k, y: i });

        level.set(`${i} - ${k}`, floor);
      }
    }
  }
}
