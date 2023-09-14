import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import Game from '../../game';
import EventView from '../event';

export default class BeginEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    this.game.views.setViews([{(
      Sprites.BEGIN,
      'your party sets off on a new adventure. press continue below and then use the arrows that appear above to view your party members.',
      [
        'view party': () =>
          this.setSelector(Selector.heroSelector(this.game.party, this.game.party.members), [
            'start adventure': () => this.game.progress())
          ])
        )
      ]
    );
  }
}
