import {ItemEffect} from '../enums/effects';
import { Trigger } from '../enums/types';
import Hero from './hero';
import Unit from './unit';

export default class Item {
  description: string;
  effect: ItemEffect;
  rarity: number;
  name: string;

  constructor(name: string,rarity: number, description: string, effect?: ItemEffect) {
    this.description = description;
    this.effect = effect || ((trigger: Trigger, hero: Hero, data: any): void => {});
    this.rarity = rarity;
    this.name = name;
  }

  descriptionText(): string {
    return `${this.name}\n${this.description}`;
  }
}