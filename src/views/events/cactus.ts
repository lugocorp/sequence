import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';

export default class CactusEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    const that = this;
    this.game.views.setViews([{(
      Sprites.CACTUS,
      `your party comes across a cactus. choose someone to eat its fruit and regain their original energy.`,
      [
        'continue': () =>
          that.setSelector(that.heroSelector, [
            'select': () => {
              const hero: Hero = that.heroSelector.item();
              that.setDetails(
                hero.sprite,
                `${hero.name} ate the cactus fruit and regained their original energy.`,
                [ 'continue': () => this.game.progress()) ]
              );
              hero.refreshEnergy();
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
