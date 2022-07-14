import Sprites from '../../enums/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class BeginEvent extends View {
  constructor() {
    super();
    const that = this;
    this.setDetails(
      Sprites.BEGIN,
      'your party sets off on a new adventure.',
      [ new Action('view party', () => that.finish()) ]
    );
  }

  finish(): void {
    this.setSelector(Selector.heroSelector(Game.game.party.members), [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}