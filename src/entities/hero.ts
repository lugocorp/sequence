import { Stats, Trigger, TriggerType, Effect, Skills, StatBlock } from '../types';
import Sprites from '../media/sprites';
import EnumsHelper from '../logic/enums';
import Random from '../logic/random';
import Basket from './basket';
import Party from './party';
import Game from '../game';

export default class Hero {
  private originals: StatBlock;
  private boosts: StatBlock;
  basket: Basket;

  constructor(
    private game: Game,
    public sprite: Sprites,
    public name: string,
    private people: string,
    str: number,
    wis: number,
    dex: number,
    energy: number,
    itemSlots: number,
    public description: string,
    public skills: Skills,
    private effect: Effect
  ) {
    this.basket = new Basket(game, this, itemSlots);
    this.originals = {
      str,
      wis,
      dex,
      luck: 5,
      energy
    };
    this.boosts = {
      str: 0,
      wis: 0,
      dex: 0,
      luck: 0,
      energy: 0
    };
  }

  /**
   * Grabs the hero's stat block after effects are calculated
   */
  get stats(): StatBlock {
    const data: Trigger = {
      type: TriggerType.GET_STATS,
      str: this.str,
      wis: this.wis,
      dex: this.dex,
      luck: this.luck,
      energy: this.energy
    };
    this.activate(data);
    return {
      str: Math.min(10, Math.max(0, data.str)),
      wis: Math.min(10, Math.max(0, data.wis)),
      dex: Math.min(10, Math.max(0, data.dex)),
      luck: Math.min(100, Math.max(0, data.luck)),
      energy: Math.min(10, Math.max(0, data.energy))
    };
  }

  private get losable(): StatBlock<boolean> {
    const data: Trigger = {
      type: TriggerType.LOSS_CHECK,
      str: true,
      wis: true,
      dex: true,
      luck: true,
      energy: true
    };
    this.activate(data);
    return {
      str: data.str,
      wis: data.wis,
      dex: data.dex,
      luck: data.luck,
      energy: data.energy
    };
  }

  get str(): number {
    return this.originals.str + this.boosts.str;
  }

  set str(value: number) {
    const updated = value - this.originals.str;
    if (updated > this.boosts.str || this.losable.str) {
      this.boosts.str = updated;
    }
  }

  get wis(): number {
    return this.originals.wis + this.boosts.wis;
  }

  set wis(value: number) {
    const updated = value - this.originals.wis;
    if (updated > this.boosts.wis || this.losable.wis) {
      this.boosts.wis = updated;
    }
  }

  get dex(): number {
    return this.originals.dex + this.boosts.dex;
  }

  set dex(value: number) {
    const updated = value - this.originals.dex;
    if (updated > this.boosts.dex || this.losable.dex) {
      this.boosts.dex = updated;
    }
  }

  get luck(): number {
    return this.originals.luck + this.boosts.luck;
  }

  set luck(value: number) {
    const updated = value - this.originals.luck;
    if (updated > this.boosts.luck || this.losable.luck) {
      this.boosts.luck = updated;
    }
  }

  get energy(): number {
    return this.originals.energy + this.boosts.energy;
  }

  set energy(value: number) {
    const updated = value - this.originals.energy;
    if (updated > this.boosts.energy || this.losable.energy) {
      this.boosts.energy = updated;
    }
  }

  getStat(stat: Stats): number {
    switch (stat) {
      case Stats.STRENGTH:
        return this.stats.str;
      case Stats.WISDOM:
        return this.stats.wis;
      case Stats.DEXTERITY:
        return this.stats.dex;
    }
  }

  // Returns true if this Hero is in the player's Party
  isInParty(party: Party): boolean {
    return party.members.indexOf(this) > -1;
  }

  // Boosts a random stat on this hero
  empowerRandom(): void {
    switch (EnumsHelper.getRandomStat()) {
      case Stats.STRENGTH:
        this.str++;
        break;
      case Stats.WISDOM:
        this.wis++;
        break;
      case Stats.DEXTERITY:
        this.dex++;
        break;
    }
  }

  // Restores a given stat to its original value
  refresh(stat: Stats): void {
    switch (stat) {
      case Stats.STRENGTH:
        this.str = this.originals.str;
        break;
      case Stats.WISDOM:
        this.wis = this.originals.wis;
        break;
      case Stats.DEXTERITY:
        this.dex = this.originals.dex;
        break;
    }
  }

  // Returns the text used in this hero's description
  descriptionText(): string {
    const stat = (n: number): string => (n > 9 ? `${n}\t` : `\t${n}\t`);
    let skills = 'no skills';
    if (this.skills[0]) {
      skills = this.skills[0];
      if (this.skills[1]) {
        for (let a = 0; a < 24 - this.skills[0].length - this.skills[1].length; a++) {
          skills += '\t';
        }
        skills += this.skills[1];
      }
    }
    return (
      `${this.name}\n` +
      `${this.basket.itemCount}/${this.basket.total}\titems\t\t\t\t\t\t` +
      `${stat(this.stats.energy)}energy\n` +
      `${stat(this.stats.str)}str\t\t\t` +
      `${stat(this.stats.wis)}wis\t\t\t` +
      `${stat(this.stats.dex)}dex\n` +
      `${skills}\n${this.description}`
    );
  }

  // Returns true if the hero passes a luck check
  lucky(): boolean {
    return Random.passes(this.stats.luck / 100);
  }

  // Triggers item and hero effects
  activate(trigger: Trigger): void {
    for (const item of this.basket.toList()) {
      if (item.effect) {
        item.effect(this.game, trigger);
      }
    }
    if (this.effect) {
      this.effect(this.game, trigger);
    }
  }
}
