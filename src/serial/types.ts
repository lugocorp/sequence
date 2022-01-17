import AbilityType from '../enums/ability-type';
import ItemType from '../enums/item-type';
import Element from '../enums/element';
import Rarity from '../enums/rarity';
import Slots from '../enums/slots';

// Defines game data for a Hero
export interface HeroData {
  name: string;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  damages: Element[];
  weaknesses: Element[];
  resistances: Element[];
  itemSlots: Slots;
  abilitySlots: Slots;
}

// Defines game data for an Enemy
export interface EnemyData {
  name: string;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  damages: Element[];
  weaknesses: Element[];
  resistances: Element[];
  ability?: string;
}

// Defines game data for an Item
export interface ItemData {
  name: string;
  type: ItemType;
  rarity: Rarity;
}

// Defines game data for an Ability
export interface AbilityData {
  name: string;
  type: AbilityType;
}