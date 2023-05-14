import Sprites from '../media/sprites';

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

// Defines game data for an Item
export interface ItemData {
  sprite: Sprites;
  name: string;
  rarity: number;
  description: string;
}
