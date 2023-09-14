import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class ThreeSistersEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.THREE_SISTERS,
                text: 'your party comes across a three sisters garden. you may choose someone to eat these crops and become stronger.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                select: () => {
                                    hero.luck += 5;
                                    hero.str++;
                                    hero.wis++;
                                    hero.dex++;
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} ate the plants and got stronger, smarter and faster.`,
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
