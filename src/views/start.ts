import Sprites from '../enums/sprites';
import InstructionsView from './instructions';
import CreditsView from './credits';
import ScoreView from './scoreboard';
import View from '../ui/view';
import Action from '../ui/action';
import Game from '../game';

export default class StartView extends View {
  constructor(game: Game) {
    super();
    this.setDetails(
      Sprites.WELCOME,
      "welcome to the game!\nthis is a beta release, please report any bugs you encounter.",
      [
        new Action('instructions', () => game.setView(new InstructionsView(game))),
        new Action('credits', () => game.setView(new CreditsView(game))),
        new Action('new game', () => game.setView(game.chain.latest(game))),
        new Action('score', () => game.setView(new ScoreView()))
      ]
    );
  }

  init(game: Game): void {
    game.setInitialState();
  }
}
