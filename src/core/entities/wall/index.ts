import { WALL_TYPE, WALL_COLOR } from '../../../constants';
import AbstractEntity from '../abstract';

export default class Wall extends AbstractEntity {
  type = WALL_TYPE;

  color = WALL_COLOR;
}
