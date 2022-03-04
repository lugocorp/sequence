import Game from '../game';
import Text from '../graphics/text';
import GraphicsRenderer from '../graphics/renderer';
import StartView from './start';
import View from './view';

export default class InstructionsView extends View {

  constructor() {
    super();
    this.addText(new Text('back', 40, 190, false, () => {
      Game.game.view = new StartView();
    }));
  }

  frame(r: GraphicsRenderer): void {
    super.frame(r);
    const instructions: string = 'this is a role playing game. ' +
      'all you have to do is make choices as your party goes on an adventure. ' +
      'you will fight monsters, collect offerings, and meet helpful spirits. ' +
      'never give up hope and you will go far!'
    r.drawParagraph(instructions, 2, 10);
  }
}