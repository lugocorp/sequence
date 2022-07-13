import Sprites from '../enums/sprites';
import Ability from '../entities/ability';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Game from '../game';
import View from './view';

export default class Selector<T> {
  select: (v: View, e: T) => void;
  private data: T[];
  index: number;

  constructor(data: T[], select: (v: View, e: T) => void) {
    this.select = select;
    this.data = data;
    this.index = 0;
  }

  invalidate(): void {
    this.select(Game.game.view, this.item());
  }

  item(): T {
    return this.data[this.index];
  }

  size(): number {
    return this.data.length;
  }

  // A built-in Hero viewing selector
  static heroSelector(data: Hero[], select?: (hero: Hero) => void): Selector<Hero> {
    return new Selector<Hero>(data, (view: View, hero: Hero): void => {
      view.image = hero.sprite;
      view.setText(`${data.indexOf(hero) + 1}/${data.length} ${hero.descriptionText()}`);
      if (select) {
        select(hero);
      }
    });
  }

  // A built-in Item or Ability viewing selector
  static giftSelector(data: (Item | Ability)[], select?: (gift: Item | Ability) => void): Selector<Item | Ability> {
    return new Selector<Item | Ability>(data, (view: View, gift: Item | Ability): void => {
      view.image = Sprites.NONE;
      view.setText(`${data.indexOf(gift) + 1}/${data.length} ${gift.descriptionText()}`);
      if (select) {
        select(gift);
      }
    });
  }
}