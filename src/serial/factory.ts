/*
 * This class takes game data and turns it into an entity that can be used in-game.
 * Use this whenever you need to instantiate a game object.
 */
import DataManager from './manager';
import Challenger from '../entities/challenger';
import Ability from '../entities/ability';
import Hero from '../entities/hero';
import Item from '../entities/item';
import * as types from './types';

export default class Factory {

  // Instantiates a new Hero object based on some game data
  createHero(manager: DataManager, data: types.HeroData): Hero {
    const hero: Hero = new Hero(data.sprite, data.name, data.strength, data.wisdom, data.dexterity, data.itemSlots);
    if (data.ability) {
      hero.ability = manager.getAbilityByName(data.ability);
    }
    return hero;
  }

  // Instantiates a new Challenger object based on some game data
  createChallenger(manager: DataManager, data: types.ChallengerData): Challenger {
    const challenger: Challenger = new Challenger(data.sprite, data.name, data.strength, data.wisdom, data.dexterity);
    if (data.ability) {
      challenger.ability = manager.getAbilityByName(data.ability);
    }
    return challenger;
  }

  // Instantiates a new Item object based on some game data
  createItem(data: types.ItemData): Item {
    return new Item(data.name, data.rarity, data.description, data.effect);
  }

  // Instantiates a new Ability object based on some game data
  createAbility(data: types.AbilityData): Ability {
    return new Ability(data.name, data.description, data.effect);
  }
}