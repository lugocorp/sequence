import { DAY_NIGHT_CYCLE, Time } from '../../types';
import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class TimeEvent extends EventView {
  getViews(): View[] {
    const isDay = (time: Time): boolean => time === Time.DAY;
    const time = isDay(this.game.world.time) ? Time.NIGHT : Time.DAY;
    if (isDay(time)) {
      this.game.history.nightsSurvived++;
    }
    this.game.world.time = time;
    const cave = this.game.world.cave ? ' in the world outside the cave' : '';
    return [{
      image: isDay(time) ? Sprites.SUN : Sprites.NIGHT,
      text: isDay(time)
        ? `the sun rises over the horizon${cave} as night retreats to the west.`
        : `the sun comes to rest behind the hills${cave} as the moon rises into the night sky.`,
      actions: {
        'continue': () => {
          this.game.chain.futureEvent(new TimeEvent(this.game), DAY_NIGHT_CYCLE);
          this.game.progress();
        }
      }
    }];
  }
}
