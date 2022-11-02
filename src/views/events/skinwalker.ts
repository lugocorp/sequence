import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import { Event } from '../event';
import Game from '../../game';

export default class SkinwalkerEvent extends Event {
  static label = 'skinwalker';

  constructor() {
    super(SkinwalkerEvent);
  }

  init(): void {
    this.setDetails(Sprites.SKINWALKER, 'something stares from the darkness.', [
      new Action('continue', () => Game.game.progress())
    ]);
    const heroes: Hero[] = [ ...Game.game.party.members ];
    const removed: number = Random.max(heroes.length);
    for (let a = 0; a < removed; a++) {
      const hero: Hero = Random.element(heroes);
      heroes.splice(heroes.indexOf(hero), 1);
      Stats.setUnitStat(hero, Stats.STRENGTH, 0);
      Stats.setUnitStat(hero, Stats.WISDOM, 0);
      Stats.setUnitStat(hero, Stats.DEXTERITY, 0);
    }
  }
}
