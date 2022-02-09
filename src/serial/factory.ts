/*
 * This class takes game data and turns it into an entity that can be used in-game.
 * Use this whenever you need to instantiate a game object.
 */
import DataManager from './manager';
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
import Hero from '../entities/hero';
import Item from '../entities/item';
import * as types from './types';

export default class Factory {

  // Instantiates a new Hero object based on some game data
  createHero(manager: DataManager, data: types.HeroData): Hero {
    const hero: Hero = new Hero(data.sprite, data.name, data.health, data.damage, data.armor, data.speed, data.itemSlots, data.abilitySlots);
    hero.weaknesses = data.weaknesses ? new Set(data.weaknesses) : new Set();
    hero.resistances = data.resistances ? new Set(data.resistances) : new Set();
    hero.damages = data.damages ? new Set(data.damages) : new Set();
    if (data.ability1) {
      hero.ability1 = manager.getAbilityByName(data.ability1);
    }
    if (data.ability2) {
      hero.ability2 = manager.getAbilityByName(data.ability2);
    }
    return hero;
  }

  // Instantiates a new Enemy object based on some game data
  createEnemy(manager: DataManager, data: types.EnemyData): Enemy {
    const enemy: Enemy = new Enemy(data.sprite, data.name, data.health, data.damage, data.armor, data.speed);
    enemy.weaknesses = data.weaknesses ? new Set(data.weaknesses) : new Set();
    enemy.resistances = data.resistances ? new Set(data.resistances) : new Set();
    enemy.damages = data.damages ? new Set(data.damages) : new Set();
    if (data.ability) {
      enemy.ability = manager.getAbilityByName(data.ability);
    }
    return enemy;
  }

  // Instantiates a new Item object based on some game data
  createItem(data: types.ItemData): Item {
    return new Item(data.name, data.type, data.rarity, data.description, data.effect);
  }

  // Instantiates a new Ability object based on some game data
  createAbility(data: types.AbilityData): Ability {
    return new Ability(data.name, data.type, data.description, data.effect);
  }
}