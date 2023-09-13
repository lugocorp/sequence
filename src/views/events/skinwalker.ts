import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import EventView from '../event';
import View from '../view';

export default class SkinwalkerEvent extends EventView {
  getViews(): View[] {
    const heroes: Hero[] = [ ...this.game.party.members ];
    const removed: number = Random.max(heroes.length - 1) + 1;
    for (let a = 0; a < removed; a++) {
      const hero: Hero = Random.element(heroes);
      heroes.splice(heroes.indexOf(hero), 1);
      hero.energy = -100;
    }
    return [{
      image: Sprites.SKINWALKER,
      text: 'something stares from the darkness.',
      actions: {
        'continue': () => this.game.progress()
      }
    }];
  }
}
