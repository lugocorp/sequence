import Effect from '../enums/effects';
import { Trigger } from '../enums/types';
import Sprites from '../enums/sprites';
import Rarity from '../enums/rarity';
import Hero from './hero';

export default class Item {
  private effect: Effect;
  description: string;
  sprite: Sprites;
  rarity: number;
  name: string;

  constructor(name: string, sprite: Sprites, rarity: number, description: string, effect?: Effect) {
    this.description = description;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.effect = effect || ((trigger: Trigger, hero: Hero, data: any): void => undefined);
    this.sprite = sprite;
    this.rarity = rarity;
    this.name = name;
  }

  activate(trigger: Trigger, hero: Hero, data: any): void {
    this.effect.call(this, trigger, hero, data);
  }

  descriptionText(): string {
    return `${this.name}\n${Rarity.display(this.rarity)}\n${this.description}`;
  }
}
