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
    this._basket = new Basket(itemSlots);
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
    return this.strength <= 0 && this.wisdom <= 0 && this.dexterity <= 0;
  }

  // Reduces this Hero's stats
  fatigue(): void {
    const data: Trigger = {
      type: TriggerType.GET_FATIGUE,
      fatigue: true
    };
    this.basket.activate(data);
    if (data.fatigue) {
      Stats.changeUnitStat(this, Stats.STRENGTH, -1);
      Stats.changeUnitStat(this, Stats.WISDOM, -1);
      Stats.changeUnitStat(this, Stats.DEXTERITY, -1);
      for (const hero of Game.game.party.members) {
        hero.basket.activate({
          type: TriggerType.AFTER_FATIGUE,
          hero: this
        });
      }
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
    this._luck = Math.max(Math.min(this._luck + boost, 100), 0);
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

  // Calculates the hero's prospective luck at any given time
  get luck(): number {
    const data: Trigger = {
      type: TriggerType.GET_LUCK,
      luck: this._luck
    };
    this.basket.activate(data);
    return data.luck;
  }

  // Returns true if the hero passes a luck check
  lucky(): boolean {
    const success = Random.passes(this.luck / 100);
    this.basket.activate({
      type: TriggerType.AFTER_LUCK
    });
    return success;
  }
}
