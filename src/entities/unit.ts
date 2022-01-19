import Sprites from '../enums/sprites';
import Damage from '../enums/damage';

export default abstract class Unit {
  resistances: Set<Damage>;
  weaknesses: Set<Damage>;
  damages: Set<Damage>;
  maxHealth: number;
  sprite: Sprites;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  name: string;

  constructor(sprite: Sprites, name: string, health: number, damage: number, armor: number, speed: number) {
    this.maxHealth = health;
    this.health = health;
    this.sprite = sprite;
    this.damage = damage;
    this.armor = armor;
    this.speed = speed;
    this.name = name;
  }
}