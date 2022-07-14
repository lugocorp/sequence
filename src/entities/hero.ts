import {Trigger} from '../enums/types';
import Sprites from '../enums/sprites';
import Ability from './ability';
import Item from './item';
import Unit from './unit';

export default class Hero extends Unit {
  private itemSlots: number;
  private items: Item[];
  ability: Ability;
  luck: number;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, agility: number, itemSlots: number) {
    super(sprite, name, strength, wisdom, agility);
    this.itemSlots = itemSlots;
    this.items = [];
    this.luck = 50;
    for (let a = 0; a < this.itemSlots; a++) {
      this.items.push(undefined);
    }
  }

  // Equips an item to this hero
  equip(item: Item): void {
    // Shift items if the Hero is fully equipped
    if (this.items[this.items.length - 1]) {
      this.items[0].effect(Trigger.UNEQUIP, this, null);
      for (let a = 1; a < this.items.length; a++) {
        this.items[a - 1] = this.items[a];
        this.items[a] = undefined;
      }
    }
    this.items[this.itemCount()] = item;
    item.effect(Trigger.EQUIP, this, null);
  }

  getItem(index: number): Item {
    return this.items[index];
  }

  // Replaces the item at the given index
  replaceItem(index: number, item: Item): void {
    this.items[index].effect(Trigger.UNEQUIP, this, null);
    this.items[index] = item;
    item.effect(Trigger.EQUIP, this, null);
  }

  // Returns the number of equipped items
  itemCount(): number {
    return this.items.reduce((acc: number, x: Item) => acc + (x ? 1 : 0), 0);
  }

  // This function handles the hero's item and ability effects
  activate(trigger: Trigger, data: any): void {
    if (this.ability) {
      this.ability.effect(trigger, this, data);
    }
    for (const item of this.items) {
      item?.effect(trigger, this, data);
    }
  }

  descriptionText(): string {
    const stat = (n: number): string => n > 9 ? `\t${n}\t` : `\t${n}\t\t`;
    return `${this.name}\n` +
      `str:${stat(this.strength)}wis:${stat(this.wisdom)}dex:${stat(this.agility)}` +
      (this.itemSlots ? '\nitems:\n' : '') +
      this.items.map((x: Item) => (x?.name || '---')).join('\n');
  }
}