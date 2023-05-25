/*
 * This class has access to all the game data written by developers. As such it
 * provides the Factory class with all the data it needs to instantiate game
 * entities. Use this to get indexed abilities or random game objects.
 */
import { HeroGenerator, heroes, turtle } from '../content/heroes';
import { ItemGenerator, items } from '../content/items';
import Hero from '../entities/hero';
import Item from '../entities/item';
import Random from './random';
import { Rarity } from '../types';
import Game from '../game';

export default class DataManager {
  private itemsByRarity: Record<Rarity, ItemGenerator[]> = Object.create(null);
  private itemsByName: Record<string, ItemGenerator> = Object.create(null);
  private heroesByName: Record<string, HeroGenerator> = Object.create(null);

  constructor(private game: Game) {
    for (const heroFunc of heroes) {
      this.heroesByName[heroFunc(game).name] = heroFunc;
    }
    for (const itemFunc of items) {
      const item: Item = itemFunc();
      this.itemsByName[item.name] = itemFunc;
      if (!this.itemsByRarity[item.rarity]) {
        this.itemsByRarity[item.rarity] = [];
      }
      this.itemsByRarity[item.rarity].push(itemFunc);
    }
  }

  /*
   * Returns a random hero available in the game. Every hero has equal chance
   * to be returned by this function.
   */
  getRandomHero(): Hero {
    return Random.element(heroes)(this.game);
  }

  /*
   * Returns the hero with the given name.
   */
  getNamedHero(name: string): Hero {
    if (name === 'turtle') {
      return turtle(this.game);
    }
    return this.heroesByName[name](this.game);
  }

  /*
   * Returns a random item available in the game. An item's probability to be
   * returned by this function is determined by its rarity.
   */
  getRandomItem(floor = Rarity.COMMON): Item {
    const rarity = Random.weighted(
      (
        [
          [ 2, Rarity.MYTHIC ], // 2
          [ 7, Rarity.LEGENDARY ], // 9
          [ 17, Rarity.RARE ], // 26
          [ 27, Rarity.UNCOMMON ], // 53
          [ 47, Rarity.COMMON ] // 100
        ] as [number, number][]
      ).filter((x: number[]) => x[1] >= floor)
    );
    return Random.element(this.itemsByRarity[rarity])();
  }

  /**
   * Returns an item given by its name
   */
  getNamedItem(name: string): Item {
    return this.itemsByName[name]();
  }
}
