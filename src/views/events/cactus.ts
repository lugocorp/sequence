import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class CactusEvent extends EventView {
    getViews(): View[] {
        const that = this;
        return [
            {
                image: Sprites.CACTUS,
                text: `your party comes across a cactus. choose someone to eat its fruit and regain their original energy.`,
                actions: {
                    continue: () =>
                        that.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                                select: () => {
                                    that.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} ate the cactus fruit and regained their original energy.`,
                                            actions: { continue: () => this.game.progress() }
                                        }
                                    ]);
                                    hero.refreshEnergy();
                                }
                            }))
                        )
                }
            }
        ];
    }
}
