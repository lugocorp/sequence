/*
 * This class takes game data and turns it into an entity that can be used in-game.
 * Use this whenever you need to instantiate a game object.
 */
import DataManager from './manager';
import { Effect } from '../enums/triggers';
import Challenger from '../entities/challenger';
import Hero from '../entities/hero';
import Item from '../entities/item';
import Game from '../game';
import * as types from './types';

export default class Factory {
  // Instantiates a new Hero object based on some game data
  createHero(game: Game, manager: DataManager, data: types.HeroData): Hero {
    return new Hero(
      game,
      data.sprite,
      data.name,
      data.people,
      data.strength,
      data.wisdom,
      data.dexterity,
      data.itemSlots,
      data.description
    );
  }

  // Instantiates a new Challenger object based on some game data
  createChallenger(manager: DataManager, data: types.ChallengerData): Challenger {
    return new Challenger(data.sprite, data.name, data.strength, data.wisdom, data.dexterity);
  }

  // Instantiates a new Item object based on some game data
  createItem(data: types.ItemData, effect: Effect): Item {
    return new Item(data.name, data.sprite, data.rarity, data.description, effect);
  }
}
