import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class SkinwalkerEvent extends EventView {
  static label = 'skinwalker';

  constructor() {
    super(SkinwalkerEvent);
  }

  init(game: Game): void {
    this.setDetails(Sprites.SKINWALKER, 'something stares from the darkness.', [
      new Action('continue', () => game.progress())
    ]);
    const heroes: Hero[] = [ ...game.party.members ];
    const removed: number = Random.max(heroes.length - 1) + 1;
    for (let a = 0; a < removed; a++) {
      const hero: Hero = Random.element(heroes);
      heroes.splice(heroes.indexOf(hero), 1);
      hero.fullyFatigue();
    }
  }
}
