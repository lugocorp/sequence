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
    super(TradeEvent);
    const that = this;
    this.itemSelector = Selector.itemSelector([
      game.data.getRandomItem(),
      game.data.getRandomItem(),
      game.data.getRandomItem(),
      game.data.getRandomItem(),
      game.data.getRandomItem()
    ]);
    this.setDetails(
      Sprites.TRADE,
      'your party comes across a trading post. choose a party member and they will trade a random item for a new one.',
      [ new Action('continue', () => that.viewParty(game)) ]
    );
  }

  init(game: Game): void {
    this.heroSelector = Selector.heroSelector(
      game.party,
      game.party.members.filter((h: Hero) => h.basket.hasItems)
    );
  }

  get hero(): Hero {
    return this.heroSelector.item();
  }

  get item(): Item {
    return this.itemSelector.item();
  }

  viewParty(game: Game): void {
    const that = this;
    if (game.party.hasItems()) {
      this.setSelector(this.heroSelector, [
        new Action('view goods', () => that.trade(game)),
        new Action('make trade', () => that.checkTrade(game))
      ]);
    } else {
      this.setDetails(Sprites.TRADE, `no one in your party has items to trade.`, [
        new Action('continue', () => game.progress())
      ]);
    }
  }

  trade(game: Game): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('view party', () => that.viewParty(game)),
      new Action('make trade', () => that.checkTrade(game))
    ]);
  }

  checkTrade(game: Game): void {
    if (this.hero.basket.hasItems) {
      this.finish(game);
    } else {
      this.invalidTrade(game);
    }
  }

  invalidTrade(game: Game): void {
    const that = this;
    this.setDetails(this.hero.sprite, `${this.hero.name} has no items to trade.`, [
      new Action('continue', () => that.viewParty(game))
    ]);
  }

  finish(game: Game): void {
    const replaced: Item = this.hero.basket.random();
    this.hero.basket.replace(game.history, replaced, this.item);
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} traded ${replaced.name} for ${this.item.name}.`,
      [ new Action('continue', () => game.progress()) ]
    );
  }
}
