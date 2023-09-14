import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

/**
 * In this event you choose a party member to leave behind.
 */
export default class CoyotlEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.COYOTL,
                text: 'a tricky coyotl chases off one of your party members.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                choose: () => {
                                    this.game.party.remove(hero);
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} was chased away by the coyotl.`,
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
