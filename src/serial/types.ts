import AbilityType from '../enums/ability-type';
import ItemType from '../enums/item-type';
import Sprites from '../enums/sprites';
import Damage from '../enums/damage';
import Rarity from '../enums/rarity';
import Slots from '../enums/slots';

// Defines game data for a Hero
export interface HeroData {
  sprite: Sprites;
  name: string;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  damages: Damage[];
  weaknesses: Damage[];
  resistances: Damage[];
  itemSlots: Slots;
  abilitySlots: Slots;
  ability1?: string;
  ability2?: string;
}

// Defines game data for an Enemy
export interface EnemyData {
  sprite: Sprites;
  name: string;
  health: number;
  damage: number;
  armor: number;
  speed: number;
  damages: Damage[];
  weaknesses: Damage[];
  resistances: Damage[];
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