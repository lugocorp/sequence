import { Trigger, Effect } from '../enums/triggers';
import Sprites from '../enums/sprites';
import Rarity from '../enums/rarity';
import Hero from './hero';

export default class Item {
  values: Record<string, any> = {};
  description: string;
  sprite: Sprites;
  rarity: number;
  bearer: Hero;
  name: string;

  constructor(
    name: string,
    sprite: Sprites,
    rarity: number,
    description: string,
    private effect?: Effect
  ) {
    this.description = description;
    this.sprite = sprite;
    this.rarity = rarity;
    this.name = name;
  }

  activate(trigger: Trigger): void {
    this.effect?.call(this, trigger);
  }

  descriptionText(): string {
    return `${this.name}\n${Rarity.display(this.rarity)}\n${this.description}`;
  }
}
