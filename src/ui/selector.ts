import Item from '../entities/item';
import Hero from '../entities/hero';
import Action from './action';
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
    this.select(Game.game.getView(), this.item());
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
      view.removeAction('items');
      if (Game.game.party.contains(hero) && hero.itemCount() > 0) {
        view.actions.push(
          new Action('items', () => {
            const oldActions = view.actions;
            const oldSelector = view.selector;
            view.setSelector(Selector.itemSelector(hero.getItems()), [
              new Action('back', () => view.setSelector(oldSelector, oldActions))
            ]);
          })
        );
      }
    });
  }

  // A built-in Item viewing selector
  static itemSelector(data: Item[], select?: (gift: Item) => void): Selector<Item> {
    return new Selector<Item>(data, (view: View, gift: Item): void => {
      view.image = gift.sprite;
      view.setText(`${data.indexOf(gift) + 1}/${data.length} ${gift.descriptionText()}`);
      if (select) {
        select(gift);
      }
    });
  }
}
