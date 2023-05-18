import Game from './game';

// The display size of the entire game view
export const WIDTH = 124;
export const HEIGHT = 200;

// The display size of a single glyph
export const WGLYPH = 5;
export const HGLYPH = 8;

// The size of either dimension in text coordinates
export const WTEXT = 120 / WGLYPH; // 24
export const HTEXT = 96 / HGLYPH; // 12

export enum Stats {
  STRENGTH = 0,
  WISDOM = 1,
  DEXTERITY = 2
}

export enum Rarity {
  COMMON = 0,
  UNCOMMON = 1,
  RARE = 2,
  LEGENDARY = 3,
  MYTHIC = 4
}

export enum TriggerType {
  GET_STATS = "when you calculate a hero's stats",
  GET_LUCK = "when you calculate a hero's luck"
}

// Skill tuple type
export enum Skill {
  PROWESS = 'prowess',
  ENDURANCE = 'endurance',
  STEALTH = 'stealth',
  DIPLOMACY = 'diplomacy'
}
export type Skills = [Skill, Skill] | [Skill, undefined] | [undefined, undefined];

// Triggers are used to activate effects at certain times during gameplay
export type Trigger =
  | {
      type: TriggerType.GET_STATS;
      strength: number;
      wisdom: number;
      dexterity: number;
    }
  | {
      type: TriggerType.GET_LUCK;
      luck: number;
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
