import GraphicsRenderer from '../graphics/renderer';
import Widget from './widget';
import Text from './text';

export default class Selector extends Widget {
  private callback: (result: any) => void;
  private get: (i: number) => any;
  private length: number;
  private index: number;
  private choose: Text;
  private next: Text;
  private last: Text;

  constructor(length: number, get: (i: number) => any, callback: (result: any) => void) {
    super();
    const that = this;
    this.callback = callback;
    this.length = length;
    this.index = 0;
    this.get = get;
    this.last = new Text('last', 2, 180, false, () => {
      that.index = (that.index || that.length) - 1;
    });
    this.choose = new Text('choose', 35, 180, false, () => {
      that.callback(that.getSelected());
    });
    this.next = new Text('next', 78, 180, false, () => {
      that.index = (that.index === that.length - 1) ? 0 : that.index + 1;
    });
  }

  getSelected(): any {
    return this.get(this.index);
  }

  click(): void {
    if (this.length > 1) {
      this.last.click();
      this.next.click();
    }
    this.choose.click();
  }

  render(r: GraphicsRenderer): void {
    if (this.length > 1) {
      this.last.render(r);
      this.next.render(r);
    }
    this.choose.render(r);
  }

}