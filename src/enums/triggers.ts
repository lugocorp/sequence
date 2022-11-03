import Hero from '../entities/hero';
import Rarity from './rarity';

export enum TriggerType {
  GET_STATS = "when you calculate a hero's stats",
  GET_LUCK = "when you calculate a hero's luck",
  GET_FATIGUE = "when you calculate a hero's fatigue",
  GET_OBSTACLE = 'when you calculate obstacle survival',
  GET_CHAIN = 'when you calculate event chain flags',
  GET_RARITY = 'when you calculate item drop rarity floor',
  AFTER_SELECTED = 'when a hero is selected for a challenge',
  AFTER_LUCK = 'after a luck check',
  AFTER_EVENT = 'after an event terminates',
  AFTER_LEAVE = 'after a hero leaves the party',
  AFTER_FATIGUE = 'after a hero gets fatigued'
}

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
    }
  | {
      type: TriggerType.GET_FATIGUE;
      fatigue: boolean;
    }
  | {
      type: TriggerType.GET_OBSTACLE;
      pass: boolean;
    }
  | {
      type: TriggerType.GET_CHAIN;
      easierCaves: boolean;
      morePlants: boolean;
    }
  | {
      type: TriggerType.GET_RARITY;
      floor: Rarity;
    }
  | {
      type: TriggerType.AFTER_SELECTED;
      hero: Hero;
    }
  | {
      type: TriggerType.AFTER_LUCK;
      hero: Hero;
    }
  | {
      type: TriggerType.AFTER_EVENT;
    }
  | {
      type: TriggerType.AFTER_LEAVE;
    }
  | {
      type: TriggerType.AFTER_FATIGUE;
      fatigue: boolean;
      hero: Hero;
    };

// Item effect type
export type Effect = (trigger: Trigger) => void;
