import { green, yellow, orange, red } from '../enums/colors';
import View from '../ui/view';
import Game from '../game';

/**
 * This class wraps game event logic such as event type labelling and comparison
 */
export class EventView extends View {
  constructor(game: Game) {
    super(game);
  }

  // Colors a success rate based on its numerical range
  coloredRate(rate: number): string {
    if (rate >= 90) {
      return green(`${rate}%`);
    }
    if (rate >= 60) {
      return yellow(`${rate}%`);
    }
    if (rate >= 30) {
      return orange(`${rate}%`);
    }
    return red(`${rate}%`);
  }
}
