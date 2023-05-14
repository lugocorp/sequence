import { Trigger, Effect } from '../types';
import EnumsHelper from '../logic/enums';
import Sprites from '../media/sprites';
import Game from '../game';
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

  activate(game: Game, trigger: Trigger): void {
    this.effect?.call(this, game, trigger);
  }

  descriptionText(): string {
    return `${this.name}\n${EnumsHelper.displayRarity(this.rarity)}\n${this.description}`;
  }
}
