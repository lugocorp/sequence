import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class OwlEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.OWL,
                text: 'a mischievous owl hoots and brings bad luck to your party.',
                actions: {
                    continue: () => {
                        for (const hero of this.game.party.members) {
                            hero.luck = 0;
                        }
                        this.game.progress();
                    }
                }
            }
        ];
    }
}
