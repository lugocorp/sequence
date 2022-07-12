import Game from '../game';
import InstructionsView from './instructions';
import CreditsView from './credits';
import View from '../graphics/view';

export default class StartView extends View {

  constructor() {
    super();
    this.actions = [
      {
        text: 'new game',
        effect: () => {
          // Game.game.view = new GameView(Game.game.chain);
        }
      },
      {
        text: 'instructions',
        effect: () => {
          Game.game.view = new InstructionsView();
        }
      },
      {
        text: 'credits',
        effect: () => {
          Game.game.view = new CreditsView();
        }
      }
    ];
  }
}