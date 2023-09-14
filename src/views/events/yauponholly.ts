import { Stats } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class YauponHollyEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.YAUPON_HOLLY,
                text: `your party comes across a yaupon holly. choose someone to brew a drink from it and revert their original stats.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                                select: () => {
                                    hero.refresh(Stats.STRENGTH);
                                    hero.refresh(Stats.WISDOM);
                                    hero.refresh(Stats.DEXTERITY);
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} brewed a drink from the yaupon holly. they regain their original strength, wisdom and dexterity.`,
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
