import {WTEXT} from '../enums/values';
import Sprites from '../enums/sprites';
import Selector from '../ui/selector';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class ScoreView extends View {

  init(): void {
    Game.game.history.save();
    const content = `scoreboard:\n${Game.game.history.runs.map((x: [string, number]) => this.format(x)).join('\n')}`;
    this.setDetails(Sprites.CREDITS, content, [
      new Action('next', () => Game.setView(new StartView()))
    ]);
  }

  format(entry: [string, number]): string {
    let dots = '';
    const space = WTEXT - entry[0].length - `${entry[1]}`.length;
    for (let a = 0; a < space; a++) {
      dots += '.';
    }
    return `${entry[0]}${dots}${entry[1]}`;
  }
}