import Sprites from '../../media/sprites';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class HungryBadger extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    let relevantItems = false;
    for (const hero of this.game.party.members) {
      for (const item of hero.basket.toList()) {
        if ([ 'round egg', 'mysterious seed' ].includes(item.name)) {
          hero.basket.unequip(item);
          relevantItems = true;
        }
      }
    }

    let msg =
      'a hungry badger jumps out at your party! it steals all their round eggs and mysterious seeds.';
    if (!relevantItems) {
      msg =
        'a hungry badger jumps out at your party! it finds nothing to eat so it summons bad luck.';
      for (const hero of this.game.party.members) {
        hero.luck -= 10;
      }
    }

    this.setDetails(Sprites.BADGER, msg, [ new Action('continue', () => this.game.progress()) ]);
  }
}
