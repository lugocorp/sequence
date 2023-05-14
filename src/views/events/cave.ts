import { Time } from '../../enums/world';
import Sprites from '../../enums/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class CaveEvent extends EventView {
  static label = 'cave';
  private time: Time;

  constructor(game: Game) {
    super(game);
    const cave = !this.game.world.cave;
    this.setDetails(
      Sprites.CAVE,
      cave
        ? 'your party comes across a cave. will they venture inside?'
        : 'your party comes to a mouth of the cave. finally they are free.',
      cave
        ? [
            new Action('yes', () => {
              this.game.world.cave = true;
              this.game.futureEvent(new CaveEvent(this.game), 8);
              this.game.progress();
            }),
            new Action('no', () => this.game.progress())
          ]
        : [
            new Action('continue', () => {
              this.game.world.cave = false;
              this.game.progress();
            })
          ]
    );
  }
}
