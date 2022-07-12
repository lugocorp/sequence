import {ItemEffect} from '../enums/effects';

export default class Item {
  description: string;
  effect: ItemEffect;
  rarity: number;
  name: string;

  constructor(name: string,rarity: number, description: string, effect: ItemEffect) {
    this.description = description;
    this.effect = effect;
    this.rarity = rarity;
    this.name = name;
  }
}