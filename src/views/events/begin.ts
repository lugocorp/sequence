import Sprites from '../../enums/sprites';
import GraphicsRenderer from '../../graphics/renderer';
import Action from '../../graphics/action';
import View from '../../graphics/view';
import Game from '../../game';

export default class BeginEvent extends View {
  constructor() {
    super();
    this.setText('your party sets off on a new adventure.');
    this.image = Sprites.DIRE_CRAB;
    this.actions = [
      new Action('next', () => Game.game.progress())
    ];
  }
}