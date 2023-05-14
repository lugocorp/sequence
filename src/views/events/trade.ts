import Sprites from '../../enums/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class TradeEvent extends EventView {
  static label = 'trade';
  private heroSelector: Selector<Hero>;
  private itemSelector: Selector<Item>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.itemSelector = Selector.itemSelector([
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem(),
      this.game.data.getRandomItem()
    ]);
    this.setDetails(
      Sprites.TRADE,
      'your party comes across a trading post. choose a party member and they will trade a random item for a new one.',
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

  get item(): Item {
    return this.itemSelector.item();
  }

  viewParty(): void {
    const that = this;
    if (this.game.party.hasItems()) {
      this.setSelector(this.heroSelector, [
        new Action('view goods', () => that.trade()),
        new Action('make trade', () => that.checkTrade())
      ]);
    } else {
      this.setDetails(Sprites.TRADE, `no one in your party has items to trade.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  trade(): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('view party', () => that.viewParty()),
      new Action('make trade', () => that.checkTrade())
    ]);
  }

  checkTrade(): void {
    if (this.hero.basket.hasItems) {
      this.finish();
    } else {
      this.invalidTrade();
    }
  }

  invalidTrade(): void {
    const that = this;
    this.setDetails(this.hero.sprite, `${this.hero.name} has no items to trade.`, [
      new Action('continue', () => that.viewParty())
    ]);
  }

  finish(): void {
    const replaced: Item = this.hero.basket.random();
    this.hero.basket.replace(replaced, this.item);
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} traded ${replaced.name} for ${this.item.name}.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
