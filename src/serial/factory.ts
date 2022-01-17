/*
 * This class takes game data and turns it into an entity that can be used in-game.
 * Use this whenever you need to instantiate a game object.
 */
import Ability from '../entities/ability';
import Enemy from '../entities/enemy';
import Hero from '../entities/hero';
import Item from '../entities/item';
import * as types from './types';

export default class Factory {

  // Instantiates a new Hero object based on some game data
  createHero(data: types.HeroData): Hero {
    const hero: Hero = new Hero(data.name, data.health, data.damage, data.armor, data.speed, data.itemSlots, data.abilitySlots);
    if (data.weaknesses) {
      hero.weaknesses = new Set(data.weaknesses);
    }
    if (data.resistances) {
      hero.resistances = new Set(data.resistances);
    }
    if (data.damages) {
      hero.damages = new Set(data.damages);
    }
    return hero;
  }

  // Instantiates a new Enemy object based on some game data
  createEnemy(data: types.EnemyData, getAbilityByName: (string) => Ability): Enemy {
    if(data.name.length > 14) {
      throw new Error(`Name for enemy '${data.name}' cannot be over length 14`);
    }
    if (data.damage > 99 || data.health > 99 || data.armor > 99) {
      throw new Error(`Damage, health and armor cannot be over 99 for enemy '${data.name}'`);
    }
    if ([1, 2, 3].indexOf(data.speed) < 0) {
      throw new Error(`Invalid speed '${data.speed}' for enemy '${data.name}'`);
    }
    const enemy: Enemy = new Enemy(data.name, data.health, data.damage, data.armor, data.speed);
    enemy.weaknesses = data.weaknesses ? new Set(data.weaknesses) : new Set();
    enemy.resistances = data.resistances ? new Set(data.resistances) : new Set();
    enemy.damages = data.damages ? new Set(data.damages) : new Set();
    if (data.ability) {
      enemy.ability = getAbilityByName(data.ability);
    }
    return enemy;
  }

  // Instantiates a new Item object based on some game data
  createItem(data: types.ItemData): Item {
    const item: Item = new Item(data.name, data.type, data.rarity);
    return item;
  }

  // Instantiates a new Ability object based on some game data
  createAbility(data: types.AbilityData): Ability {
    const ability: Ability = new Ability(data.name, data.type);
    return ability;
  }
}