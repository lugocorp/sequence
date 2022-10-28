import { Time, DAY_NIGHT_CYCLE } from '../../enums/world';
import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class TimeEvent extends View {
  private time: Time;

  constructor() {
    super();
    const that = this;
    const isDay = (time: Time): boolean => time === Time.DAY;
    this.time = isDay(Game.game.world.time) ? Time.NIGHT : Time.DAY;
    this.setDetails(
      isDay(this.time) ? Sprites.DAY : Sprites.NIGHT,
      isDay(this.time)
        ? 'the sun rises over the horizon as night retreats to the west'
        : 'the sun comes to rest behind the hills as the moon rises into the night sky',
      [
        new Action('continue', () => {
          Game.game.world.time = that.time;
          Game.futureEvent(new TimeEvent(), DAY_NIGHT_CYCLE);
          Game.game.progress();
        })
      ]
    );
  }
}
