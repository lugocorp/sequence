import Unit from '../entities/unit';

export default class Stats {
  static STRENGTH = 0;
  static WISDOM   = 1;
  static AGILITY  = 2;
  static N = 3;

  static getStatName(stat: number): string {
    return ['strength', 'wisdom', 'agility'][stat];
  }

  static getUnitStat(unit: Unit, stat: number): number {
    return [unit.strength, unit.wisdom, unit.agility][stat];
  }
}