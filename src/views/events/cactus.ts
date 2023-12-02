import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class CactusEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.CACTUS,
                text: `your party comes across a cactus. choose someone to eat its fruit and regain their original health.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                                'eat fruit': () => {
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} ate the cactus fruit and regained their original health.`,
                                            actions: { continue: () => this.game.progress() }
                                        }
                                    ]);
                                    hero.refreshHealth();
                                }
                            }))
                        )
                }
            }
        ];
    }
}
