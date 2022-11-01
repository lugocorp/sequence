import { green, yellow, orange, red } from '../enums/colors';
import { Trigger } from '../enums/types';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Ability from './ability';
import Item from './item';
import Unit from './unit';
import Game from '../game';

export default class Hero extends Unit {
  private items: Item[];
  private luck: number;
  private people: string;
  private itemSlots: number;
  originalStrength: number;
  originalWisdom: number;
  originalDexterity: number;
  description: string;
  ability: Ability;

  constructor(
    sprite: Sprites,
    name: string,
    people: string,
    strength: number,
    wisdom: number,
    dexterity: number,
    itemSlots: number,
    luck: number,
    description: string
  ) {
    super(sprite, name, strength, wisdom, dexterity);
    this.description = description;
    this.itemSlots = itemSlots;
    this.people = people;
    this.items = [];
    this.luck = luck;
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

  // Changes the hero's luck by a given amount
  boostLuck(boost: number): void {
    this.luck = Math.max(Math.min(this.luck + boost, 100), 0);
  }

  // Equips an item to this hero
  equip(item: Item): void {
    if (this.items.length >= this.itemSlots) {
      throw new Error(`${this.name} can no longer equip items`);
    }
    Game.game.history.itemsCollected++;
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

  // Returns true if this hero can still equip items
  canEquipItems(): boolean {
    return this.items.length < this.itemSlots;
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
    const stat = (n: number): string => (n > 9 ? `${n}\t` : `\t${n}\t`);
    return (
      `${this.name}\n` +
      `${stat(this.strength)}str\t\t${stat(this.wisdom)}wis\t\t${stat(this.dexterity)}dex\n` +
      `\thas ${this.itemCount()} item${this.itemCount() === 1 ? '' : 's'} (max ${
        this.itemSlots
      })\n\n` +
      `${this.description}`
    );
  }

  // Colors a player's success rate for some challenge
  private coloredRate(rate: number): string {
    if (rate >= 90) {
      return green(`${rate}%`);
    }
    if (rate >= 60) {
      return yellow(`${rate}%`);
    }
    if (rate >= 30) {
      return orange(`${rate}%`);
    }
    return red(`${rate}%`);
  }

  // Returns the colored success rate of surviving a rapid
  riverSuccess(): string {
    return this.coloredRate(this.luck);
  }

  // Returns the colored success rate of winning a challenge
  challengeSuccess(playerStatsHigher: boolean): string {
    return this.coloredRate(playerStatsHigher ? 100 : this.luck);
  }

  // Returns the colored success rate of successfully hunting a deer
  deerSuccess(): string {
    return this.coloredRate(this.luck);
  }

  // Returns true if the hero passes a luck check
  lucky(): boolean {
    return Random.passes(this.luck / 100);
  }
}
