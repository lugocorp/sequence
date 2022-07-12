import {TEXT_H} from '../enums/values';
import Selector from './selector';
import Action from './action';

export default class View {
  selector: Selector<any>;
  actions: Action[];
  image: number;
  text: string;

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