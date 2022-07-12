/*
 * This class has access to all the game data written by developers. As such it
 * provides the Factory class with all the data it needs to instantiate game
 * entities. Use this to get indexed abilities or random game objects.
 */
import Random from '../random';
import Factory from './factory';
import Challenger from '../entities/challenger';
import Ability from '../entities/ability';
import Hero from '../entities/hero';
import Item from '../entities/item';
import {Rarity} from '../enums/types';
import * as types from './types';
import challengers from '../data/challenger';
import abilities from '../data/ability';
import heroes from '../data/hero';
import items from '../data/item';

export default class DataManager {
  abilitiesByNameIndex: Map<string, types.AbilityData> = new Map();
  itemsByRarityIndex: Map<number, types.ItemData[]> = new Map();
  factory: Factory = new Factory();

  // Sets up indices in this object for easy access of game data by reference
  index(): void {
    for (const rarity of Rarity.values()) {
      this.itemsByRarityIndex.set(rarity, []);
    }
    for (const ability of abilities) {
      this.abilitiesByNameIndex.set(ability.name, ability);
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

  /*
   * Returns a random ability available in the game. Every ability has equal
   * chance to be returned by this function.
   */
  getRandomAbility(): Ability {
    return this.factory.createAbility(Random.randomElement(abilities));
  }

  /*
   * Returns a random challenger available in the game. Every challenger has
   * equal chance to be returned by this function.
   */
  getRandomChallenger(): Challenger {
    return this.factory.createChallenger(this, Random.randomElement(challengers));
  }

  /*
   * Returns a random hero available in the game. Every hero has equal chance
   * to be returned by this function.
   */
  getRandomHero(): Hero {
    return this.factory.createHero(this, Random.randomElement(heroes));
  }

  /*
   * Returns a random item available in the game. An item's probability to be
   * returned by this function is determined by its rarity.
   */
  getRandomItem(): Item {
    const rarity = Random.weightedList([
      [1, Rarity.MYTHIC],
      [2, Rarity.LEGENDARY],
      [4, Rarity.RARE],
      [8, Rarity.UNCOMMON],
      [16, Rarity.COMMON]
    ]);
    const pool: types.ItemData[] = this.itemsByRarityIndex.get(rarity);
    return this.factory.createItem(Random.randomElement(pool));
  }
}