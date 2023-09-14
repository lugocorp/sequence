import { Time } from '../../types';
import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class CaveEvent extends EventView {
  private time: Time;

  getViews(): View[] {
    const cave = !this.game.world.cave;
    return [{
      image: Sprites.CAVE,
      text: cave
        ? 'your party comes across a cave. will they venture inside?'
        : 'your party comes to an exit of the cave. finally they are free!',
      actions: cave
        ? {
            'yes': () => {
              this.game.world.cave = true;
              this.game.chain.futureEvent(new CaveEvent(this.game), 8);
              this.game.progress();
            },
            'no': () => this.game.progress()
          }
        : {
            'continue': () => {
              this.game.world.cave = false;
              this.game.progress();
            }
          }
      }];
  }
}
