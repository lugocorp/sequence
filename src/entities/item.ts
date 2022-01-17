import ItemType from '../enums/item-type';
import Trigger from '../enums/trigger';
import Rarity from '../enums/rarity';

export default class Item {
  effect: () => void;
  trigger: Trigger;
  rarity: Rarity;
  type: ItemType;
  name: string;

  constructor(name: string, type: ItemType, rarity: Rarity) {
    this.rarity = rarity;
    this.name = name;
    this.type = type;
  }

  register(trigger: Trigger, effect: () => void): void {
    this.trigger = trigger;
    this.effect = effect;
  }
}