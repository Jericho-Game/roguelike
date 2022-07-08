import roomsMock from '../mocks/rooms';
import CanvasContainer from '../renderer';
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
  Drawing,
} from '../constants';
import Actor from '../entities/actor';
import { Position } from '../types';

export default class Game {
  private type = GAME_START_TYPE;

  private generatedLevel = new Map<string, AbstractEntity | Actor>();

  private canvas: CanvasContainer;

  private player: Player;

  private enemy: Enemy;

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
    return (this.enemy as Enemy).health <= 0;
  }

  get isPlayerDied() {
    return (this.player as Player).health <= 0;
  }

  getElement({ x, y }: Position) {
    return this.generatedLevel.get(`${y} - ${x}`);
  }

  cleanLevel() {
    this.player?.destroy();
    this.generatedLevel = new Map();
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
    const text = 'Start';
    const canvasElement = this.canvas.element as HTMLCanvasElement;
    const [width, height] = [200, 100];
    const [x, y] = [
      canvasElement.width / 2 - width / 2,
      canvasElement.height / 2 - height / 2,
    ];
    const color = '#5e48e8';
    const textColor = 'white';

    const handler = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      const [newX, newY] = [
        canvasElement.offsetWidth / 2 - width / 2,
        canvasElement.offsetHeight / 2 - height / 2,
      ];

      if (
        offsetX >= newX
        && offsetX <= (newX + width)
        && offsetY >= newY
        && offsetY <= (newY + height)
      ) {
        this.type = GAME_ON_TYPE;

        this.update();
        this.canvas.element.removeEventListener(eventName, handler);
      }
    };

    this.canvas.element.addEventListener(eventName, handler);
    this.canvas?.update({
      x,
      y,
      width,
      height,
      text,
      textColor,
      color,
      mode: RectMode.Fill,
      type: Drawing.Button,
    });
  }

  generateSuccessScreen() {
    const text = 'You are win! =)';
    const [x, y] = [0, 0];
    const [width, height] = [800, 800];
    const color = 'green';

    this.cleanLevel();

    this.canvas?.update({
      x,
      y,
      text,
      width,
      height,
      mode: RectMode.Fill,
      color,
      type: Drawing.Button,
    });
  }

  generateFailedScreen() {
    this.cleanLevel();

    this.canvas?.update({
      x: 300,
      y: 300,
      width: 100,
      height: 100,
      color: 'red',
      mode: RectMode.Fill,
      type: Drawing.Button,
    });
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

    this.canvas.update({
      type: Drawing.Clear,
    });

    if (this.type === GAME_ON_TYPE) {
      if (entity && prevPositions) {
        this.cleanLevelElement(prevPositions);

        this.generatedLevel.set(
          `${entity.position.y} - ${entity.position.x}`,
          entity,
        );
      }

      this.generatedLevel.forEach((levelEntity) => {
        this.canvas?.update({
          x: levelEntity.position.x,
          y: levelEntity.position.y,
          width: levelEntity.width,
          height: levelEntity.height,
          mode: levelEntity.rectMode,
          color: levelEntity.color,
          type: Drawing.Cell,
        });
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
