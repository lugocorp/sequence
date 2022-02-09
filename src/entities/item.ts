import ItemType from '../enums/item-type';
import {ItemEffect} from '../effects';

export default class Item {
  description: string;
  effect: ItemEffect;
  rarity: number;
  type: ItemType;
  name: string;

  constructor(name: string, type: ItemType, rarity: number, description: string, effect: ItemEffect) {
    this.description = description;
    this.effect = effect;
    this.rarity = rarity;
    this.name = name;
    this.type = type;
  }
}