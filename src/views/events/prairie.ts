import { summon } from '../../content/heroes';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class PrairieEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.PRAIRIE,
                text: 'your party traverses a wide prairie. choose someone to wander off and come back after a few turns.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                                choose: () => {
                                    this.game.party.remove(hero);
                                    summon(this.game, hero);
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} wandered off on their own for a while.`,
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
