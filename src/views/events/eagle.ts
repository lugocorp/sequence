import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class EagleEvent extends EventView {
  getViews(): View[] {
    for (const hero of this.game.party.members) {
      if (hero.lucky()) {
        hero.energy++;
      }
    }
    return [{
      image: Sprites.EAGLE,
      text: 'an eagle flies overhead. some of your party members feel slightly more energized.',
      actions: { 'continue': () => this.game.progress() }
    }];
  }
}
