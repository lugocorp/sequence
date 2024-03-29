import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class SnakeBiteEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.SNAKE_BITE,
                text: `your party comes across a snake. choose someone to get bit and lose their stats.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                                'lose stats': () => {
                                    hero.str = 0;
                                    hero.wis = 0;
                                    hero.dex = 0;
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} got bit and lost their base stats.`,
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
