import { RectMode, Drawing } from '../constants';

type Position = {
  x: number;
  y: number;
};

type Controls = {
  [key: string]: ({ x, y }: Position) => ({ x: number, y: number });
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  mode: RectMode;
};

type Text = {
  text: string;
  textColor: string;
};

type Button = Rect & Text;

type Update = Partial<Rect> & Partial<Text> & {
  type: Drawing;
};

export {
  Rect, Button, Update, Position, Controls,
};
