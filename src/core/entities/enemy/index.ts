import {
  ENEMY_COLOR,
  ENEMY_TYPE,
} from '../../constants';
import Actor from '../actor';

export default class Enemy extends Actor {
  type = ENEMY_TYPE;

  color = ENEMY_COLOR;
}
