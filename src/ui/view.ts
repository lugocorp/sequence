import {TEXT_H} from '../enums/values';
import Selector from './selector';
import Action from './action';
import Game from '../game';

export default class View {
  private text: string;
  selector: Selector<any>;
  actions: Action[];
  image: number;

  // Sets all the important values of this View
  set(image: number, text: string, actions: Action[], selector: Selector<any> = undefined): void {
    this.image = image;
    this.setText(text);
    this.actions = actions;
    this.selector = selector;
    if (this.selector) {
      this.selector.invalidate();
    }
  }

  // Returns true if this view has options
  hasOptions(): boolean {
    return (this.selector?.size() || 0) > 1;
  }

  // Returns true if this view has actions
  hasActions(): boolean {
    return (this.actions?.length || 0) > 0;
  }

  // Returns the text coordinates of the indexed action
  getActionCoords(index: number): number[] {
    return [1, TEXT_H - (this.actions.length - index + 1)];
  }

  // Sets a single action for this View
  setAction(label: string, effect: () => void): void {
    this.actions = [
      new Action(label, effect)
    ];
  }

  // Returns this view's text content
  getText(): string {
    return this.text;
  }

  // Formats text wrap according to the screen constraints
  setText(msg: string): void {
    const words: string[] = msg.split(' ');
    let line: string = words.shift();
    let text = '';
    while (line.length) {
      while (words.length && line.length + words[0].length + 1 <= 24) {
        if (line[line.length - 1] === '\n') {
          break;
        }
        line = `${line} ${words.shift()}`;
      }
      if (line[line.length - 1] !== '\n') {
        line += '\n';
      }
      text += line;
      line = words.length ? words.shift(): '';
    }
    this.text = text;
  }
}