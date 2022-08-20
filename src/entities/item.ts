import Effect from '../enums/effects';
import { Trigger } from '../enums/types';
import Sprites from '../enums/sprites';
import Hero from './hero';

export default class Item {
  description: string;
  sprite: Sprites;
  effect: Effect;
  rarity: number;
  name: string;

  constructor(name: string,rarity: number, description: string, effect?: Effect) {
    this.sprite = Sprites.CORN;
    this.description = description;
    this.effect = effect || ((trigger: Trigger, hero: Hero, data: any): void => undefined);
    this.rarity = rarity;
    this.name = name;
  }

  descriptionText(): string {
    return `${this.name}\n${this.description}`;
  }
}