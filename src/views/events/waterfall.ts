import { Stats } from '../../types';
import EnumsHelper from '../../logic/enums';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

export default class WaterfallEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.WATERFALL,
                text: 'your party comes to a cascading waterfall. choose someone to combine their base stats into one random stat.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                choose: () => {
                                    const stat = EnumsHelper.getRandomStat();
                                    if (stat === Stats.STRENGTH) {
                                        hero.str += hero.wis + hero.dex;
                                        hero.wis = 0;
                                        hero.dex = 0;
                                    }
                                    if (stat === Stats.WISDOM) {
                                        hero.wis += hero.str + hero.dex;
                                        hero.str = 0;
                                        hero.dex = 0;
                                    }
                                    if (stat === Stats.DEXTERITY) {
                                        hero.dex += hero.str + hero.wis;
                                        hero.str = 0;
                                        hero.wis = 0;
                                    }
                                    this.game.views.setViews([
                                        {
                                            image: hero.sprite,
                                            text: `${hero.name} got their base stats rearranged.`,
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
