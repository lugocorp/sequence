import GraphicsRenderer from '../graphics/renderer';
import Sprites from '../enums/sprites';
import GameView from '../views/game';
import Event from './event';
import Game from '../game';

export default class TreasureEvent implements Event {
  amount: number;
  state: number;
  msg: string;

  constructor() {
    this.amount = 1;
    const roll = Math.random();
    if (roll < 0.5) {
      this.amount = 5;
    }
    if (roll < 0.05) {
      this.amount = 25;
    }
    this.msg = `your party found ${this.amount} gold`;
  }

  /**
   * Handle click logic for this event
   */
  click(): void {
    if (Game.game.within('collect the gold', 10, 180)) {
      Game.game.party.gold += this.amount;
      Game.game.progress();
    }
    if (Game.game.within('leave it', 30, 190)) {
      Game.game.progress();
    }
  }

  /**
   * Render the death event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    r.drawSprite(Sprites.ENEMY, 20, 20);
    r.drawParagraph(this.msg, 2, 100);
    r.drawText('collect the gold', 10, 180, true);
    r.drawText('leave it', 30, 190, true);
  }
}