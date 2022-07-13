import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class BeginEvent extends View {
  constructor() {
    super();
    this.setDetails(
      Sprites.BEGIN,
      'your party sets off on a new adventure.',
      [ new Action('next', () => Game.game.progress()) ]
    );
  }
}