import Sprites from '../../enums/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import Game from '../../game';
import { EventView } from '../event';

export default class BeginEvent extends EventView {
  static label = 'begin';

  constructor(game: Game) {
    super(game);
  }

  init(): void {
    this.setDetails(
      Sprites.BEGIN,
      'your party sets off on a new adventure. press continue below and then use the arrows that appear above to view your party members.',
      [
        new Action('view party', () =>
          this.setSelector(Selector.heroSelector(this.game.party, this.game.party.members), [
            new Action('continue', () => this.game.progress())
          ])
        )
      ]
    );
  }
}
