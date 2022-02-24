import Game from '../game';
import GraphicsRenderer from '../graphics/renderer';
import InstructionsView from './instructions';
import CreditsView from './credits';
import GameView from './game';
import View from './view';

export default class StartView implements View {

  click(): void {
    if (Game.game.within('new game', 30, 70)) {
      Game.game.view = new GameView(Game.game.chain);
    }
    if (Game.game.within('instructions', 20, 90)) {
      Game.game.view = new InstructionsView();
    }
    if (Game.game.within('credits', 30, 110)) {
      Game.game.view = new CreditsView();
    }
  }

  frame(r: GraphicsRenderer): void {
    r.drawText('new game', 30, 70, true);
    r.drawText('instructions', 20, 90, true);
    r.drawText('credits', 30, 110, true);
  }
}