
export default class Text {
  click: () => void;
  animated: boolean;
  msg: string;
  x: number;
  y: number;

  constructor(msg: string, x: number, y: number, animated = false, click: () => void = undefined) {
    this.animated = animated;
    this.click = click;
    this.msg = msg;
    this.x = x;
    this.y = y;
  }
}