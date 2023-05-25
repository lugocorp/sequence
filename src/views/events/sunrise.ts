import Sprites from '../../media/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Hero from '../../entities/hero';
import Game from '../../game';

export default class SunriseEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.SUNRISE,
      'a red sun rises over the horizon. someone in your party may offer all their belongings in return for an energy boost.',
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
      this.setSelector(this.heroSelector, [ new Action('offer items', () => that.offer()) ]);
    } else {
      this.setDetails(Sprites.SUNRISE, `no one in your party has anything to offer.`, [
        new Action('continue', () => this.game.progress())
      ]);
    }
  }

  offer(): void {
    for (const item of this.hero.basket.toList()) {
      this.hero.basket.unequip(item);
      this.hero.energy++;
    }
    this.setDetails(
      this.hero.sprite,
      `${this.hero.name} gave up all their belongings. they feel energized.`,
      [ new Action('continue', () => this.game.progress()) ]
    );
  }
}
