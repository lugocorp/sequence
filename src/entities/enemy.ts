import Sprites from '../enums/sprites';
import Ability from './ability';
import Unit from './unit';

export default class Enemy extends Unit {
  ability: Ability;

  constructor(sprite: Sprites, name: string, health: number, damage: number, armor: number, speed: number) {
    super(sprite, name, health, damage, armor, speed);
  }
}