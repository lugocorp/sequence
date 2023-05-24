import { green, yellow, orange, red } from '../media/colors';
import View from '../ui/view';
import Game from '../game';

/**
 * This class wraps game event logic such as event type labelling and comparison
 */
export default class EventView extends View {
  constructor(game: Game) {
    super(game);
  }

  // Colors a success rate based on its numerical range
  coloredRate(rate: number, reversed = false): string {
    const colorRate = reversed ? 100 - rate : rate;
    if (colorRate >= 90) {
      return green(`${rate}%`);
    }
    if (colorRate >= 60) {
      return yellow(`${rate}%`);
    }
    if (colorRate >= 30) {
      return orange(`${rate}%`);
    }
    return red(`${rate}%`);
  }
}
