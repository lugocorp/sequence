import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class BeginEvent extends View {
  constructor() {
    super();
    this.set(
      Sprites.DIRE_CRAB,
      'your party sets off on a new adventure.',
      [ new Action('next', () => Game.game.progress()) ]
    );
  }
}