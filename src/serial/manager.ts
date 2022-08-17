/*
 * This class has access to all the game data written by developers. As such it
 * provides the Factory class with all the data it needs to instantiate game
 * entities. Use this to get indexed abilities or random game objects.
 */
import Random from '../logic/random';
import Factory from './factory';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Item from '../entities/item';
import {Rarity} from '../enums/types';
import * as types from './types';
import challengers from '../data/challenger';
import heroes from '../data/hero';
import items from '../data/item';

export default class DataManager {
  itemsByRarityIndex: Map<number, types.ItemData[]> = new Map();
  factory: Factory = new Factory();

  // Sets up indices in this object for easy access of game data by reference
  index(): void {
    for (const rarity of Rarity.values()) {
      this.itemsByRarityIndex.set(rarity, []);
    }
    for (const item of items) {
      this.itemsByRarityIndex.get(item.rarity).push(item);
    }
  }

  /*
   * Returns a random challenger available in the game. Every challenger has
   * equal chance to be returned by this function.
   */
  getRandomChallenger(): Challenger {
    return this.factory.createChallenger(this, Random.element(challengers));
  }

  /*
   * Returns a random hero available in the game. Every hero has equal chance
   * to be returned by this function.
   */
  getRandomHero(): Hero {
    return this.factory.createHero(this, Random.element(heroes));
  }

  /*
   * Returns a random item available in the game. An item's probability to be
   * returned by this function is determined by its rarity.
   */
  getRandomItem(): Item {
    const rarity = Random.weighted([
      [1, Rarity.MYTHIC],
      [2, Rarity.LEGENDARY],
      [4, Rarity.RARE],
      [8, Rarity.UNCOMMON],
      [16, Rarity.COMMON]
    ]);
    const pool: types.ItemData[] = this.itemsByRarityIndex.get(rarity);
    return this.factory.createItem(Random.element(pool));
  }
}