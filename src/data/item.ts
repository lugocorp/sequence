import Effect from '../enums/effects';
import {ItemData} from '../serial/types';
import Hero from '../entities/hero';
import {Rarity, Trigger} from '../enums/types';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';

function statItemEffect(stat: number, boost: number): Effect {
    return (trigger: Trigger, hero: Hero, data: any) => {
        if (trigger === Trigger.EQUIP) {
            Stats.changeUnitStat(hero, stat, boost);
        }
        if (trigger === Trigger.UNEQUIP) {
            Stats.changeUnitStat(hero, stat, -boost);
        }
    }
}

function luckItemEffect(boost: number): Effect {
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
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: 'gives a party member +1 strength',
    effect: statItemEffect(Stats.STRENGTH, 1)
  },
  {
    name: 'squash',
    sprite: Sprites.SQUASH,
    rarity: Rarity.UNCOMMON,
    description: 'gives a party member +1 wisdom',
    effect: statItemEffect(Stats.WISDOM, 1)
  },
  {
    name: 'beans',
    sprite: Sprites.BEANS,
    rarity: Rarity.RARE,
    description: 'gives a party member +1 dexterity',
    effect: statItemEffect(Stats.DEXTERITY, 1)
  },
  {
    name: 'turquoise bead',
    sprite: Sprites.TURQUOISE,
    rarity: Rarity.LEGENDARY,
    description: 'gives a party member +5% luck',
    effect: luckItemEffect(5)
  },
  {
    name: 'bluejay feather',
    sprite: Sprites.FEATHER,
    rarity: Rarity.MYTHIC,
    description: 'the feather of a beautiful bluejay',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      // Do something here
    }
  }
];

export default data;