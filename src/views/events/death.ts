import GraphicsRenderer from '../../graphics/renderer';
import StartView from '../../views/start';
import View from '../../ui/view';
import Game from '../../game';

export default class DeathEvent extends View {
  /* continue: Text;
  state: number;

  constructor() {
    super();
    this.continue = new Text('continue', 30, 190, false, () => {
      Game.game.view = new StartView();
    });
  }

  // Handle click logic for this event
  click(): void {
    this.continue.click();
  }

  // Render the death event-specific view
  render(view: GameView, r: GraphicsRenderer): void {
    r.drawText('your party did', 15, 90);
    r.drawText('not make it', 20, 100);
    this.continue.render(view, r);
  } */
}