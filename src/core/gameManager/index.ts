import Game from '../game';
import CanvasContainer from '../renderer';

export default class GameManager {
  private canvasContainer: CanvasContainer | null = null;

  private game: Game | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvasContainer = new CanvasContainer(canvas);

    this.game = new Game(this.canvasContainer);
  }

  run() {
    this.game?.generate();
  }

  restart() {
    this.game = new Game(this.canvasContainer as CanvasContainer);

    this.game?.generate();
  }

  destroy() {
    this.game?.cleanLevel();
    this.game = null;
  }
}
