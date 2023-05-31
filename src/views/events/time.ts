import { DAY_NIGHT_CYCLE, Time } from '../../types';
import Sprites from '../../media/sprites';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class TimeEvent extends EventView {
  private time: Time;

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    const that = this;
    const isDay = (time: Time): boolean => time === Time.DAY;
    const time = isDay(this.game.world.time) ? Time.NIGHT : Time.DAY;
    if (isDay(time)) {
      this.game.history.nightsSurvived++;
    }
    this.game.world.time = time;
    const cave = this.game.world.cave ? ' in the world outside the cave' : '';
    this.setDetails(
      isDay(time) ? Sprites.SUN : Sprites.NIGHT,
      isDay(time)
        ? `the sun rises over the horizon${cave} as night retreats to the west.`
        : `the sun comes to rest behind the hills${cave} as the moon rises into the night sky.`,
      [
        new Action('continue', () => {
          that.game.chain.futureEvent(new TimeEvent(that.game), DAY_NIGHT_CYCLE);
          that.game.progress();
        })
      ]
    );
  }
}
