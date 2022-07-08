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

  context: CanvasRenderingContext2D;

  element: HTMLCanvasElement;

  constructor(canvasElement: HTMLCanvasElement) {
    const canvasContext = canvasElement.getContext('2d');

    this.context = canvasContext as CanvasRenderingContext2D;
    this.element = canvasElement;

    this.element.width = CANVAS_WIDTH;
    this.element.height = CANVAS_HEIGHT;
  }

  rect({
    x, y, width, height, mode, color,
  }: Rect) {
    if (this.context && (mode === RectMode.Fill)) {
      this.context.fillStyle = color;
      this.context.fillRect(x, y, width, height);
    } else if (this.context && (mode === RectMode.Stroke)) {
      this.context.strokeStyle = color;
      this.context.strokeRect(x, y, width, height);
    }
  }

  drawButton({
    x, y, width, height, mode, text, color, textColor = 'white',
  }: Button) {
    this.rect({
      x, y, width, height, mode, color,
    });

    this.context.fillStyle = textColor;
    this.context.font = 'bold 24px verdana, sans-serif ';
    this.context.fillText(text, x + (width / 2) - (text.length * 6), y + (height / 2) + 10);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  clearRect(x: number, y: number, width: number, height: number) {
    this.context.clearRect(x, y, width, height);
  }

  update({
    x, y, text, textColor, width, height, color, mode, type,
  }: Update) {
    switch (type) {
      case Drawing.Cell:
        this.rect({
          x, y, width, height, mode, color,
        } as Rect);
        break;
      case Drawing.Button:
        this.drawButton({
          x, y, width, height, mode, text, textColor, color,
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
