import OfferingEvent from './offering';
import Random from '../../logic/random';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class ButterflyFieldEvent extends EventView {
  getViews(): View[] {
    return [{
      image: Sprites.BUTTERFLY_FIELD,
      text: 'your party comes across a butterfly field. choose someone to receive a blessing. you may get copies of their belongings in the future.',
      actions: {
        'continue': () =>
          this.game.views.setViews(Selectors.heroes(this.game.party.members, (hero: Hero) => ({
            'choose': () => this.finished(hero)
          })))
      }
    }];
  }

  private finished(hero: Hero): void {
    for (const item of hero.basket.toList()) {
      this.game.chain.futureEvent(
        new OfferingEvent(this.game, this.game.data.getNamedItem(item.name)),
        Random.max(10) + 3
      );
    }
    this.game.views.setViews([{image: hero.sprite, text: `${hero.name} received a blessing from the butterflies.`, actions: {
      'continue': () => this.game.progress()
    }}]);
  }
}
