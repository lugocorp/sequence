import { Trigger, TriggerType } from '../types';
import Random from '../logic/random';
import Basket from '../entities/basket';
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
  static getUnitStat(unit: Hero, stat: number): number {
    const key: string = [ 'strength', 'wisdom', 'dexterity' ][stat];
    if (unit['basket']) {
      const basket: Basket = unit['basket'] as Basket;
      const data: Trigger = {
        type: TriggerType.GET_STATS,
        strength: 0,
        wisdom: 0,
        dexterity: 0
      };
      basket.activate(data);
      unit[key] = Math.max(unit[key], Math.min(-data[key], 0));
      return Math.max(0, data[key] + unit[key]);
    }
    return unit[key];
  }

  // Sets a unit's value for the given stat
  static setUnitStat(unit: Hero, stat: number, value: number): void {
    unit[Stats.getStatName(stat)] = value;
  }

  // Returns a unit's original value for a given stat
  static getOriginalStat(unit: Hero, stat: number): number {
    return unit[[ 'originalStrength', 'originalWisdom', 'originalDexterity' ][stat]];
  }

  // Changes a unit's stat by a given value
  static changeUnitStat(unit: Hero, stat: number, boost: number): void {
    unit[Stats.getStatName(stat)] = unit[[ 'strength', 'wisdom', 'dexterity' ][stat]] + boost;
  }
}
