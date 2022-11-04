import { Time } from '../../enums/world';
import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class CaveEvent extends EventView {
  static label = 'cave';
  private time: Time;

  constructor() {
    super(CaveEvent);
    const cave = !Game.game.world.cave;
    this.setDetails(
      cave
        ? Sprites.CAVE
        : Game.game.world.time === Time.DAY
        ? Game.game.getBackground()
        : Sprites.NIGHT,
      cave
        ? 'your party comes across a cave. will they venture inside?'
        : 'your party comes to a mouth of the cave. finally they are free.',
      cave
        ? [
            new Action('yes', () => {
              Game.game.world.cave = true;
              Game.futureEvent(new CaveEvent(), 8);
              Game.game.progress();
            }),
            new Action('no', () => Game.game.progress())
          ]
        : [
            new Action('continue', () => {
              Game.game.world.cave = false;
              Game.game.progress();
            })
          ]
    );
  }
}
