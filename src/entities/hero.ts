import {WTEXT} from '../enums/values';
import {Trigger} from '../enums/types';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Ability from './ability';
import Item from './item';
import Unit from './unit';
import Game from '../game';

export default class Hero extends Unit {
  private items: Item[];
  originalStrength: number;
  originalWisdom: number;
  originalDexterity: number;
  itemSlots: number;
  ability: Ability;
  people: string;
  luck: number;

  constructor(sprite: Sprites, name: string, people: string, strength: number, wisdom: number, dexterity: number, itemSlots: number) {
    super(sprite, name, strength, wisdom, dexterity);
    this.itemSlots = itemSlots;
    this.people = people;
    this.items = [];
    this.luck = 50;
    this.originalStrength = strength;
    this.originalWisdom = wisdom;
    this.originalDexterity = dexterity;
  }

  // Returns true if this Hero is in the player's Party
  isInParty(): boolean {
    return Game.game.party.members.indexOf(this) > -1;
  }

  // Returns true if this Hero no longer has stats due to fatigue
  isFatigued(): boolean {
    return this.strength <= 0 && this.wisdom <= 0 && this.dexterity <= 0;
  }

  // Reduces this Hero's stats
  fatigue(): void {
    Stats.changeUnitStat(this, Stats.STRENGTH, -1);
    Stats.changeUnitStat(this, Stats.WISDOM, -1);
    Stats.changeUnitStat(this, Stats.DEXTERITY, -1);
  }

  // Equips an item to this hero
  equip(item: Item): void {
    // Shift items if the Hero is fully equipped
    if (this.items.length === this.itemSlots) {
      this.items[0].effect(Trigger.UNEQUIP, this, null);
      this.items.splice(0, 1);
    }
    this.items.push(item);
    item.effect(Trigger.EQUIP, this, null);
  }

  // Unequips an item from this hero
  unequip(item: Item): void {
    const index: number = this.items.indexOf(item);
    this.items.splice(index, 1);
    item.effect(Trigger.UNEQUIP, this, null);
  }

  // Grabs a list of this hero's items
  getItems(): Item[] {
    return this.items;
  }

  // Grabs a specific item from this hero
  getItem(index: number): Item {
    return this.items[index];
  }

  // Returns true if this hero has the given item
  hasItem(item: Item): boolean {
    return this.items.indexOf(item) > -1;
  }

  // Replaces the item at the given index
  replaceItem(index: number, item: Item): void {
    this.unequip(this.items[index]);
    this.equip(item);
  }

  // Returns the number of equipped items
  itemCount(): number {
    return this.items.length;
  }

  // This function handles the hero's item and ability effects
  activate(trigger: Trigger, data?: any): void {
    if (this.ability) {
      this.ability.effect(trigger, this, data);
    }
    for (const item of this.items) {
      item?.effect(trigger, this, data);
    }
  }

  // Returns the text used in this hero's description
  descriptionText(): string {
    const stat = (n: number): string => n > 9 ? `\t${n}\t` : `\t${n}\t\t`;
    const numSpaces = WTEXT - this.people.length - 9 - 1;
    const spaces = new Array(numSpaces + 1).join(' ');
    return `${this.name}\n` +
      `${this.itemCount()}/${this.itemSlots} items${spaces}${this.people}\n` +
      `str:${stat(this.strength)}wis:${stat(this.wisdom)}dex:${stat(this.dexterity)}`;
  }

  // Returns true if the hero passes a luck check
  lucky(): boolean {
    return Random.passes(this.luck / 100);
  }
}