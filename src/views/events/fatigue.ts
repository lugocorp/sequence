import Hero from '../../entities/hero';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class FatigueEvent extends EventView {
  constructor(game: Game, private hero: Hero) {
    super(game);
  }

  getViews(): View[] {
    return [{
      image: this.hero.sprite,
      text: `${this.hero.name} is too fatigued to move on, and has left your party.`,
      actions: {
        'continue': () => {
          this.game.party.remove(this.hero);
          this.game.progress();
        }
      }
    }];
  }
}
