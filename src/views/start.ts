import Game from '../game';
import InstructionsView from './instructions';
import CreditsView from './credits';
import View from '../ui/view';
import Action from '../ui/action';

export default class StartView extends View {

  constructor() {
    super();
    this.actions = [
      new Action('new game', () => {
        Game.game.view = Game.game.chain.latest();
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