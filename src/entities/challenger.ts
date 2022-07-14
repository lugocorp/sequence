import {Trigger} from '../enums/types';
import Sprites from '../enums/sprites';
import Ability from './ability';
import Unit from './unit';

export default class Challenger extends Unit {
  ability: Ability;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, agility: number) {
    super(sprite, name, strength, wisdom, agility);
  }

  // This function handles the challenger's ability effect
  activate(trigger: Trigger, data: any): void {
    if (this.ability) {
      this.ability.effect(trigger, this, data);
    }
  }

  descriptionText(): string {
    const stat = (n: number): string => n > 9 ? `\t${n}\t` : `\t${n}\t\t`;
    return `${this.name}\n` +
      `str:${stat(this.strength)}wis:${stat(this.wisdom)}dex:${stat(this.agility)}`;
  }
}