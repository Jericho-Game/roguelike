import roomsMock from '../../mocks/rooms';
import CanvasContainer from '../../graphics';
import Player from '../player';
import Enemy from '../enemy';
import Floor from '../floor';
import Wall from '../wall';
import Room from '../room';
import AbstractEntity from '../abstract';

import {
  CELL_HEIGHT,
  CELL_WIDTH,
  ENEMY_TYPE,
  PLAYER_TYPE,
  GAME_START_TYPE,
  GAME_ON_TYPE,
  GAME_SUCCESS_END_TYPE,
  GAME_FAILED_END_TYPE,
  RectMode,
} from '../../constants';

export default class Grid {
  type = GAME_START_TYPE;

  level = 1;

  rooms = roomsMock;

  generatedLevel: Map<string, AbstractEntity> = new Map();

  canvas: CanvasContainer | null = null;

  player: Player | null = null;

  enemy: Enemy | null = null;

  constructor(canvas: CanvasContainer) {
    this.canvas = canvas;
    this.player = new Player(
      canvas,
      this.update.bind(this),
      this.getLevelElement.bind(this),
      this.cleanLevelElement.bind(this),
    );
    this.enemy = new Enemy(
      canvas,
      this.update.bind(this),
      this.cleanLevelElement.bind(this),
    );
  }

  get isEnemiesDied() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, entity] of this.generatedLevel) {
      if (entity.type === ENEMY_TYPE) {
        return false;
      }
    }

    return true;
  }

  get isPlayerDied() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [, entity] of this.generatedLevel) {
      if (entity.type === PLAYER_TYPE) {
        return false;
      }
    }

    return true;
  }

  getLevelElement(x: number, y: number) {
    return this.generatedLevel.get(`${y} - ${x}`);
  }

  cleanLevelElement(position: Record<string, number>) {
    if (!this.canvas) {
      return;
    }

    const { x, y } = position;
    const floor = new Floor(this.canvas, () => {}, () => {}, { x, y });

    this.generatedLevel.set(`${y} - ${x}`, floor);

    this.update();
  }

  generateRooms(context: CanvasContainer) {
    if (context) {
      this.rooms.forEach((room: Room) => {
        room.draw(context, this.generatedLevel);
      });
    }
  }

  generateStartScreen() {
    const eventName = 'mouseup';
    const buttonText = 'Start';
    const [buttonX, buttonY] = [300, 300];
    const [buttonWidth, buttonHeight] = [200, 100];
    const buttonColor = 'black';

    const handler = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;

      if (
        offsetX >= buttonX
        && offsetX <= (buttonX + buttonWidth)
        && offsetY >= buttonY
        && offsetY <= (buttonY + buttonHeight)
      ) {
        this.type = GAME_ON_TYPE;

        this.update();
        this.canvas?.canvasElement?.removeEventListener(eventName, handler);
      }
    };

    this.canvas?.canvasElement?.addEventListener(eventName, handler);
    this.canvas?.drawButton(
      buttonText,
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      RectMode.Fill,
      buttonColor,
    );
  }

  generateSuccessScreen() {
    const buttonText = 'You are win! =)';
    const [buttonX, buttonY] = [0, 0];
    const [buttonWidth, buttonHeight] = [800, 800];
    const buttonColor = 'green';

    this.canvas?.drawButton(
      buttonText,
      buttonX,
      buttonY,
      buttonWidth,
      buttonHeight,
      RectMode.Fill,
      buttonColor,
    );
  }

  generateFailedScreen() {
    this.canvas?.rect(
      300,
      300,
      100,
      100,
      RectMode.Fill,
      'red',
    );
  }

  update() {
    if (!this.canvas || !this.player || !this.enemy) {
      return;
    }

    if (this.isEnemiesDied) {
      this.type = GAME_SUCCESS_END_TYPE;
    } else if (this.isPlayerDied) {
      this.type = GAME_FAILED_END_TYPE;
    }

    this.canvas.clear();

    if (this.type === GAME_ON_TYPE) {
      this.generatedLevel.forEach((cell) => cell.draw());
    } else if (this.type === GAME_START_TYPE) {
      this.generateStartScreen();
    } else if (this.type === GAME_SUCCESS_END_TYPE) {
      this.generateSuccessScreen();
    } else if (this.type === GAME_FAILED_END_TYPE) {
      this.generateFailedScreen();
    }
  }

  generate() {
    if (!this.canvas || !this.player || !this.enemy) {
      return;
    }

    if (this.level < 5) {
      this.level += 1;
    }

    this.canvas.clear();
    this.generatedLevel.clear();

    for (let i = 0; i < this.canvas.height; i += CELL_HEIGHT) {
      for (let k = 0; k < this.canvas.height; k += CELL_WIDTH) {
        const wall = new Wall(this.canvas, () => {}, () => {}, { x: k, y: i });

        this.generatedLevel.set(`${i} - ${k}`, wall);
      }
    }

    this.generateRooms(this.canvas);

    this.generatedLevel.set(
      `${this.player.position.y} - ${this.player.position.x}`,
      this.player,
    );

    this.generatedLevel.set(
      `${this.enemy.position.y} - ${this.enemy.position.x}`,
      this.enemy,
    );

    this.update();
  }
}
