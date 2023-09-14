import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import Hero from '../../entities/hero';
import EventView from '../event';
import View from '../view';

export default class OldBridgeEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.BRIDGE,
                text: 'your party comes upon an old bridge. it will only allow one member to cross. who will it be?',
                actions: {
                    'choose someone': () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                'cross the bridge': () => {
                                    this.game.party.clear();
                                    this.game.party.add(hero);
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} crosses the old bridge. the rest of your party disbands.`,
                                            actions: {
                                                continue: () => this.game.progress()
                                            }
                                        }
                                    ]);
                                }
                            }))
                        )
                }
            }
        ];
    }
}
