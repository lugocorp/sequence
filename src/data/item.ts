import Trigger from '../enums/trigger';
import Rarity from '../enums/rarity';
import Stats from '../enums/stats';
import {ItemData} from '../serial/types';
import Hero from '../entities/hero';

function statItemEffect(stat: number, boost: number): (trigger: Trigger, hero: Hero, data: any) => void {
    return (trigger: Trigger, hero: Hero, data: any) => {
        if (trigger === Trigger.EQUIP) {
            Stats.changeUnitStat(hero, stat, boost);
        }
        if (trigger === Trigger.UNEQUIP) {
            Stats.changeUnitStat(hero, stat, -boost);
        }
    }
}

function luckItemEffect(boost: number): (trigger: Trigger, hero: Hero, data: any) => void {
    return (trigger: Trigger, hero: Hero, data: any) => {
        if (trigger === Trigger.EQUIP) {
            hero.luck += boost;
        }
        if (trigger === Trigger.UNEQUIP) {
            hero.luck -= boost;
        }
    }
}

const data: ItemData[] = [
  {
    name: 'corn',
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 strength',
    effect: statItemEffect(Stats.STRENGTH, 1)
  },
  {
    name: 'squash',
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 wisdom',
    effect: statItemEffect(Stats.WISDOM, 1)
  },
  {
    name: 'beans',
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 agility',
    effect: statItemEffect(Stats.AGILITY, 1)
  },
  {
    name: 'guava',
    rarity: Rarity.UNCOMMON,
    description: 'a delicious fruit',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'paw paw',
    rarity: Rarity.UNCOMMON,
    description: 'a delicious fruit',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'turquoise bead',
    rarity: Rarity.UNCOMMON,
    description: 'a pretty gem prized throughout the continent',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'sacred medicine',
    rarity: Rarity.RARE,
    description: 'gives a party member +5% luck',
    effect: luckItemEffect(0.1)
  },
  {
    name: 'medicine bag',
    rarity: Rarity.LEGENDARY,
    description: 'a bag of sacred healing medicine',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  },
  {
    name: 'bluejay feather',
    rarity: Rarity.MYTHIC,
    description: 'the feather of a beautiful bluejay',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  }
];

export default data;