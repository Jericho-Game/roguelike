import CanvasContainer from '../../graphics';
import {
  ENEMY_COLOR,
  ENEMY_HEIGHT,
  ENEMY_TYPE,
  ENEMY_WIDTH,
} from '../../constants';
import AbstractEntity from '../abstract';

export default class Enemy extends AbstractEntity {
  type = ENEMY_TYPE;

  color = ENEMY_COLOR;

  width = ENEMY_WIDTH;

  height = ENEMY_HEIGHT;

  constructor(
    canvas: CanvasContainer,
    regenerateGrid: () => void,
    cleanLevelElement: (position: Record<string, number>) => void,
  ) {
    super(
      canvas,
      regenerateGrid,
      cleanLevelElement,
    );

    this.setPosition(200, 600);
  }
}
