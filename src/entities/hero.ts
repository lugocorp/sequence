import Trigger from '../enums/trigger';
import Sprites from '../enums/sprites';
import Ability from './ability';
import Item from './item';
import Unit from './unit';

export default class Hero extends Unit {
  ability1: Ability;
  ability2: Ability;
  itemSlots: number;
  luck: number;
  item1: Item;
  item2: Item;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, agility: number, itemSlots: number) {
    super(sprite, name, strength, wisdom, agility);
    this.itemSlots = itemSlots;
    this.luck = 50;
  }

  // Equips an item to this hero
  equip(item: Item): void {
    if (this.item1) {
      if (this.item2) {
        this.item1.effect(Trigger.UNEQUIP, this, null);
        this.item1 = this.item2;
      }
      this.item2 = item;
      this.item2.effect(Trigger.EQUIP, this, null);
    } else {
      this.item1 = item;
      this.item1.effect(Trigger.EQUIP, this, null);
    }
  }

  // Applies an ability or item to this hero
  receive(gift: Item | Ability): void {
    if (gift instanceof Item) {
      this.equip(gift);
    } else {
      this.ability2 = gift;
    }
  }

  // This function handles the hero's item and ability effects
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