import {AbilityEffect, ItemEffect} from '../enums/effects';
import Sprites from '../enums/sprites';

// Defines game data for a Hero
export interface HeroData {
  sprite: Sprites;
  name: string;
  strength: number;
  wisdom: number;
  dexterity: number;
  itemSlots: number;
  ability?: string;
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
  name: string;
  rarity: number;
  description: string;
  effect: ItemEffect;
}

// Defines game data for an Ability
export interface AbilityData {
  name: string;
  description: string;
  effect: AbilityEffect;
}