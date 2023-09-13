import OfferingEvent from './offering';
import Random from '../../logic/random';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';

export default class ButterflyFieldEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.BUTTERFLY_FIELD,
      'your party comes across a butterfly field. choose someone to receive a blessing. you may get copies of their belongings in the future.',
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [ new Action('choose', () => this.finished()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  private finished(): void {
    const hero: Hero = this.heroSelector.item();
    for (const item of hero.basket.toList()) {
      this.game.chain.futureEvent(
        new OfferingEvent(this.game, this.game.data.getNamedItem(item.name)),
        Random.max(10) + 3
      );
    }
    this.setDetails(hero.sprite, `${hero.name} received a blessing from the butterflies.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}
