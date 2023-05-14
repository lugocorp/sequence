import { DAY_NIGHT_CYCLE, Time } from '../../enums/world';
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

  init(game: Game): void {
    const isDay = (time: Time): boolean => time === Time.DAY;
    const time = isDay(game.world.time) ? Time.NIGHT : Time.DAY;
    if (isDay(time)) {
      game.history.nightsSurvived++;
    }
    game.world.time = time;
    const cave = game.world.cave ? ' in the world outside the cave' : '';
    this.setDetails(
      isDay(time) ? game.getBackground() : Sprites.NIGHT,
      isDay(time)
        ? `the sun rises over the horizon${cave} as night retreats to the west.`
        : `the sun comes to rest behind the hills${cave} as the moon rises into the night sky.`,
      [
        new Action('continue', () => {
          game.futureEvent(new TimeEvent(), DAY_NIGHT_CYCLE);
          game.progress();
        })
      ]
    );
  }
}
