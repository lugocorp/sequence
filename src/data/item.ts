import Effect from '../enums/effects';
import { ItemData } from '../serial/types';
import Hero from '../entities/hero';
import { Rarity, Trigger } from '../enums/types';
import { Weather } from '../enums/world';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Game from '../game';

function luckEffect(boost: number): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.EQUIP) {
      hero.boostLuck(boost);
    }
    if (trigger === Trigger.UNEQUIP) {
      hero.boostLuck(-boost);
    }
  };
}

function boostEffect(str: number, wis: number, dex: number): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.EQUIP) {
      Stats.changeUnitStat(hero, Stats.STRENGTH, str);
      Stats.changeUnitStat(hero, Stats.WISDOM, wis);
      Stats.changeUnitStat(hero, Stats.DEXTERITY, dex);
    }
    if (trigger === Trigger.UNEQUIP) {
      Stats.changeUnitStat(hero, Stats.STRENGTH, -str);
      Stats.changeUnitStat(hero, Stats.WISDOM, -wis);
      Stats.changeUnitStat(hero, Stats.DEXTERITY, -dex);
    }
  };
}

function weatherChallengeEffect(weather: Weather): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.START_CHALLENGE) {
      Game.game.world.weather = weather;
    }
  };
}

const data: ItemData[] = [
  {
    name: 'corn',
    sprite: Sprites.CORN,
    rarity: Rarity.COMMON,
    description: '+1 strength',
    effect: boostEffect(1, 0, 0)
  },
  {
    name: 'squash',
    sprite: Sprites.SQUASH,
    rarity: Rarity.COMMON,
    description: '+1 wisdom',
    effect: boostEffect(0, 1, 0)
  },
  {
    name: 'beans',
    sprite: Sprites.BEANS,
    rarity: Rarity.COMMON,
    description: '+1 dexterity',
    effect: boostEffect(0, 0, 1)
  },
  {
    name: 'turquoise bead',
    sprite: Sprites.TURQUOISE,
    rarity: Rarity.COMMON,
    description: '+5% luck',
    effect: luckEffect(5)
  },
  {
    name: 'macuahuitl',
    sprite: Sprites.MACUAHUITL,
    rarity: Rarity.UNCOMMON,
    description: '+2 strength, -1 wisdom',
    effect: boostEffect(2, -1, 0)
  },
  {
    name: 'quipu',
    sprite: Sprites.QUIPU,
    rarity: Rarity.UNCOMMON,
    description: '+2 wisdom, -1 dexterity',
    effect: boostEffect(0, 2, -1)
  },
  {
    name: 'moccasin',
    sprite: Sprites.MOCCASIN,
    rarity: Rarity.UNCOMMON,
    description: '+2 dexterity, -1 strength',
    effect: boostEffect(-1, 0, 2)
  },
  {
    name: 'medicine bag',
    sprite: Sprites.MEDICINE_BAG,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck to all party members when this character leaves your party',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.LEAVES_PARTY) {
        for (const member of Game.game.party.members) {
          member.boostLuck(5);
        }
      }
    }
  },
  {
    name: 'tobacco',
    sprite: Sprites.TOBACCO,
    rarity: Rarity.UNCOMMON,
    description: '+5% luck after a successful challenge',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.CHALLENGE_SUCCESS) {
        hero.boostLuck(5);
      }
    }
  },
  {
    name: 'echinacea',
    sprite: Sprites.ECHINACEA,
    rarity: Rarity.RARE,
    description: 'reverts a random stat to its original value after a successful challenge',
    effect: (trigger: Trigger, hero: Hero, data: any) => {
      if (trigger === Trigger.CHALLENGE_SUCCESS) {
        const stat: number = Stats.getRandomStat();
        const current: number = Stats.getUnitStat(hero, stat);
        const original: number = Stats.getOriginalStat(hero, stat);
        Stats.changeUnitStat(hero, stat, original - current);
      }
    }
  },
  {
    name: 'paw paw',
    sprite: Sprites.PAW_PAW,
    rarity: Rarity.RARE,
    description: "it rains when this item's holder is in a challenge",
    effect: weatherChallengeEffect(Weather.RAIN)
  },
  {
    name: 'cassava',
    sprite: Sprites.CASSAVA,
    rarity: Rarity.RARE,
    description: "the wind blows when this item's holder is in a challenge",
    effect: weatherChallengeEffect(Weather.WIND)
  },
  {
    name: 'sunflower',
    sprite: Sprites.SUNFLOWER,
    rarity: Rarity.RARE,
    description: "the clouds dissipate when this item's holder is in a challenge",
    effect: weatherChallengeEffect(Weather.SUN)
  },
  {
    name: 'manoomin rice',
    sprite: Sprites.MANOOMIN_RICE,
    rarity: Rarity.RARE,
    description: "it snows when this item's holder is in a challenge",
    effect: weatherChallengeEffect(Weather.SNOW)
  },
  {
    name: 'succotash',
    sprite: Sprites.SUCCOTASH,
    rarity: Rarity.RARE,
    description: '+1 strength\n+1 wisdom\n+1 dexterity',
    effect: boostEffect(1, 1, 1)
  },
  {
    name: 'chicha',
    sprite: Sprites.CHICHA,
    rarity: Rarity.LEGENDARY,
    description: '+2 strength\n+2 wisdom\n+2 dexterity',
    effect: boostEffect(2, 2, 2)
  },
  {
    name: 'eagle feather',
    sprite: Sprites.EAGLE_FEATHER,
    rarity: Rarity.LEGENDARY,
    description: '+100% luck',
    effect: luckEffect(100)
  },
  {
    name: 'turquoise ring',
    sprite: Sprites.TURQUOISE_RING,
    rarity: Rarity.MYTHIC,
    description: '+3 strength\n+3 wisdom\n+3 dexterity',
    effect: boostEffect(3, 3, 3)
  }
];

export default data;
