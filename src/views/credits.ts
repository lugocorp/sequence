import Game from '../game';
import GraphicsRenderer from '../graphics/renderer';
import StartView from './start';
import View from './view';

export default class CreditsView implements View {

  click(): void {
    if (Game.game.within('back', 40, 190)) {
      Game.game.view = new StartView();
    }
  }

  frame(r: GraphicsRenderer): void {
    r.drawText('-programming-', 15, 10);
    r.drawText('alex lugo', 25, 20);
    r.drawText('-design-', 30, 40);
    r.drawText('alex lugo', 25, 50);
    r.drawText('-pixel art-', 20, 70);
    r.drawText('alex lugo', 25, 80);
    r.drawText('alexlugo.net', 20, 130);
    r.drawText('back', 40, 190, true);
  }
}