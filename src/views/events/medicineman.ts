import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class MedicineManEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.MEDICINE_MAN_GUARANI,
      'your party comes across a medicine man. he will bless one of your party members in exchange for a gift.',
      [ new Action('continue', () => this.viewParty()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(
      this.game.party,
      this.game.party.members.filter((h: Hero) => h.basket.hasItems)
    );
  }

  get hero(): Hero {
    return this.heroSelector.item();
  }

  viewParty(): void {
    const that = this;
    if (this.game.party.hasItems()) {
      this.setSelector(this.heroSelector, [ new Action('make trade', () => that.makeTrade()) ]);
    } else {
      this.setDetails(Sprites.MEDICINE_MAN_GUARANI, `no one in your party has anything to give.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  makeTrade(): void {
    for (const item of this.hero.basket.toList()) {
      this.hero.basket.unequip(item);
    }
    this.hero.str++;
    this.hero.wis++;
    this.hero.dex++;
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} gifted all their items to the medicine man. they were blessed with strength, wisdom and dexterity.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
