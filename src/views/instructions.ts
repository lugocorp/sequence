import Sprites from '../enums/sprites';
import GraphicsRenderer from '../graphics/renderer';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class InstructionsView extends View {

  constructor() {
    super();
    this.set(
      Sprites.DIRE_CRAB,
      [
        'this is a role playing game.',
        'all you have to do is make choices for your party.',
        'you will fight monsters, collect offerings, and meet helpful spirits.',
        'never give up hope and you will go far!'
      ].join(' '),
      [
        new Action('back', () => {
          Game.game.view = new StartView();
          Game.game.invalidate();
        })
      ]
    );
  }
}