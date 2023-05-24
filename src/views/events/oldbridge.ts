import Sprites from '../../media/sprites';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import Hero from '../../entities/hero';
import EventView from '../event';
import Game from '../../game';

export default class OldBridgeEvent extends EventView {
  private heroSelector: Selector<Hero>;

  constructor(game: Game) {
    super(game);
    this.setDetails(
      Sprites.BRIDGE,
      'your party comes upon an old bridge. it will only allow one member to cross. who will it be?',
      [ new Action('choose someone', () => this.choose()) ]
    );
  }

  init(): void {
    this.heroSelector = Selector.heroSelector(this.game.party, this.game.party.members);
  }

  choose(): void {
    this.setSelector(this.heroSelector, [
      new Action('cross the bridge', () => {
        const hero: Hero = this.heroSelector.item();
        this.game.party.clear();
        this.game.party.add(hero);
        this.setDetails(
          hero.sprite,
          `${hero.name} crosses the old bridge. the rest of your party disbands.`,
          [ new Action('continue', () => this.game.progress()) ]
        );
      })
    ]);
  }
}
