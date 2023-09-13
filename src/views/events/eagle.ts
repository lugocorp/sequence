import Sprites from '../../media/sprites';
import EventView from '../event';
import Game from '../../game';

export default class EagleEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    for (const hero of this.game.party.members) {
      if (hero.lucky()) {
        hero.energy++;
      }
    }
    this.setDetails(
      Sprites.EAGLE,
      'an eagle flies overhead. some of your party members feel slightly more energized.',
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
