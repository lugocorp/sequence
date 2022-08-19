import Sprites from '../enums/sprites';
import Unit from './unit';

export default class Challenger extends Unit {

  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, dexterity: number) {
    super(sprite, name, strength, wisdom, dexterity);
  }

  descriptionText(): string {
    const stat = (n: number): string => n > 9 ? `\t${n}\t` : `\t${n}\t\t`;
    return `${this.name}\n` +
      `str:${stat(this.strength)}wis:${stat(this.wisdom)}dex:${stat(this.dexterity)}`;
  }
}