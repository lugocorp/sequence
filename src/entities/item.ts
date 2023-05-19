import { Trigger, Effect } from '../types';
import EnumsHelper from '../logic/enums';
import Sprites from '../media/sprites';
import Game from '../game';
import Hero from './hero';

export default class Item {
  bearer: Hero;

  constructor(
    public name: string,
    public sprite: Sprites,
    public rarity: number,
    public description: string,
    public effect?: Effect
  ) {}

  descriptionText(): string {
    return `${this.name}\n${EnumsHelper.displayRarity(this.rarity)}\n${this.description}`;
  }
}
