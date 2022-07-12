import Game from '../game';
import GraphicsRenderer from '../graphics/renderer';
import StartView from './start';
import View from '../graphics/view';

export default class InstructionsView extends View {

  constructor() {
    super();
    this.actions = [
      {
        text: 'back',
        effect: () => {
          Game.game.view = new StartView();
          Game.game.invalidate();
        }
      }
    ];
    this.setText([
      'this is a role playing game.',
      'all you have to do is make choices as your party goes on an adventure.',
      'you will fight monsters, collect offerings, and meet helpful spirits.',
      'never give up hope and you will go far!'
    ].join(' '));
  }
}