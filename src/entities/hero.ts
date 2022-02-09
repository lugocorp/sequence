import ItemType from '../enums/item-type';
import Trigger from '../enums/trigger';
import Sprites from '../enums/sprites';
import Slots from '../enums/slots';
import Ability from './ability';
import Item from './item';
import Unit from './unit';

export default class Hero extends Unit {
  abilitySlots: Slots;
  ability1: Ability;
  ability2: Ability;
  itemSlots: Slots;
  item1: Item;
  item2: Item;

  constructor(sprite: Sprites, name: string, health: number, damage: number, armor: number, speed: number, itemSlots: Slots, abilitySlots: Slots) {
    super(sprite, name, health, damage, armor, speed);
    this.abilitySlots = abilitySlots;
    this.itemSlots = itemSlots;
  }

  // Returns true if this hero has space for another item
  canUseItem(item: Item): boolean {
    if (item.type === ItemType.CONSUME) {
      return true;
    }
    return (this.itemSlots === Slots.ONE && !this.item1) ||
      (this.itemSlots === Slots.TWO && !this.item2);
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