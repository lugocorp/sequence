import Sprites from '../../media/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Hero from '../../entities/hero';
import Game from '../../game';

export default class MerchantEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.MERCHANT,
      'your party comes across a merchant. a party member will get new items to fill their inventory.',
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [ new Action('get items', () => this.trade()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  private get hero(): Hero {
    return this.heroSelector.item();
  }

  private trade(): void {
    const n = this.hero.basket.total - this.hero.basket.itemCount;
    for (let a = 0; a < n; a++) {
      this.hero.basket.equip(this.game.data.getRandomItem());
    }
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} got ${n} new item${n === 1 ? '' : 's'} from the merchant.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
