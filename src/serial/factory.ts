/*
 * This class takes game data and turns it into an entity that can be used in-game.
 * Use this whenever you need to instantiate a game object.
 */
import DataManager from './manager';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Item from '../entities/item';
import * as types from './types';

export default class Factory {

  // Instantiates a new Hero object based on some game data
  createHero(manager: DataManager, data: types.HeroData): Hero {
    return new Hero(data.sprite, data.name, data.people, data.strength, data.wisdom, data.dexterity, data.itemSlots);
  }

  // Instantiates a new Challenger object based on some game data
  createChallenger(manager: DataManager, data: types.ChallengerData): Challenger {
    return new Challenger(data.sprite, data.name, data.strength, data.wisdom, data.dexterity);
  }

  // Instantiates a new Item object based on some game data
  createItem(data: types.ItemData): Item {
    return new Item(data.name, data.rarity, data.description, data.effect);
  }
}