import Hero from '../../entities/hero';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class FatigueEvent extends View {

  constructor(hero: Hero) {
    super();
    this.setDetails(hero.sprite, `${hero.name} is too fatigued to move on`, [
      new Action('continue', () => {
        Game.game.party.remove(hero);
        Game.game.progress();
      })
    ]);
  }
}