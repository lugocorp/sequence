import { Time, DAY_NIGHT_CYCLE } from '../../enums/world';
import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class TimeEvent extends EventView {
  static label = 'time';
  private time: Time;

  constructor() {
    super(TimeEvent);
  }

  init(): void {
    const isDay = (time: Time): boolean => time === Time.DAY;
    const time = isDay(Game.game.world.time) ? Time.NIGHT : Time.DAY;
    if (isDay(time)) {
      Game.game.history.nightsSurvived++;
    }
    const cave = Game.game.world.cave ? ' in the world outside the cave' : '';
    this.setDetails(
      isDay(time) ? Sprites.DAY : Sprites.NIGHT,
      isDay(time)
        ? `the sun rises over the horizon${cave} as night retreats to the west`
        : `the sun comes to rest behind the hills${cave} as the moon rises into the night sky`,
      [
        new Action('continue', () => {
          Game.game.world.time = time;
          Game.futureEvent(new TimeEvent(), DAY_NIGHT_CYCLE);
          Game.game.progress();
        })
      ]
    );
  }
}
