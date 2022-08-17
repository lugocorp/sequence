import {WTEXT} from '../enums/values';
import {Trigger} from '../enums/types';
import Sprites from '../enums/sprites';
import Random from '../logic/random';
import Ability from './ability';
import Item from './item';
import Unit from './unit';
import Game from '../game';

export default class Hero extends Unit {
  private items: Item[];
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
    for (let a = 0; a < this.itemSlots; a++) {
      this.items.push(undefined);
    }
  }

  // Returns true if this Hero is in the player's Party
  isInParty(): boolean {
    return Game.game.party.members.indexOf(this) > -1;
  }

  // Returns true if this Hero no longer has stats due to fatigue
  isFatigued(): boolean {
    return !this.strength && !this.wisdom && !this.dexterity;
  }

  // Reduces this Hero's stats
  fatigue(): void {
    if (this.strength > 0) {
      this.strength--;
    }
    if (this.wisdom > 0) {
      this.wisdom--;
    }
    if (this.dexterity > 0) {
      this.dexterity--;
    }
  }

  // Equips an item to this hero
  equip(item: Item): void {
    // Shift items if the Hero is fully equipped
    if (this.items[this.items.length - 1]) {
      this.items[0].effect(Trigger.UNEQUIP, this, null);
      for (let a = 1; a < this.items.length; a++) {
        this.items[a - 1] = this.items[a];
        this.items[a] = undefined;
      }
    }
    this.items[this.itemCount()] = item;
    item.effect(Trigger.EQUIP, this, null);
  }

  unequip(item: Item): void {
    const index: number = this.items.indexOf(item);
    for (let a = index + 1; a < this.items.length; a++) {
      this.items[a - 1] = this.items[a];
    }
    this.items[this.items.length - 1] = undefined;
    item.effect(Trigger.UNEQUIP, this, null);
  }

  getItem(index: number): Item {
    return this.items[index];
  }

  hasItem(item: Item): boolean {
    return this.items.indexOf(item) > -1;
  }

  // Replaces the item at the given index
  replaceItem(index: number, item: Item): void {
    this.items[index].effect(Trigger.UNEQUIP, this, null);
    this.items[index] = item;
    item.effect(Trigger.EQUIP, this, null);
  }

  // Returns the number of equipped items
  itemCount(): number {
    return this.items.reduce((acc: number, x: Item) => acc + (x ? 1 : 0), 0);
  }

  // This function handles the hero's item and ability effects
  activate(trigger: Trigger, data: any): void {
    if (this.ability) {
      this.ability.effect(trigger, this, data);
    }
    for (const item of this.items) {
      item?.effect(trigger, this, data);
    }
  }

  descriptionText(): string {
    const stat = (n: number): string => n > 9 ? `\t${n}\t` : `\t${n}\t\t`;
    const numSpaces = WTEXT - this.people.length - 9 - 1;
    const spaces = new Array(numSpaces + 1).join(' ');
    return `${this.name}\n` +
      `${this.itemCount()}/${this.itemSlots} items${spaces}${this.people}\n` +
      `str:${stat(this.strength)}wis:${stat(this.wisdom)}dex:${stat(this.dexterity)}`;
  }

  lucky(): boolean {
    return Random.passes(this.luck / 100);
  }
}