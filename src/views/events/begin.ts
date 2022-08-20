import Sprites from '../../enums/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class BeginEvent extends View {
  constructor() {
    super();
  }

  init(): void {
    this.setDetails(
      Sprites.BEGIN,
      'your party sets off on a new adventure.',
      [
        new Action('view party', () => this.setSelector(
          Selector.heroSelector(Game.game.party.members),
          [
            new Action('continue', () => Game.game.progress())
          ]
        ))
      ]
    );

  }

  finish(): void {
    this.setSelector(Selector.heroSelector(Game.game.party.members), [
      new Action('continue', () => Game.game.progress())
    ]);
  }
}