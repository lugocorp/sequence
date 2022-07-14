import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class TradeEvent extends View {
  private heroSelector: Selector<Hero>;
  private itemSelector: Selector<Item>;

  constructor() {
    super();
    const that = this;
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.itemSelector = Selector.itemSelector([
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem(),
      Game.game.data.getRandomItem()
    ]);
    const able: boolean = Game.game.party.members.reduce((acc: number, x: Hero) => (x.itemCount() > 0 ? 1 : 0) + acc, 0) > 0;
    if (able) {
      this.setDetails(Sprites.TRADE, 'your party comes across a trading post.', [
        new Action('continue', () => that.viewParty())
      ]);
    } else {
      this.setDetails(Sprites.TRADE, 'your party comes across a trading post. none of them have any items to trade.', [
        new Action('continue', () => Game.game.progress())
      ]);
    }
  }

  get hero(): Hero {
    return this.heroSelector.item();
  }

  get item(): Item {
    return this.itemSelector.item();
  }

  viewParty(): void {
    const that = this;
    this.setSelector(this.heroSelector, [
      new Action('view goods', () => that.trade()),
      new Action('make trade', () => that.checkTrade())
    ]);
  }

  trade(): void {
    const that = this;
    this.setSelector(this.itemSelector, [
      new Action('view party', () => that.viewParty()),
      new Action('make trade', () => that.checkTrade())
    ]);
  }

  checkTrade(): void {
    if (this.hero.itemCount() > 0) {
      this.finish();
    } else {
      this.invalidTrade();
    }
  }

  invalidTrade(): void {
    const that = this;
    this.setDetails(this.hero.sprite, `${this.hero.name} has no items to trade`, [
      new Action('continue', () => that.viewParty())
    ]);
  }

  finish(): void {
    const index: number = Random.max(this.hero.itemCount());
    const replaced: Item = this.hero.getItem(index);
    this.hero.replaceItem(index, this.item);
    this.setDetails(this.hero.sprite, `${this.hero.name} traded ${replaced.name} for ${this.item.name}`, [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}