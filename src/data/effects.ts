import Hero from '../entities/hero';
import Random from '../logic/random';
import { ItemData } from '../serial/types';
import { Rarity, Trigger } from '../enums/types';
import { Weather } from '../enums/world';
import Sprites from '../enums/sprites';
import Effect from '../enums/effects';
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

function luckAndBoostEffect(str: number, wis: number, dex: number, boost: number): Effect {
  const stats = boostEffect(str, wis, dex);
  const luck = luckEffect(boost);
  return (trigger: Trigger, hero: Hero, data: any) => {
    stats(trigger, hero, data);
    luck(trigger, hero, data);
  };
}

function weatherChallengeEffect(weather: Weather): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.START_CHALLENGE) {
      Game.game.world.weather = weather;
    }
  };
}

function medicineBagEffect(): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.LEAVES_PARTY) {
      for (const member of Game.game.party.members) {
        member.boostLuck(5);
      }
    }
  };
}

function tobaccoEffect(): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.CHALLENGE_SUCCESS) {
      hero.boostLuck(5);
    }
  };
}

function echinaceaEffect(): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.CHALLENGE_SUCCESS) {
      const stat: number = Stats.getRandomStat();
      const current: number = Stats.getUnitStat(hero, stat);
      const original: number = Stats.getOriginalStat(hero, stat);
      Stats.changeUnitStat(hero, stat, original - current);
    }
  };
}

function oneOffLuckEffect(boost: number): Effect {
  const luck = luckEffect(boost);
  return (trigger: Trigger, hero: Hero, data: any) => {
    luck(trigger, hero, data);
    if (trigger === Trigger.LUCK_CHECK) {
      hero.unequip(this);
    }
  };
}

function oneOffResistFatigue(): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.FATIGUE && hero.hasItem(this)) {
      Stats.changeUnitStat(this, Stats.STRENGTH, 1);
      Stats.changeUnitStat(this, Stats.WISDOM, 1);
      Stats.changeUnitStat(this, Stats.DEXTERITY, 1);
    }
  };
}

function pointToChallenge(): Effect {
  let stat: number = Stats.STRENGTH;
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.ENTER_CHALLENGE) {
      stat = Random.element(data['expectation']);
      Stats.changeUnitStat(hero, stat, 1);
    }
    if (trigger === Trigger.EXIT_CHALLENGE) {
      Stats.changeUnitStat(hero, stat, -1);
    }
    if ([ Trigger.CHALLENGE_SUCCESS, Trigger.CHALLENGE_FAILURE ].indexOf(trigger) > -1) {
      Stats.changeUnitStat(hero, stat, -1);
      hero.unequip(this);
    }
  };
}

function riverSafetyEffect(): Effect {
  return (trigger: Trigger, hero: Hero, data: any) => {
    if (trigger === Trigger.EQUIP) {
      hero.tickRiverSafety();
    }
    if (trigger === Trigger.UNEQUIP) {
      hero.tickRiverSafety();
    }
    if (trigger === Trigger.RIVER) {
      hero.unequip(this);
    }
  };
}

const data: Record<string, Effect> = {
  corn: boostEffect(1, 0, 0),
  squash: boostEffect(0, 1, 0),
  beans: boostEffect(0, 0, 1),
  'turquoise bead': luckEffect(5),
  'pigeon feather': oneOffLuckEffect(10),
  'ground cherry': oneOffResistFatigue(),
  acorn: pointToChallenge(),
  'indian grass': riverSafetyEffect(),
  'wool blanket': undefined,
  cranberry: undefined,
  amaranth: undefined,
  sunchoke: undefined,
  groundnut: undefined,
  poncho: undefined,
  'copper axe': boostEffect(2, -1, 0),
  quipu: boostEffect(0, 2, -1),
  moccasins: boostEffect(-1, 0, 2),
  'cardinal feather': undefined,
  'medicine bag': medicineBagEffect(),
  tobacco: tobaccoEffect(),
  'fry bread': undefined,
  'sack of gold': undefined,
  'sack of silver': undefined,
  'paw paw': undefined,
  cassava: undefined,
  sunflower: undefined,
  crowberry: undefined,
  'dream catcher': undefined,
  'serpentine armbands': undefined,
  'turkey headdress': undefined,
  'deerskin boots': undefined,
  'jade dagger': undefined,
  sunglasses: undefined,
  'guanín amulet': undefined,
  echinacea: echinaceaEffect(),
  'frog glyph': weatherChallengeEffect(Weather.RAIN),
  'storm glyph': weatherChallengeEffect(Weather.WIND),
  'sun glyph': weatherChallengeEffect(Weather.SUN),
  'bird glyph': weatherChallengeEffect(Weather.SNOW),
  'bag of salmon': undefined,
  'drinking gourd': undefined,
  succotash: boostEffect(1, 1, 1),
  'bluejay feather': undefined,
  macuahuitl: luckAndBoostEffect(2, 0, 0, -5),
  amoxtli: luckAndBoostEffect(0, 2, 0, -5),
  huarache: luckAndBoostEffect(0, 0, 2, -5),
  'rattle gourd': undefined,
  'lynx cape': undefined,
  'racoon cape': undefined,
  'deerskin cape': undefined,
  'bow and arrow': undefined,
  'jungle manual': undefined,
  'flowering sash': undefined,
  'bison totem': undefined,
  'eagle totem': undefined,
  'turtle totem': undefined,
  'corn and bean soup': boostEffect(2, 2, 2),
  'obsidian collar': undefined,
  'eagle feather': luckEffect(100),
  'condor feather': undefined,
  'quetzal feather': undefined,
  'hummingbird feather': undefined,
  "condor's cleaver": undefined,
  "quetzal's quiver": undefined,
  "eagle's aegis": undefined,
  'golden mirror': undefined,
  'pine needle tea': undefined,
  'jade collar': undefined,
  'turquoise mask': undefined,
  'jade mask': undefined,
  'gold mask': undefined,
  pemmican: undefined,
  'turquoise ring': boostEffect(3, 3, 3),
  'medicine wheel': undefined,
  'spirit rattle': undefined
};

export default data;
