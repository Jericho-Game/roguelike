import Game from '../game';
import CanvasContainer from '../graphics';

export default class GameManager {
  private game: Game | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const canvasContainer = new CanvasContainer(canvas);

    this.game = new Game(canvasContainer);
  }

  run() {
    this.game?.generate();
  }
}
