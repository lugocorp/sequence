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
import Sprites from '../enums/sprites';
import { Rarity } from '../enums/types';
import * as types from './types';
import challengers from '../data/challenger';
import heroes from '../data/hero';
import items from '../data/item';

export default class DataManager {
  itemsByRarityIndex: Map<number, types.ItemData[]> = new Map();
  factory: Factory = new Factory();
  heroes: types.HeroData[];

  // Sets up indices in this object for easy access of game data by reference
  index(): void {
    for (const rarity of Rarity.values()) {
      this.itemsByRarityIndex.set(rarity, []);
    }
    for (const item of items) {
      this.itemsByRarityIndex.get(item.rarity).push(item);
    }
    this.heroes = heroes.filter((h: types.HeroData): boolean => h.sprite !== Sprites.NONE);
  }

  /*
   * Returns a random challenger sprite to represent a spirit.
   */
  getRandomSpirit(): Sprites {
    return this.getRandomChallenger().sprite;
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
    return this.factory.createHero(this, Random.element(this.heroes));
  }

  /*
   * Returns the hero with the given name.
   */
  getNamedHero(name: string): Hero {
    return this.factory.createHero(
      this,
      this.heroes.filter((x: types.HeroData) => x.name === name)[0]
    );
  }

  /*
   * Returns a random item available in the game. An item's probability to be
   * returned by this function is determined by its rarity.
   */
  getRandomItem(): Item {
    const rarity = Random.weighted(
      [
        [2, Rarity.MYTHIC],
        [7, Rarity.LEGENDARY],
        [17, Rarity.RARE],
        [27, Rarity.UNCOMMON],
        [47, Rarity.COMMON]
      ],
      100
    );
    const pool: types.ItemData[] = this.itemsByRarityIndex.get(rarity);
    return this.factory.createItem(Random.element(pool));
  }
}
