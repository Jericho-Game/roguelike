import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RectMode,
} from '../../constants';

// Класс для упрощенной работы с canvas
export default class CanvasContainer {
  width = CANVAS_WIDTH;

  height = CANVAS_HEIGHT;

  canvasContext: CanvasRenderingContext2D | null = null;

  canvasElement: HTMLCanvasElement | null = null;

  constructor(canvasElement: HTMLCanvasElement) {
    const canvasContext = canvasElement.getContext('2d');

    this.canvasContext = canvasContext;
    this.canvasElement = canvasElement;

    this.canvasElement.width = CANVAS_WIDTH;
    this.canvasElement.height = CANVAS_HEIGHT;
  }

  rect(x: number, y: number, w: number, h: number, mode: RectMode, color: string) {
    if (this.canvasContext && (mode === RectMode.Fill)) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.fillRect(x, y, w, h);
    } else if (this.canvasContext && (mode === RectMode.Stroke)) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.strokeRect(x, y, w, h);
    }
  }

  drawButton(
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    mode: RectMode,
    color: string,
  ) {
    if (!this.canvasContext) {
      return;
    }

    this.rect(x, y, width, height, mode, color);

    this.canvasContext.fillStyle = '#ffffff';
    this.canvasContext.font = 'bold 24px verdana, sans-serif ';
    this.canvasContext.fillText(text, x + (width / 2) - (text.length * 6), y + (height / 2) + 10);
  }

  clear() {
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.width, this.height);
    }
  }

  clearRect(x: number, y: number, width: number, height: number) {
    if (this.canvasContext) {
      this.canvasContext.clearRect(x, y, width, height);
    }
  }
}
