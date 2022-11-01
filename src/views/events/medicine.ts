import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class MedicineManEvent extends View {
  private heroSelector: Selector<Hero>;
  private readonly sprite = Random.element([
    Sprites.MEDICINE_MAN_MUSKOGEE,
    Sprites.MEDICINE_MAN_GUARANI
  ]);

  constructor() {
    super();
    this.setDetails(
      this.sprite,
      'your party comes across a medicine man. he will empower one of your party members in exchange for a random item from them.',
      [ new Action('continue', () => this.viewParty()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      Game.game.party.members.filter((h: Hero) => h.itemCount() > 0)
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
    if (this.hero.itemCount() > 0) {
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
    const index: number = Random.max(this.hero.itemCount());
    const replaced: Item = this.hero.getItem(index);
    this.hero.unequip(replaced);
    this.hero.strength++;
    this.hero.wisdom++;
    this.hero.dexterity++;
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} gave ${replaced.name} to the medicine man and was empowered.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}
