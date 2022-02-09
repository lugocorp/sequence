import Sprites from '../enums/sprites';

export default abstract class Unit {
  resistances: Set<number>;
  weaknesses: Set<number>;
  damages: Set<number>;
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