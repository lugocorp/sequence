import Sprites from '../enums/sprites';

/**
 * This is the base class that both Hero and Enemy
 * get their logic and interface from.
 */
export default abstract class Unit {
  private strength: number;
  private wisdom: number;
  private dexterity: number;
  sprite: Sprites;
  name: string;

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, dexterity: number) {
    this.sprite = sprite;
    this.strength = strength;
    this.wisdom = wisdom;
    this.dexterity = dexterity;
    this.name = name;
  }
}
