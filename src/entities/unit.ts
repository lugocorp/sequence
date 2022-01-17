import Element from '../enums/element';

export default abstract class Unit {
  resistances: Set<Element>;
  weaknesses: Set<Element>;
  damages: Set<Element>;
  maxHealth: number;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  name: string;

  constructor(name: string, health: number, damage: number, armor: number, speed: number) {
    this.maxHealth = health;
    this.health = health;
    this.damage = damage;
    this.armor = armor;
    this.speed = speed;
    this.name = name;
  }
}