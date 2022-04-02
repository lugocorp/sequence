import Trigger from '../enums/trigger';
import Sprites from '../enums/sprites';
import Ability from './ability';
import Item from './item';
import Unit from './unit';

export default class Hero extends Unit {
  ability1: Ability;
  ability2: Ability;
  itemSlots: number;
  item1: Item;
  item2: Item;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, agility: number, itemSlots: number) {
    super(sprite, name, strength, wisdom, agility);
    this.itemSlots = itemSlots;
  }

  // Returns true if this hero has space for another item
  canReceiveItem(): boolean {
    return (this.itemSlots === 1 && !this.item1) ||
      (this.itemSlots === 2 && !this.item2);
  }

  // Equips an item to this hero
  equip(item: Item): void {
    if (this.item1) {
      this.item2 = item;
    } else {
      this.item1 = item;
    }
  }

  activate(trigger: Trigger, data: any): void {
    if (this.ability1) {
      this.ability1.effect(trigger, this, data);
    }
    if (this.ability2) {
      this.ability2.effect(trigger, this, data);
    }
    if (this.item1) {
      this.item1.effect(trigger, this, data);
    }
    if (this.item2) {
      this.item2.effect(trigger, this, data);
    }
  }
}