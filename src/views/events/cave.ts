import { Time } from '../../enums/world';
import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class CaveEvent extends EventView {
  static label = 'cave';
  private time: Time;

  constructor(game: Game) {
    super(CaveEvent);
    const cave = !game.world.cave;
    this.setDetails(
      Sprites.CAVE,
      cave
        ? 'your party comes across a cave. will they venture inside?'
        : 'your party comes to a mouth of the cave. finally they are free.',
      cave
        ? [
            new Action('yes', () => {
              game.world.cave = true;
              game.futureEvent(new CaveEvent(game), 8);
              game.progress();
            }),
            new Action('no', () => game.progress())
          ]
        : [
            new Action('continue', () => {
              game.world.cave = false;
              game.progress();
            })
          ]
    );
  }
}
