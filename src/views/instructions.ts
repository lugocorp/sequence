import Game from '../game';
import GraphicsRenderer from '../graphics/renderer';
import StartView from './start';
import View from './view';

export default class InstructionsView implements View {

  click(): void {
    if (Game.game.within('back', 40, 190)) {
      Game.game.view = new StartView();
    }
  }

  frame(r: GraphicsRenderer): void {
    const instructions: string = 'this is a role playing game. ' +
      'all you have to do is make choices as your party goes on an adventure. ' +
      'you will fight monsters, collect offerings, and meet helpful spirits. ' +
      'never give up hope and you will go far!'
    r.drawParagraph(instructions, 2, 10);
    r.drawText('back', 40, 190, true);
  }
}