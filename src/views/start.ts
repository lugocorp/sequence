import Game from '../game';
import Text from '../graphics/text';
import InstructionsView from './instructions';
import CreditsView from './credits';
import GameView from './game';
import View from './view';

export default class StartView extends View {

  constructor() {
    super();
    this.addText(
      new Text('new game', 30, 70, false, () => {
        Game.game.view = new GameView(Game.game.chain);
      }),
      new Text('instructions', 20, 90, false, () => {
        Game.game.view = new InstructionsView();
      }),
      new Text('credits', 30, 110, false, () => {
        Game.game.view = new CreditsView();
      })
    );
  }
}