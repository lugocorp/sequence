import Trigger from '../enums/trigger';
import {ItemData} from '../serial/types';
import Hero from '../entities/hero';
import Rarity from '../rarity';

const data: ItemData[] = [
  {
    name: 'basic sword',
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 strength',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.strength += 1;
      }
    }
  },
  {
    name: 'corn',
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 wisdom',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.wisdom += 1;
      }
    }
  },
  {
    name: 'large sword',
    rarity: Rarity.UNCOMMON,
    description: 'gives a party member +1 agility',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.agility += 1;
      }
    }
  },
  {
    name: 'sacred medicine',
    rarity: Rarity.RARE,
    description: 'gives a party member +5% luck',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.USED) {
        hero.luck += 5;
      }
    }
  },
  {
    name: 'test legendary item',
    rarity: Rarity.LEGENDARY,
    description: 'this is a test item',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'test mythic item',
    rarity: Rarity.MYTHIC,
    description: 'this is a test item',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
];

export default data;