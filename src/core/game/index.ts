import roomsMock from '../mocks/rooms';
import CanvasContainer from '../graphics';
import Player from '../entities/player';
import Enemy from '../entities/enemy';
import Floor from '../entities/floor';
import Wall from '../entities/wall';
import AbstractEntity from '../entities/abstract/entity';

import {
  CELL_HEIGHT,
  CELL_WIDTH,
  GAME_START_TYPE,
  GAME_ON_TYPE,
  GAME_SUCCESS_END_TYPE,
  GAME_FAILED_END_TYPE,
  RectMode,
  ENEMY_TYPE,
  FLOOR_TYPE,
  PLAYER_TYPE,
} from '../constants';
import Actor from '../entities/actor';

type Position = {
  x: number,
  y: number
};

export default class Game {
  private type = GAME_START_TYPE;

  private generatedLevel = new Map<string, AbstractEntity | Actor>();

  private canvas: CanvasContainer | null = null;

  private player: Player | null = null;

  private enemy: Enemy | null = null;

  private rooms = roomsMock;

  constructor(canvas: CanvasContainer) {
    this.canvas = canvas;
    this.player = new Player(
      this.update.bind(this),
      this.checkElement.bind(this),
    );
    this.enemy = new Enemy(
      this.update.bind(this),
      { x: 200, y: 600 },
    );
  }

  get isEnemiesDied() {
    if (this.enemy) {
      return this.enemy.health <= 0;
    }

    return true;
  }

  get isPlayerDied() {
    if (this.player) {
      return this.player.health <= 0;
    }

    return true;
  }

  getElement({ x, y }: Position) {
    return this.generatedLevel.get(`${y} - ${x}`);
  }

  cleanLevelElement(position: Position) {
    const { x, y } = position;
    const floor = new Floor(() => {}, { x, y });

    this.generatedLevel.set(`${y} - ${x}`, floor);
  }

  checkElement(entity: Actor, position: Position) {
    const nextCell = this.getElement?.(position);

    if (nextCell?.type === ENEMY_TYPE || nextCell?.type === PLAYER_TYPE) {
      entity.attack(nextCell as Actor);
    }

    return nextCell?.type === FLOOR_TYPE;
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

  update(entity?: Actor, prevPositions?: Position) {
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
      if (entity && prevPositions) {
        this.cleanLevelElement(prevPositions);

        this.generatedLevel.set(
          `${entity.position.y} - ${entity.position.x}`,
          entity,
        );
      }

      this.generatedLevel.forEach((levelEntity) => {
        this.canvas?.rect(
          levelEntity.position.x,
          levelEntity.position.y,
          levelEntity.width,
          levelEntity.height,
          levelEntity.rectMode,
          levelEntity.color,
        );
      });
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

    this.canvas.clear();
    this.generatedLevel.clear();

    for (let i = 0; i < this.canvas.height; i += CELL_HEIGHT) {
      for (let k = 0; k < this.canvas.height; k += CELL_WIDTH) {
        const wall = new Wall(() => {}, { x: k, y: i });

        this.generatedLevel.set(`${i} - ${k}`, wall);
      }
    }

    this.rooms.forEach((room) => room.generate(this.generatedLevel));

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
