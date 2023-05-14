import { Stats, Rarity, Trigger, TriggerType } from '../types';
import Random from '../logic/random';
import Basket from '../entities/basket';
import Hero from '../entities/hero';

export default class EnumsHelper {
  static rarities(): Rarity[] {
    return [ Rarity.COMMON, Rarity.UNCOMMON, Rarity.RARE, Rarity.LEGENDARY, Rarity.MYTHIC ];
  }

  static displayRarity(rarity: Rarity): string {
    return [ 'common', 'uncommon', 'rare', 'legendary', 'mythic' ][rarity];
  }

  // Returns a random stat
  static getRandomStat(): number {
    return Random.max(Stats.DEXTERITY + 1);
  }

  // Returns the stat's display name
  static getStatName(stat: Stats): string {
    return [ 'strength', 'wisdom', 'dexterity' ][stat];
  }

  // Returns a unit's value for the given stat
  static getUnitStat(unit: Hero, stat: Stats): number {
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
  static setUnitStat(unit: Hero, stat: Stats, value: number): void {
    unit[EnumsHelper.getStatName(stat)] = value;
  }

  // Changes a unit's stat by a given value
  static changeUnitStat(unit: Hero, stat: Stats, boost: number): void {
    unit[EnumsHelper.getStatName(stat)] = unit[[ 'strength', 'wisdom', 'dexterity' ][stat]] + boost;
  }
}
