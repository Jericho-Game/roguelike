import { RectMode, FLOOR_TYPE } from '../../constants';
import AbstractEntity from '../abstract/entity';

export default class Floor extends AbstractEntity {
  type = FLOOR_TYPE;

  mode = RectMode.Stroke;
}
