import { Stats, Rarity, Skill, Skills } from '../types';
import Random from '../logic/random';

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

  static skills(): Skill[] {
    return [ Skill.PROWESS, Skill.ENDURANCE, Skill.STEALTH, Skill.DIPLOMACY ];
  }

  static hasSkill(skills: Skills, skill: Skill): boolean {
    return skills[0] === skill || skills[1] === skill;
  }
}
