import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Hero from '../../entities/hero';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class SkinwalkerEvent extends View {

  init(): void {
    this.setDetails(Sprites.SKINWALKER, 'your party comes across a skinwalker.', [
      new Action('continue', () => Game.game.progress())
    ]);
    const heroes: Hero[] = [...Game.game.party.members];
    const removed: number = Random.max(heroes.length);
    for (let a = 0; a < removed; a++) {
      const hero: Hero = Random.element(heroes);
      heroes.splice(heroes.indexOf(hero), 1);
      hero.strength = 0;
      hero.wisdom = 0;
      hero.dexterity = 0;
    }
  }
}