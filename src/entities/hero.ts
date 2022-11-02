import { green, yellow, orange, red } from '../enums/colors';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Basket from './basket';
import Item from './item';
import Unit from './unit';
import Game from '../game';

export default class Hero extends Unit {
  private items: Item[];
  private luck: number;
  private people: string;
  private originalStrength: number;
  private originalWisdom: number;
  private originalDexterity: number;
  private riverSafety: number;
  private _basket: Basket;
  description: string;

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
    this.people = people;
    this.items = [];
    this.luck = luck;
    this.originalStrength = strength;
    this.originalWisdom = wisdom;
    this.originalDexterity = dexterity;
    this.riverSafety = 0;
    this._basket = new Basket(itemSlots);
  }

  // Returns accessor to this hero's held items
  get basket(): Basket {
    return this._basket;
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

  // Restores a given stat to its original value
  refresh(stat: number): void {
    const original =
      stat === Stats.STRENGTH
        ? this.originalStrength
        : stat === Stats.WISDOM
        ? this.originalWisdom
        : this.originalDexterity;
    Stats.setUnitStat(this, stat, original);
  }

  // Changes the hero's luck by a given amount
  boostLuck(boost: number): void {
    this.luck = Math.max(Math.min(this.luck + boost, 100), 0);
  }

  tickRiverSafety(positive = true): void {
    this.riverSafety += positive ? 1 : -1;
  }

  getRiverSafety(): number {
    return this.riverSafety;
  }

  // Returns the text used in this hero's description
  descriptionText(): string {
    const stat = (n: number): string => (n > 9 ? `${n}\t` : `\t${n}\t`);
    return (
      `${this.name}\n` +
      `${stat(this.strength)}str\t\t${stat(this.wisdom)}wis\t\t${stat(this.dexterity)}dex\n` +
      `\thas ${this.basket.itemCount} item${this.basket.itemCount === 1 ? '' : 's'} (max ${
        this.basket.total
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
    return this.coloredRate(this.riverSafety ? 100 : this.luck);
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
