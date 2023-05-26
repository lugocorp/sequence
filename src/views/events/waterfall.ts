import { Stats } from '../../types';
import EnumsHelper from '../../logic/enums';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class WaterfallEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.WATERFALL,
      'your party comes to a cascading waterfall. choose someone to combine their base stats into one random stat.',
      [
        new Action('continue', () =>
          this.setSelector(this.heroSelector, [ new Action('choose', () => this.finished()) ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  private finished(): void {
    const hero: Hero = this.heroSelector.item();
    const stat = EnumsHelper.getRandomStat();
    if (stat === Stats.STRENGTH) {
      hero.str += hero.wis + hero.dex;
      hero.wis = 0;
      hero.dex = 0;
    }
    if (stat === Stats.WISDOM) {
      hero.wis += hero.str + hero.dex;
      hero.str = 0;
      hero.dex = 0;
    }
    if (stat === Stats.DEXTERITY) {
      hero.dex += hero.str + hero.wis;
      hero.str = 0;
      hero.wis = 0;
    }
    this.setDetails(hero.sprite, `${hero.name} got their base stats rearranged.`, [
      new Action('continue', () => this.game.progress())
    ]);
  }
}
