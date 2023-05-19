import Sprites from '../../media/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class TradingPostEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.TRADE,
      'your party comes across a trading post. choose a party member and they will trade all their items for new ones.',
      [ new Action('continue', () => that.viewParty()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members.filter((h: Hero) => h.basket.hasItems)
    );
  }

  get hero(): Hero {
    return this.heroSelector.item();
  }

  viewParty(): void {
    const that = this;
    if (this.game.party.hasItems()) {
      this.setSelector(this.heroSelector, [ new Action('trade', () => that.trade()) ]);
    } else {
      this.setDetails(Sprites.TRADE, `nobody has any items to trade.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  trade(): void {
    const items: Item[] = this.hero.basket.toList();
    for (let a = 0; a < items.length; a++) {
      this.hero.basket.unequip(items[a]);
      this.hero.basket.equip(this.game.data.getRandomItem());
    }
    this.setDetails(this.hero.sprite, `${this.hero.name} traded all their items for new ones.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}
