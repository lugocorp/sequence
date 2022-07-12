import {Trigger} from '../enums/types';
import Sprites from '../enums/sprites';

/**
 * This is the base class that both Hero and Enemy
 * get their logic and interface from.
 */
export default abstract class Unit {
  sprite: Sprites;
  strength: number;
  wisdom: number;
  agility: number;
  name: string;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, agility: number) {
    this.sprite = sprite;
    this.strength = strength;
    this.wisdom = wisdom;
    this.agility = agility;
    this.name = name;
  }

  /**
   * This function activates all ability and item effects given a
   * particular trigger.
   */
  abstract activate(trigger: Trigger, data: any): void;
}