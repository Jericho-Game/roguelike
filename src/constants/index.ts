const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const BACKGROUND_COLOR = 'black';

const CELL_HEIGHT = 20;
const CELL_WIDTH = 20;
const CELL_COLOR = 'black';

const PLAYER_WIDTH = CELL_WIDTH;
const PLAYER_HEIGHT = CELL_HEIGHT;
const PLAYER_COLOR = 'black';

const ENEMY_WIDTH = CELL_WIDTH;
const ENEMY_HEIGHT = CELL_HEIGHT;
const ENEMY_COLOR = 'red';

const EMPTY_TYPE = 'EMPTY';
const PLAYER_TYPE = 'PLAYER';
const ENEMY_TYPE = 'ENEMY';
const FLOOR_TYPE = 'FLOOR';
const WALL_TYPE = 'WALL';

const WALL_COLOR = 'grey';

const GAME_START_TYPE = 'START_GAME_TYPE';
const GAME_ON_TYPE = 'GAME_ON_TYPE';
const GAME_SUCCESS_END_TYPE = 'GAME_SUCCESS_END_TYPE';
const GAME_FAILED_END_TYPE = 'GAME_FAILED_END_TYPE';

// Enum для способов рисования
const enum RectMode {
  Fill,
  Stroke,
}

export {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BACKGROUND_COLOR,
  CELL_HEIGHT,
  CELL_WIDTH,
  CELL_COLOR,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_COLOR,
  ENEMY_WIDTH,
  ENEMY_HEIGHT,
  ENEMY_COLOR,
  EMPTY_TYPE,
  PLAYER_TYPE,
  ENEMY_TYPE,
  FLOOR_TYPE,
  WALL_TYPE,
  WALL_COLOR,
  GAME_START_TYPE,
  GAME_ON_TYPE,
  GAME_SUCCESS_END_TYPE,
  GAME_FAILED_END_TYPE,
  RectMode,
};
