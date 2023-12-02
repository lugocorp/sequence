import Sprites from '../../media/sprites';
import EventView from '../event';
import View from '../view';

export default class PlantingSeasonEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.GARDEN,
                text: `your party comes across a small village at the start of the growing season. will they help plant some crops?`,
                actions: {
                    yes: () => {
                        this.game.history.peopleHelped++;
                        for (const hero of this.game.party.members) {
                            hero.health--;
                        }
                        this.game.chain.futureEvent(new GardenBonusEvent(this.game), 8);
                        this.game.views.setViews([
                            {
                                image: Sprites.GARDEN,
                                text: `your party stays a while and plants various crops. they have lost some of their health in the process.`,
                                actions: {
                                    continue: () => this.game.progress()
                                }
                            }
                        ]);
                    },
                    no: () =>
                        this.game.views.setViews([
                            {
                                image: Sprites.GARDEN,
                                text: `your party does not help the village plant any crops.`,
                                actions: {
                                    continue: () => this.game.progress()
                                }
                            }
                        ])
                }
            }
        ];
    }
}

class GardenBonusEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.GARDEN,
                text: `a group approaches your party. they came from a village you helped recently and they have brought food to share.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews([
                            {
                                image: Sprites.GARDEN,
                                text: 'your party is blessed and becomes stronger, smarter and faster as they partake in the feast.',
                                actions: {
                                    continue: () => {
                                        for (const hero of this.game.party.members) {
                                            hero.luck += 5;
                                            hero.str++;
                                            hero.wis++;
                                            hero.dex++;
                                        }
                                        this.game.progress();
                                    }
                                }
                            }
                        ])
                }
            }
        ];
    }
}
