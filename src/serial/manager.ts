/*
 * This class has access to all the game data written by developers. As such it
 * provides the Factory class with all the data it needs to instantiate game
 * entities. Use this to get indexed abilities or random game objects.
 */
import AbilityType from '../enums/ability-type';
import Rarity from '../enums/rarity';
import Factory from './factory';
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
import Hero from '../entities/hero';
import Item from '../entities/item';
import * as types from './types';
import abilities from '../data/ability';
import enemies from '../data/enemy';
import heroes from '../data/hero';
import items from '../data/item';

export default class DataManager {
  abilitiesByTypeIndex: Map<AbilityType, types.AbilityData[]> = new Map();
  abilitiesByNameIndex: Map<string, types.AbilityData> = new Map();
  itemsByRarityIndex: Map<Rarity, types.ItemData[]> = new Map();
  factory: Factory = new Factory();

  // Sets up indices in this object for easy access of game data by reference
  index(): void {
    for (const key of Object.keys(AbilityType)) {
      this.abilitiesByTypeIndex.set(AbilityType[key], []);
    }
    for (const key of Object.keys(Rarity)) {
      this.itemsByRarityIndex.set(Rarity[key], []);
    }
    for (const ability of abilities) {
      this.abilitiesByNameIndex.set(ability.name, ability);
      this.abilitiesByTypeIndex.get(ability.type).push(ability);
    }
    for (const item of items) {
      this.itemsByRarityIndex.get(item.rarity).push(item);
    }
  }

  // Returns an ability by its name
  getAbilityByName(name: string): Ability {
    const ability: types.AbilityData = this.abilitiesByNameIndex.get(name);
    if (!ability) {
      throw new Error(`Could not find ability called '${name}'`);
    }
    return this.factory.createAbility(ability);
  }

  // Returns a random number in the range [0, max)
  random(max): number {
    return Math.floor(Math.random() * max);
  }

  /*
   * Returns a random enemy available in the game. Every enemy has equal chance
   * to be returned by this function.
   */
  getRandomEnemy(): Enemy {
    return this.factory.createEnemy(enemies[this.random(enemies.length)], this.getAbilityByName);
  }

  /*
   * Returns a random hero available in the game. Every hero has equal chance
   * to be returned by this function.
   */
  getRandomHero(): Hero {
    return this.factory.createHero(heroes[this.random(heroes.length)]);
  }

  /*
   * Returns a random item available in the game. An item's probability to be
   * returned by this function is determined by its rarity.
   */
  getRandomItem(): Item {
    const roll: number = this.random(31);
    let rarity: Rarity = Rarity.COMMON;
    if (roll === 0) {
      rarity = Rarity.MYTHIC;
    } else if (roll < 3) {
      rarity = Rarity.LEGENDARY;
    } else if (roll < 7) {
      rarity = Rarity.RARE;
    } else if (roll < 15) {
      rarity = Rarity.UNCOMMON;
    }
    const pool: types.ItemData[] = this.itemsByRarityIndex.get(rarity);
    return this.factory.createItem(pool[this.random(pool.length)]);
  }
}