import Unit from '../entities/unit';
import Random from '../logic/random';

// Handles logic for unit stats in the game
export default class Stats {
  static STRENGTH  = 0;
  static WISDOM    = 1;
  static DEXTERITY = 2;
  static N = 3;

  // Returns a random stat
  static getRandomStat(): number {
    return Random.max(Stats.N);
  }

  // Returns the stat's display name
  static getStatName(stat: number): string {
    return ['strength', 'wisdom', 'dexterity'][stat];
  }

  // Returns a unit's value for the given stat
  static getUnitStat(unit: Unit, stat: number): number {
    return [unit.strength, unit.wisdom, unit.dexterity][stat];
  }

  static changeUnitStat(unit: Unit, stat: number, boost: number): void {
    unit[Stats.getStatName(stat)] = Math.max(0, Stats.getUnitStat(unit, stat) + boost);
  }
}