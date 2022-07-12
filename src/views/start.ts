import Game from '../game';
import InstructionsView from './instructions';
import CreditsView from './credits';
import View from '../graphics/view';
import Action from '../graphics/action';

export default class StartView extends View {

  constructor() {
    super();
    this.actions = [
      new Action('new game', () => {
        // Game.game.view = new GameView(Game.game.chain);
      }),
      new Action('instructions', () => {
        Game.game.view = new InstructionsView();
      }),
      new Action('credits', () => {
          Game.game.view = new CreditsView();
      })
    ];
  }
}