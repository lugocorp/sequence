/*
 * This class has access to all the game data written by developers. As such it
 * provides the Factory class with all the data it needs to instantiate game
 * entities. Use this to get indexed abilities or random game objects.
 */
import { Trigger, TriggerType } from '../enums/triggers';
import Sprites from '../enums/sprites';
import Rarity from '../enums/rarity';
import Random from '../logic/random';
import Factory from './factory';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Item from '../entities/item';
import Game from '../game';
import * as types from './types';
import challengers from '../data/challenger';
import effects from '../data/effects';
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
    this.heroes = heroes.filter((h: types.HeroData): boolean => h.name.length > 0);

    // Check for item effect mismatches
    const itemNames: string[] = items.map((x: Item) => x.name);
    for (const key in effects) {
      if (itemNames.indexOf(key) < 0) {
        throw new Error(`Item ${key} does not exist.`);
      }
    }
    for (const item of itemNames) {
      if (!effects[item]) {
        console.warn(`Unimplemented item '${item}'`);
      }
    }
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
    const data: Trigger = {
      type: TriggerType.GET_RARITY,
      floor: Rarity.COMMON
    };
    for (const hero of Game.game.party.members) {
      hero.basket.activate(data);
    }

    const rarity = Random.weighted(
      (
        [
          [ 2, Rarity.MYTHIC ], // 2
          [ 7, Rarity.LEGENDARY ], // 9
          [ 17, Rarity.RARE ], // 26
          [ 27, Rarity.UNCOMMON ], // 53
          [ 47, Rarity.COMMON ] // 100
        ] as [number, number][]
      ).filter((x: number[]) => x[1] >= data.floor)
    );
    const item: Item = Random.element(this.itemsByRarityIndex.get(rarity));
    return this.factory.createItem(item, effects[item.name]);
  }
}
