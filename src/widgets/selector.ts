import GraphicsRenderer from '../graphics/renderer';
import GameView from '../views/game';
import Widget from './widget';
import Text from './text';

export default class Selector extends Widget {
  private get: (i: number) => any;
  private length: number;
  private index: number;
  private choose: Text;
  private next: Text;
  private last: Text;
  showChoose: boolean;

  constructor(length: number, get: (i: number) => any, onchange: (value: any) => void, callback: (result: any) => void) {
    super();
    const that = this;
    this.showChoose = true;
    this.length = length;
    this.index = 0;
    this.get = get;
    this.last = new Text('last', 2, 180, false, () => {
      that.index = (that.index || that.length) - 1;
      onchange ? onchange(that.getSelected()) : undefined;
    });
    this.choose = new Text('choose', 35, 180, false, () => {
      callback(that.getSelected());
    });
    this.next = new Text('next', 78, 180, false, () => {
      that.index = (that.index === that.length - 1) ? 0 : that.index + 1;
      onchange ? onchange(that.getSelected()) : undefined;
    });
  }

  // Returns the currently selected element
  getSelected(): any {
    return this.get(this.index);
  }

  click(): void {
    if (this.length > 1) {
      this.last.click();
      this.next.click();
    }
    if (this.showChoose) {
      this.choose.click();
    }
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.length > 1) {
      this.last.render(view, r);
      this.next.render(view, r);
    }
    if (this.showChoose) {
      this.choose.render(view, r);
    }
  }
}