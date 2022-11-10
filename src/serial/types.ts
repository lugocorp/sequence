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
  description: string;
}

// Defines game data for an Challenger
export interface ChallengerData {
  sprite: Sprites;
  name: string;
  strength: number;
  wisdom: number;
  dexterity: number;
}

// Defines game data for an Item
export interface ItemData {
  sprite: Sprites;
  name: string;
  rarity: number;
  description: string;
}
