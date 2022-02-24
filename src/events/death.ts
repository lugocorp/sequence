import GraphicsRenderer from '../graphics/renderer';
import StartView from '../views/start';
import GameView from '../views/game';
import Event from './event';
import Game from '../game';

export default class DeathEvent implements Event {
  state: number;

  /**
   * Handle click logic for this event
   */
  click(): void {
    if (Game.game.within('continue', 30, 190)) {
      Game.game.view = new StartView();
    }
  }

  /**
   * Render the death event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    r.drawText('your party did', 15, 90);
    r.drawText('not make it', 20, 100);
    r.drawText('continue', 30, 190, true);
  }
}