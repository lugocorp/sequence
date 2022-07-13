import {WTEXT, HTEXT} from '../enums/values';
import Sprites from '../enums/sprites';
import Selector from './selector';
import Action from './action';
import Game from '../game';

export default class View {
  private text: string;
  selector: Selector<any>;
  actions: Action[];
  image: number;

  // Sets all the important values of this View
  setDetails(image: number, text: string, actions: Action[]): void {
    this.image = image;
    this.setText(text);
    this.actions = actions;
    this.selector = undefined;
  }

  // Sets details consistent with a selector view
  setSelector(selector: Selector<any>, actions: Action[]): void {
    this.setDetails(Sprites.NONE, '', actions);
    this.selector = selector;
    this.selector.invalidate();
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
    return [1, HTEXT - (this.actions.length - index + 1)];
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
    const words: string[] = msg.replace(/\n/g, '\n ').split(' ');
    let line: string = words.shift();
    let text = '';
    while (line.length) {
      while (words.length && line.length + words[0].length + 1 <= WTEXT) {
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
    this.text = text.replace(/\t/g, ' ');
  }
}