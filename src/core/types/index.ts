import { RectMode, Drawing } from '../constants';

type Position = {
  x: number;
  y: number;
};

type Controls = {
  [key: string]: ({ x, y }: Position) => ({ x: number, y: number });
};

type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  mode: RectMode,
};

type Button = Rect & {
  text: string,
};

type Update = Partial<Rect> & {
  text?: string,
  type: Drawing,
};

export {
  Rect, Button, Update, Position, Controls,
};
