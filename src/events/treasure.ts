import GraphicsRenderer from '../graphics/renderer';
import Sprites from '../enums/sprites';
import GameView from '../views/game';
import Rarity from '../rarity';
import Event from './event';
import Game from '../game';

export default class TreasureEvent implements Event {
  static PRELUDE      = -1;
  static CHOICE       = 0;
  static GRABBED      = 1;
  static LEFT         = 2;
  amount: number;
  state: number;
  msg: string;

  constructor() {
    this.amount = [1, 5, 25][Rarity.roll(Rarity.RARE)];
    this.msg = `your party found ${this.amount} gold`;
    this.state = TreasureEvent.PRELUDE;
  }

  /**
   * Handle click logic for this event
   */
  click(): void {
    if (this.state === TreasureEvent.PRELUDE) {
      if (Game.game.within('continue', 30, 190)) {
        this.state = TreasureEvent.CHOICE;
      }
    } else if (this.state === TreasureEvent.CHOICE) {
      if (Game.game.within('collect the gold', 10, 180)) {
        Game.game.party.gold += this.amount;
        this.state = TreasureEvent.GRABBED;
      }
      if (Game.game.within('leave it', 30, 190)) {
        this.state = TreasureEvent.LEFT;
      }
    } else {
      if (Game.game.within('continue', 30, 190)) {
        Game.game.progress();
      }
    }
  }

  /**
   * Render the death event-specific view
   */
  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === TreasureEvent.PRELUDE) {
      r.drawParagraph('your party came across some gold', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
    if (this.state === TreasureEvent.CHOICE) {
      r.drawSprite(Sprites.TREASURE_CHEST, 20, 20);
      r.drawParagraph(this.msg, 2, 100);
      r.drawText('collect the gold', 10, 180, true);
      r.drawText('leave it', 30, 190, true);
    }
    if (this.state === TreasureEvent.GRABBED) {
      r.drawParagraph('your party picked up the gold', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
    if (this.state === TreasureEvent.LEFT) {
      r.drawParagraph('your party left the gold', 2, 0);
      r.drawText('continue', 30, 190, true);
    }
  }
}