import { Trigger, TriggerType } from '../enums/triggers';
import Sprites from '../enums/sprites';
import Stats from '../enums/stats';
import Random from '../logic/random';
import Basket from './basket';
import Item from './item';
import Unit from './unit';
import Game from '../game';

export default class Hero extends Unit {
  private originalStrength: number;
  private originalWisdom: number;
  private originalDexterity: number;
  private items: Item[];
  private _luck: number;
  private people: string;
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
    this.originalStrength = strength;
    this.originalWisdom = wisdom;
    this.originalDexterity = dexterity;
    this._basket = new Basket(this, itemSlots);
    this.description = description;
    this.people = people;
    this._luck = luck;
    this.items = [];
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
    const str: number = Stats.getUnitStat(this, Stats.STRENGTH);
    const wis: number = Stats.getUnitStat(this, Stats.WISDOM);
    const dex: number = Stats.getUnitStat(this, Stats.DEXTERITY);
    return str <= 0 && wis <= 0 && dex <= 0;
  }

  // Reduces this Hero's stats
  fatigue(): void {
    const data: Trigger = {
      type: TriggerType.GET_FATIGUE,
      fatigue: true,
      hero: this
    };
    this.basket.activate(data);
    for (const hero of Game.game.party.members) {
      if (hero !== this) {
        hero.basket.activate(data);
      }
    }
    if (data.fatigue) {
      Stats.changeUnitStat(this, Stats.STRENGTH, -1);
      Stats.changeUnitStat(this, Stats.WISDOM, -1);
      Stats.changeUnitStat(this, Stats.DEXTERITY, -1);
    }
    for (const hero of Game.game.party.members) {
      hero.basket.activate({
        type: TriggerType.AFTER_FATIGUE,
        fatigue: data.fatigue,
        hero: this
      });
    }
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
    this._luck += boost;
  }

  // Returns the text used in this hero's description
  descriptionText(): string {
    const stat = (n: number): string => (n > 9 ? `${n}\t` : `\t${n}\t`);
    const str: number = Stats.getUnitStat(this, Stats.STRENGTH);
    const wis: number = Stats.getUnitStat(this, Stats.WISDOM);
    const dex: number = Stats.getUnitStat(this, Stats.DEXTERITY);
    return (
      `${this.name}\n` +
      `${stat(str)}str\t\t${stat(wis)}wis\t\t${stat(dex)}dex\n` +
      `\thas ${this.basket.itemCount} item${this.basket.itemCount === 1 ? '' : 's'} (max ${
        this.basket.total
      })\n\n` +
      `${this.description}`
    );
  }

  // Calculates the hero's prospective luck at any given time
  get luck(): number {
    const data: Trigger = {
      type: TriggerType.GET_LUCK,
      luck: this._luck
    };
    this.basket.activate(data);
    return Math.max(Math.min(data.luck, 100), 0);
  }

  // Returns true if the hero passes a luck check
  lucky(): boolean {
    const success = Random.passes(this.luck / 100);
    this.basket.activate({
      type: TriggerType.AFTER_LUCK,
      hero: this
    });
    return success;
  }
}
