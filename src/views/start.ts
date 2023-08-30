import Sprites from '../media/sprites';
import InstructionsView from './instructions';
import CreditsView from './credits';
import ScoreView from './scoreboard';
import View from '../ui/view';
import Action from '../ui/action';
import Game from '../game';

export default class StartView extends View {
  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.WELCOME,
      'welcome to the game!',
      [
        new Action('instructions', () => game.setView(new InstructionsView(game))),
        new Action('credits', () => game.setView(new CreditsView(game))),
        new Action('new game', () => game.setView(game.chain.latest())),
        new Action('score', () => game.setView(new ScoreView(game)))
      ]
    );
  }

  init(): void {
    this.game.setInitialState();
  }
}
