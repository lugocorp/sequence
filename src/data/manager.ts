import AbilityType from '../enums/ability-type';
import Rarity from '../enums/rarity';
import abilities from './ability';
import enemies from './enemy';
import heroes from './hero';
import items from './item';

export default class DataManager {
    abilitiesByTypeIndex: Map<AbilityType, object[]> = new Map();
    abilitiesByNameIndex: Map<string, object> = new Map();
    itemsByRarityIndex: Map<Rarity, object[]> = new Map();

    // Sets up indices in this object for easy access of game data by reference
    index(): void {
        for (const key of Object.keys(AbilityType)) {
            this.abilitiesByTypeIndex.set(AbilityType[key], []);
        }
        for (const key of Object.keys(Rarity)) {
            this.itemsByRarityIndex.set(Rarity[key], []);
        }
        for (const ability of abilities) {
            this.abilitiesByNameIndex.set(ability.name, ability);
            this.abilitiesByTypeIndex.get(ability.type).push(ability);
        }
        for (const item of items) {
            this.itemsByRarityIndex.get(item.rarity).push(item);
        }
    }

    // Returns a random number in the range [0, max)
    random(max): number {
        return Math.floor(Math.random() * max);
    }

    // Returns a random enemy available in the game. Every enemy has equal chance
    // to be returned by this function.
    randomEnemy(): object {
        return enemies[this.random(enemies.length)];
    }

    // Returns a random hero available in the game. Every hero has equal chance
    // to be returned by this function.
    randomHero(): object {
        return heroes[this.random(heroes.length)];
    }

    // Returns a random item available in the game. An item's probability to be
    // returned by this function is determined by its rarity.
    randomItem(): object {
        const roll: number = this.random(31);
        let rarity: Rarity = Rarity.COMMON;
        if (roll === 0) {
            rarity = Rarity.MYTHIC;
        } else if (roll < 3) {
            rarity = Rarity.LEGENDARY;
        } else if (roll < 7) {
            rarity = Rarity.RARE;
        } else if (roll < 15) {
            rarity = Rarity.UNCOMMON;
        }
        const pool: object[] = this.itemsByRarityIndex.get(rarity);
        return pool[this.random(pool.length)];
    }
}