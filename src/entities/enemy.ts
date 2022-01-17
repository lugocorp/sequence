import Ability from './ability';
import Unit from './unit';

export default class Enemy extends Unit {
  ability: Ability;

  constructor(name: string, health: number, damage: number, armor: number, speed: number) {
    super(name, health, damage, armor, speed);
  }
}