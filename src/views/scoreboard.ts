import Sprites from '../enums/sprites';
import { WTEXT } from '../enums/values';
import { green } from '../media/colors';
import History from '../media/history';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class ScoreView extends View {

  constructor(private place?: number) {
    super();
  }

  init(): void {
    if (this.place === undefined) {
      this.viewScoreboard();
      return;
    }
    const that = this;
    const history: History = Game.game.history;
    history.save();
    const total: number = history.calculateScore();
    this.setDetails(Sprites.CREDITS,
        `${this.place < 0 ? 'you didn\'t make the scoreboard' : 'high score!'}\n` +
        `${history.peopleHelped} people helped x100\n` +
        `${history.itemsCollected} items held x25\n` +
        `${history.nightsSurvived} nights x300\n` +
        `${history.challengesWon} challenges won x100\n` +
        `${history.partyMembers} party members x50\n` +
        `total: ${total}`,
    [
      new Action('continue', () => that.viewScoreboard())
    ]);
  }

  private format(entry: [string, number], index: number): string {
    let dots = '';
    const space = WTEXT - entry[0].length - `${entry[1]}`.length;
    for (let a = 0; a < space; a++) {
      dots += '.';
    }
    if (index === this.place) {
      return green(`${entry[0]}${dots}${entry[1]}`);
    }
    return `${entry[0]}${dots}${entry[1]}`;
  }

  private viewScoreboard(): void {
    const scores = `${Game.game.history.runs.map((x: [string, number], i: number) => this.format(x, i)).join('\n')}`;
    this.setDetails(Sprites.CREDITS, scores, [
      new Action('continue', () => Game.setView(new StartView()))
    ]);
  }
}