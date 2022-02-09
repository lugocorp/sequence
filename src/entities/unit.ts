import Trigger from '../enums/trigger';
import Sprites from '../enums/sprites';

/**
 * This is the base class that both Hero and Enemy
 * get their logic and interface from.
 */
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

  /**
   * This function activates all ability and item effects given a
   * particular trigger.
   */
  abstract activate(trigger: Trigger, data: any): void;
}