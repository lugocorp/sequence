import Unit from '../entities/unit';
import Random from '../random';

// Handles logic for unit stats in the game
export default class Stats {
  static STRENGTH = 0;
  static WISDOM   = 1;
  static AGILITY  = 2;
  static N = 3;

  // Returns a random stat
  static getRandomStat(): number {
    return Random.max(Stats.N);
  }

  // Returns the stat's display name
  static getStatName(stat: number): string {
    return ['strength', 'wisdom', 'agility'][stat];
  }

  // Returns a unit's value for the given stat
  static getUnitStat(unit: Unit, stat: number): number {
    return [unit.strength, unit.wisdom, unit.agility][stat];
  }

  static changeUnitStat(unit: Unit, stat: number, boost: number): void {
     switch (stat) {
         case Stats.STRENGTH: unit.strength += boost; return;
         case Stats.WISDOM: unit.wisdom += boost; return;
         case Stats.AGILITY: unit.agility += boost; return;
     } 
  }
}