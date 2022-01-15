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
    createEnemy(data: types.EnemyData): Enemy {
        const enemy: Enemy = new Enemy(data.name, data.health, data.damage, data.armor, data.speed);
        if (data.weaknesses) {
            enemy.weaknesses = new Set(data.weaknesses);
        }
        if (data.resistances) {
            enemy.resistances = new Set(data.resistances);
        }
        if (data.damages) {
            enemy.damages = new Set(data.damages);
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