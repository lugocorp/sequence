import {WTEXT, HTEXT} from '../enums/values';
import Sprites from '../enums/sprites';
import Selector from './selector';
import Action from './action';

export default class View {
  private text: string;
  selector: Selector<any>;
  actions: Action[];
  image: number;

  // Performs some task when this view is first transitioned to
  init(): void {
    // Do nothing by default
  }

  // Returns true if there is an Action with the given label in the current View
  hasAction(label: string): boolean {
    for (const action of this.actions) {
      if (action.label === label) {
        return true;
      }
    }
    return false;
  }

  // Removes an Action with the given label
  removeAction(label: string): void {
    for (const action of this.actions) {
      if (action.label === label) {
        this.actions.splice(this.actions.indexOf(action), 1);
        return;
      }
    }
  }

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
  getActionCoords(index: number): [number, number] {
    let x = 1;
    let y = 0;
    const coords: [number, number] = [x, y];
    for (let a = 1; a < this.actions.length; a++) {
      const current: string = this.actions[a].label;
      const previous: string = this.actions[a - 1].label;
      if (coords[0] === 1 && current.length + previous.length + 1 <= WTEXT - 2) {
        coords[0] = WTEXT - 1 - current.length;
      } else {
        coords[0] = 1;
        coords[1]++;
      }
      if (a === index) {
        x = coords[0];
        y = coords[1];
      }
    }
    return [x, y + HTEXT - coords[1] - 2];
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