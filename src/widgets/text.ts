import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Widget from './widget';
import Game from '../game';

export default class Text extends Widget {
  callback: () => void;
  animated: boolean;
  cutoff: number;
  msg: string;
  x: number;
  y: number;

  constructor(msg: string, x: number, y: number, animated = false, callback: () => void = undefined) {
    super();
    this.animated = animated;
    this.callback = callback;
    this.cutoff = 0;
    this.msg = msg;
    this.x = x;
    this.y = y;
  }

  isAnimated(): boolean {
    return this.animated && this.cutoff < this.msg.length;
  }

  click(): void {
    if (this.callback && Game.game.within(this.msg, this.x, this.y)) {
      this.callback();
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.cutoff < this.msg.length) {
      this.cutoff++;
    }
    const msg = this.animated ? this.msg.substring(0, this.cutoff) : this.msg;
    r.drawText(msg, this.x, this.y, this.callback ? true : false);
  }
}