import { Trigger } from '../enums/types';
import Random from '../logic/random';
import Game from '../game';
import Item from './item';

/**
 * This class handles item storage logic for the Hero class.
 */
export default class Basket {
  private items: Item[] = [];

  constructor(public readonly total: number) {}

  // Returns a shallow copy of the items list
  toList(): Item[] {
    return [...this.items];
  }

  // Returns true if there are empty item slots
  get hasSpace(): boolean {
    return this.itemCount < this.total;
  }

  // Returns true if there are items in this basket
  get hasItems(): boolean {
    return this.itemCount > 0;
  }

  // Equips an item
  equip(item: Item): void {
    if (!this.hasSpace) {
      throw new Error(`Item equip overflow`);
    }
    Game.game.history.itemsCollected++;
    this.items.push(item);
  }

  // Unequips an item
  unequip(item: Item): void {
    const index: number = this.items.indexOf(item);
    if (index < 0) {
      throw new Error(`Item equip underflow`);
    }
    this.items.splice(index, 1);
  }

  // Returns true if this basket has the given item
  contains(item: Item): boolean {
    return this.items.indexOf(item) > -1;
  }

  // Returns a random item from this basket
  random(): Item {
    return Random.element(this.items);
  }

  // Replaces item1 with item2
  replace(item1: Item, item2: Item): void {
    this.unequip(item1);
    this.equip(item2);
  }

  // Returns the number of held items
  get itemCount(): number {
    return this.items.length;
  }

  // Triggers item effects
  activate(trigger: Trigger): void {
    for (const item of this.items) {
      item.activate(trigger, undefined, undefined);
    }
  }
}