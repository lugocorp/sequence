import Game from './game';

// The display size of the entire game view
export const WIDTH = 124;
export const HEIGHT = 200;
export const PADDING = 2;

// The display size of a single glyph
export const WGLYPH = 5;
export const HGLYPH = 8;

// The size of either dimension in text coordinates
export const WTEXT = 120 / WGLYPH; // 24
export const HTEXT = 96 / HGLYPH; // 12

// Stat model
export type StatBlock<T = number> = {
  str: T;
  wis: T;
  dex: T;
  luck: T;
  energy: T;
};

export enum Stats {
  STRENGTH = 0,
  WISDOM = 1,
  DEXTERITY = 2
}

// Skill tuple type
export enum Skill {
  PROWESS = 'P', // Prowess
  ENDURANCE = 'E', // Endurance
  STEALTH = 'S', // Stealth
  DIPLOMACY = 'D' // Diplomacy
}
export type Skills = [Skill, Skill] | [Skill, undefined] | [undefined, undefined];

// Item rarities
export enum Rarity {
  COMMON = 0,
  UNCOMMON = 1,
  RARE = 2,
  LEGENDARY = 3,
  MYTHIC = 4
}

// Triggers are used to activate effects at certain times during gameplay
export enum TriggerType {
  GET_STATS = "when you calculate a hero's stats",
  LOSS_CHECK = 'determines if the hero can lose a particular stat',
  LEAVE_PARTY = 'when a party member leaves',
  LOSE_ENERGY = 'when a party member loses energy',
  JOIN_PARTY = 'when a party member joins'
}

export type Trigger =
  | ({
      type: TriggerType.GET_STATS;
    } & StatBlock)
  | ({
      type: TriggerType.LOSS_CHECK;
    } & StatBlock<boolean>)
  | {
      type: TriggerType.LEAVE_PARTY;
    }
  | {
      type: TriggerType.LOSE_ENERGY;
    }
  | {
      type: TriggerType.JOIN_PARTY;
    };

// Item effect type
export type Effect = (game: Game, trigger: Trigger) => void;

// Dictates the number of ticks between the day/night cycle
export const DAY_NIGHT_CYCLE = 5;

export enum Time {
  NIGHT,
  DAY
}

export enum Weather {
  SUN,
  RAIN,
  WIND,
  SNOW
}

export type World = {
  weather: Weather;
  cave: boolean;
  time: Time;
};
