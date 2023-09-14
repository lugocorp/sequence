import { Skill } from '../../types';
import Random from '../../logic/random';
import EnumsHelper from '../../logic/enums';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class StormEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.STORM,
                text: `a storm blows over your party! someone will be mixed up by this ordeal.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                select: () => {
                                    if (hero.skills[0] !== undefined) {
                                        hero.skills[0] = Random.element(EnumsHelper.skills());
                                        if (hero.skills[1] !== undefined) {
                                            hero.skills[1] = Random.element(
                                                EnumsHelper.skills().filter(
                                                    (x: Skill) => x !== hero.skills[0]
                                                )
                                            );
                                        }
                                    }
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} got their skills randomized by the storm.`,
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
