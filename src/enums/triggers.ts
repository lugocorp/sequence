import Game from '../game';

export enum TriggerType {
  GET_STATS = "when you calculate a hero's stats",
  GET_LUCK = "when you calculate a hero's luck"
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
    };

// Item effect type
export type Effect = (game: Game, trigger: Trigger) => void;
