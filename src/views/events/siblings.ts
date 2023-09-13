import Random from '../../logic/random';
import EventView from '../event';
import View from '../view';

export default class IllnessEvent extends EventView {
  getViews(): View[] {
    const hero = Random.element(this.game.party.members);
    return [{
      image: hero.sprite,
      text: `a group of ${hero.name}'s siblings joins your party.`,
      actions: {
        'continue': () => {
          while (!this.game.party.isFull) {
            this.game.party.add(this.game.data.getNamedHero(hero.name));
          }
          this.game.progress();
        }
      }
    }];
  }
}
