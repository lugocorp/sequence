import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class HungryBadger extends EventView {
    getViews(): View[] {
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

        return [
            { image: Sprites.BADGER, text: msg, actions: { continue: () => this.game.progress() } }
        ];
    }
}
