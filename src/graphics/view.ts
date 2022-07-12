import GraphicsRenderer from './renderer';

export default class View {
  options: any[];
  select: (e: any) => void;
  actions: {text: string, effect: () => void}[];
  image: number;
  text: string;

  // Sets this view's selectable options
  setOptions(options: any[], select: (e: any) => void): void {
    this.options = options;
    this.select = select;
  }

  // Returns true if this view has options
  hasOptions(): boolean {
    return (this.options?.length || 0) > 1;
  }

  // Returns true if this view has actions
  hasActions(): boolean {
    return (this.actions?.length || 0) > 0;
  }

  // Returns the coordinates of each action
  getActionCoords(index: number): number[] {
    return [1, GraphicsRenderer.TEXT_HEIGHT - (this.actions.length - index)];
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