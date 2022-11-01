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

const data: Record<string, Effect> = {
  'corn': boostEffect(1, 0, 0),
  'squash': boostEffect(0, 1, 0),
  'beans': boostEffect(0, 0, 1),
  'turquoise bead': luckEffect(5),
  'macuahuitl': boostEffect(2, -1, 0),
  'quipu': boostEffect(0, 2, -1),
  'moccasin': boostEffect(-1, 0, 2),
  'medicine bag': (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.LEAVES_PARTY) {
      for (const member of Game.game.party.members) {
        member.boostLuck(5);
      }
    }
  },
  'tobacco': (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.CHALLENGE_SUCCESS) {
      hero.boostLuck(5);
    }
  },
  'echinacea': (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.CHALLENGE_SUCCESS) {
      const stat: number = Stats.getRandomStat();
      const current: number = Stats.getUnitStat(hero, stat);
      const original: number = Stats.getOriginalStat(hero, stat);
      Stats.changeUnitStat(hero, stat, original - current);
    }
  },
  'paw paw': weatherChallengeEffect(Weather.RAIN),
  'cassava': weatherChallengeEffect(Weather.WIND),
  'sunflower': weatherChallengeEffect(Weather.SUN),
  'manoomin rice': weatherChallengeEffect(Weather.SNOW),
  'succotash': boostEffect(1, 1, 1),
  'chicha': boostEffect(2, 2, 2),
  'eagle feather': luckEffect(100),
  'turquoise ring': boostEffect(3, 3, 3)
};

export default data;