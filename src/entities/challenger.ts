import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Unit from './unit';

export default class Challenger extends Unit {
  constructor(sprite: Sprites, name: string, strength: number, wisdom: number, dexterity: number) {
    super(sprite, name, strength, wisdom, dexterity);
  }

  descriptionText(): string {
    const stat = (n: number): string => (n > 9 ? `\t${n}\t` : `\t${n}\t\t`);
    const str: number = Stats.getUnitStat(this, Stats.STRENGTH);
    const wis: number = Stats.getUnitStat(this, Stats.WISDOM);
    const dex: number = Stats.getUnitStat(this, Stats.DEXTERITY);
    return `${this.name}\nstr:${stat(str)}wis:${stat(wis)}dex:${stat(dex)}`;
  }
}
