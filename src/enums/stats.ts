import Random from '../logic/random';
import Unit from '../entities/unit';
import Hero from '../entities/hero';

// Handles logic for unit stats in the game
export default class Stats {
  static STRENGTH = 0;
  static WISDOM = 1;
  static DEXTERITY = 2;
  static N = 3;

  // Returns a random stat
  static getRandomStat(): number {
    return Random.max(Stats.N);
  }

  // Returns the stat's display name
  static getStatName(stat: number): string {
    return [ 'strength', 'wisdom', 'dexterity' ][stat];
  }

  // Returns a unit's value for the given stat
  static getUnitStat(unit: Unit, stat: number): number {
    return unit[[ 'strength', 'wisdom', 'dexterity' ][stat]];
  }

  // Sets a unit's value for the given stat
  static setUnitStat(unit: Unit, stat: number, value: number): void {
    unit[Stats.getStatName(stat)] = value;
  }

  // Returns a unit's original value for a given stat
  static getOriginalStat(unit: Hero, stat: number): number {
    return unit[[ 'originalStrength', 'originalWisdom', 'originalDexterity' ][stat]];
  }

  // Changes a unit's stat by a given value
  static changeUnitStat(unit: Unit, stat: number, boost: number): void {
    unit[Stats.getStatName(stat)] = Math.max(0, Stats.getUnitStat(unit, stat) + boost);
  }
}
