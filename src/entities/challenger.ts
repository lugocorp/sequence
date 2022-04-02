import Trigger from '../enums/trigger';
import Sprites from '../enums/sprites';
import Ability from './ability';
import Unit from './unit';

export default class Challenger extends Unit {
  ability: Ability;

  constructor(sprite: Sprites, name: string, health: number, strength: number, wisdom: number, agility: number) {
    super(sprite, name, strength, wisdom, agility);
  }

  activate(trigger: Trigger, data: any): void {
    if (this.ability) {
      this.ability.effect(trigger, this, data);
    }
  }
}