// This class handles item and treasure rarity.
export class Rarity {
  static COMMON = 0;
  static UNCOMMON = 1;
  static RARE = 2;
  static LEGENDARY = 3;
  static MYTHIC = 4;

  static values(): number[] {
    return [ Rarity.COMMON, Rarity.UNCOMMON, Rarity.RARE, Rarity.LEGENDARY, Rarity.MYTHIC ];
  }
}

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
    }
  | {
      type: TriggerType.GET_OBSTACLE;
    }
  | {
      type: TriggerType.GET_CHAIN;
    }
  | {
      type: TriggerType.GET_RARITY;
    }
  | {
      type: TriggerType.AFTER_SELECTED;
    }
  | {
      type: TriggerType.AFTER_LUCK;
    }
  | {
      type: TriggerType.AFTER_EVENT;
    }
  | {
      type: TriggerType.AFTER_LEAVE;
    }
  | {
      type: TriggerType.AFTER_FATIGUE;
    };

// Item effect type
export type Effect = (trigger: Trigger) => void;
