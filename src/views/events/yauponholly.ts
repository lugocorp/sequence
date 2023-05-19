import { Stats } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class YauponHollyEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.setDetails(
      Sprites.CHESTNUT,
      `your party comes across a yaupon holly. choose someone to brew a drink from it and revert their original stats.`,
      [
        new Action('continue', () =>
          that.setSelector(that.heroSelector, [
            new Action('select', () => {
              const hero: Hero = that.heroSelector.item();
              that.setDetails(
                hero.sprite,
                `${hero.name} brewed a drink from the yaupon holly. they regain their original strength, wisdom and dexterity.`,
                [ new Action('continue', () => this.game.progress()) ]
              );
              hero.refresh(Stats.STRENGTH);
              hero.refresh(Stats.WISDOM);
              hero.refresh(Stats.DEXTERITY);
            })
          ])
        )
      ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }
}
