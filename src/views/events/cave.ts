import { Time } from '../../types';
import Sprites from '../../media/sprites';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class CaveEvent extends EventView {
  private time: Time;

  constructor(game: Game) {
    super(game);
    const cave = !this.game.world.cave;
    this.setDetails(
      Sprites.CAVE,
      cave
        ? 'your party comes across a cave. will they venture inside?'
        : 'your party comes to an exit of the cave. finally they are free!',
      cave
        ? [
            new Action('yes', () => {
              this.game.world.cave = true;
              this.game.chain.futureEvent(new CaveEvent(this.game), 8);
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
