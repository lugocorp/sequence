import Effect from '../enums/effects';
import Sprites from '../enums/sprites';

// Defines game data for a Hero
export interface HeroData {
  sprite: Sprites;
  name: string;
  people: string;
  strength: number;
  wisdom: number;
  dexterity: number;
  itemSlots: number;
  luck: number;
  description: string;
}

// Defines game data for an Challenger
export interface ChallengerData {
  sprite: Sprites;
  name: string;
  strength: number;
  wisdom: number;
  dexterity: number;
  ability?: string;
}

// Defines game data for an Item
export interface ItemData {
  sprite: Sprites;
  name: string;
  rarity: number;
  description: string;
  effect: Effect;
}
