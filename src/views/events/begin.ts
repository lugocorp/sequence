import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class BeginEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.BEGIN,
                text: 'your party sets off on a new adventure. press continue below and then use the arrows that appear above to view your party members.',
                actions: {
                    'view party': () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (_: Hero) => ({
                                'start adventure': () => this.game.progress()
                            }))
                        )
                }
            }
        ];
    }
}
