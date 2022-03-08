import { CELL_HEIGHT, CELL_WIDTH } from '../../../constants';
import Room from '../../entities/room';

export default [
  new Room(CELL_WIDTH, CELL_HEIGHT, CELL_HEIGHT * 16, CELL_WIDTH * 16),
  new Room(CELL_WIDTH * 17, CELL_HEIGHT * 7, CELL_HEIGHT * 2, CELL_WIDTH * 7),
  new Room(CELL_WIDTH * 24, CELL_HEIGHT, CELL_HEIGHT * 38, CELL_WIDTH * 15),
  new Room(CELL_WIDTH * 15, CELL_HEIGHT * 30, CELL_HEIGHT, CELL_WIDTH * 9),
  new Room(CELL_WIDTH, CELL_HEIGHT * 24, CELL_HEIGHT * 15, CELL_WIDTH * 14),
];
