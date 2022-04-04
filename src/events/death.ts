import GraphicsRenderer from '../graphics/renderer';
import StartView from '../views/start';
import GameView from '../views/game';
import Text from '../widgets/text';
import Event from './event';
import Game from '../game';

export default class DeathEvent implements Event {
  continue: Text;
  state: number;

  constructor() {
    this.continue = new Text('continue', 30, 190, false, () => {
      Game.game.view = new StartView();
    });
  }

  /**
   * Handle click logic for this event
   */
  click(): void {
    this.continue.click();
  }

  /**
   * Render the death event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    r.drawText('your party did', 15, 90);
    r.drawText('not make it', 20, 100);
    this.continue.render(view, r);
  }
}