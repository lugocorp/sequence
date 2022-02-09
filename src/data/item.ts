import ItemType from '../enums/item-type';
import Trigger from '../enums/trigger';
import {ItemData} from '../serial/types';
import Hero from '../entities/hero';
import Rarity from '../rarity';

const data: ItemData[] = [
  {
    name: 'basic sword',
    type: ItemType.EQUIP,
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 damage',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.damage += 1;
      }
    }
  },
  {
    name: 'corn',
    type: ItemType.CONSUME,
    rarity: Rarity.COMMON,
    description: 'heals a party member by up to 25% of their max health',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        const heal: number = Math.floor(hero.maxHealth * 0.25);
        hero.health += heal;
        if (hero.health > hero.maxHealth) {
          hero.health = hero.maxHealth;
        }
      }
    }
  },
  {
    name: 'large sword',
    type: ItemType.EQUIP,
    rarity: Rarity.UNCOMMON,
    description: 'gives a party member +2 damage, -1 armor',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.damage += 2;
        hero.armor -= 1;
        if (hero.armor < 0) {
          hero.armor = 0;
        }
      }
    }
  },
  {
    name: 'sacred medicine',
    type: ItemType.EQUIP,
    rarity: Rarity.RARE,
    description: 'gives a party member +10 max health',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.maxHealth += 10;
        if (hero.maxHealth > 99) {
          hero.maxHealth = 99;
        }
      }
    }
  },
  {
    name: 'test legendary item',
    type: ItemType.EQUIP,
    rarity: Rarity.LEGENDARY,
    description: 'this is a test item',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'test mythic item',
    type: ItemType.EQUIP,
    rarity: Rarity.MYTHIC,
    description: 'this is a test item',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
];

export default data;