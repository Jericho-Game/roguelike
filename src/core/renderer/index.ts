import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  RectMode,
  Drawing,
} from '../constants';
import { Rect, Button, Update } from '../types';

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

  rect({
    x, y, width, height, mode, color,
  }: Rect) {
    if (this.canvasContext && (mode === RectMode.Fill)) {
      this.canvasContext.fillStyle = color;
      this.canvasContext.fillRect(x, y, width, height);
    } else if (this.canvasContext && (mode === RectMode.Stroke)) {
      this.canvasContext.strokeStyle = color;
      this.canvasContext.strokeRect(x, y, width, height);
    }
  }

  drawButton({
    x, y, width, height, mode, text, color,
  }: Button) {
    const context = this.canvasContext as CanvasRenderingContext2D;

    this.rect({
      x, y, width, height, mode, color,
    });

    context.fillStyle = '#ffffff';
    context.font = 'bold 24px verdana, sans-serif ';
    context.fillText(text, x + (width / 2) - (text.length * 6), y + (height / 2) + 10);
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

  update({
    x, y, text, width, height, color, mode, type,
  }: Update) {
    switch (type) {
      case Drawing.Cell:
        this.rect({
          x, y, width, height, mode, color,
        } as Rect);
        break;
      case Drawing.Button:
        this.drawButton({
          x, y, width, height, mode, text, color,
        } as Button);
        break;
      case Drawing.Clear:
        this.clear();
        break;
      default:
        break;
    }
  }
}
