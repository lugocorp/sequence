import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Stats from '../../enums/stats';
import Game from '../../game';

export default class MedicineManEvent extends EventView {
  static label = 'medicine';
  private heroSelector: Selector<Hero>;
  private readonly sprite = Random.element([
    Sprites.MEDICINE_MAN_MUSKOGEE,
    Sprites.MEDICINE_MAN_GUARANI
  ]);

  constructor() {
    super(MedicineManEvent);
    this.setDetails(
      this.sprite,
      'your party comes across a medicine man. he will empower one of your party members in exchange for a random item from them.',
      [ new Action('continue', () => this.viewParty()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      Game.game.party.members.filter((h: Hero) => h.basket.hasItems)
    );
  }

  get hero(): Hero {
    return this.heroSelector.item();
  }

  viewParty(): void {
    const that = this;
    if (Game.game.party.hasItems()) {
      this.setSelector(this.heroSelector, [ new Action('make trade', () => that.checkTrade()) ]);
    } else {
      this.setDetails(this.sprite, `no one in your party has an item to give.`, [
        new Action('continue', () => Game.game.progress())
      ]);
    }
  }

  checkTrade(): void {
    if (this.hero.basket.hasItems) {
      this.finish();
    } else {
      this.invalidTrade();
    }
  }

  invalidTrade(): void {
    const that = this;
    this.setDetails(this.hero.sprite, `${this.hero.name} has no items to give.`, [
      new Action('continue', () => that.viewParty())
    ]);
  }

  finish(): void {
    const replaced: Item = this.hero.basket.random();
    this.hero.basket.unequip(replaced);
    Stats.changeUnitStat(this.hero, Stats.STRENGTH, 1);
    Stats.changeUnitStat(this.hero, Stats.WISDOM, 1);
    Stats.changeUnitStat(this.hero, Stats.DEXTERITY, 1);
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} gave ${replaced.name} to the medicine man and was empowered.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}