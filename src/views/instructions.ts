import Game from '../game';
import GraphicsRenderer from '../graphics/renderer';
import StartView from './start';
import View from '../graphics/view';
import Action from '../graphics/action';

export default class InstructionsView extends View {

  constructor() {
    super();
    this.actions = [
      new Action('back', () => {
        Game.game.view = new StartView();
        Game.game.invalidate();
      })
    ];
    this.setText([
      'this is a role playing game.',
      'all you have to do is make choices for your party.',
      'you will fight monsters, collect offerings, and meet helpful spirits.',
      'never give up hope and you will go far!'
    ].join(' '));
  }
}