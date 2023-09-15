import { Rarity, Trigger, TriggerType } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class BabyPeccaryEvent extends EventView {
    getViews(): View[] {
        const that = this;
        return [
            {
                image: Sprites.BABY_PECCARY,
                text: `your party finds a lonely baby peccary. choose someone to carry it until the party finds its family.`,
                actions: {
                    continue: () => {
                        if (this.game.party.canPickupItems) {
                            that.game.views.setViews(
                                Selectors.heroes(
                                    this.game,
                                    this.game.party.emptyItemSlots(),
                                    (hero: Hero) => ({
                                        'carry the baby': () => {
                                            const item: Item = new Item(
                                                'baby peccary',
                                                Sprites.BABY_PECCARY,
                                                Rarity.RARE,
                                                `+25% luck\na baby peccary looking for its family.`,
                                                function (game: Game, data: Trigger) {
                                                    if (data.type === TriggerType.GET_STATS) {
                                                        data.luck += 25;
                                                    }
                                                }
                                            );
                                            hero.basket.equip(item);
                                            this.game.chain.futureEvent(
                                                new ReturnBabyEvent(this.game, hero, item),
                                                8,
                                                () =>
                                                    hero.isInParty(this.game.party) &&
                                                    hero.basket.contains(item)
                                            );
                                            that.game.views.setViews([
                                                {
                                                    image: Sprites.BABY_PECCARY,
                                                    text: `${hero.name} picks up the baby peccary.`,
                                                    actions: {
                                                        continue: () => this.game.progress()
                                                    }
                                                }
                                            ]);
                                        }
                                    })
                                )
                            );
                        } else {
                            that.game.views.setViews([
                                {
                                    image: Sprites.BABY_PECCARY,
                                    text: `your party's inventory is completely full. your party leaves the small animal.`,
                                    actions: { continue: () => this.game.progress() }
                                }
                            ]);
                        }
                    }
                }
            }
        ];
    }
}

class ReturnBabyEvent extends EventView {
    constructor(game: Game, private hero: Hero, private item: Item) {
        super(game);
    }

    getViews(): View[] {
        return [
            {
                image: Sprites.BABY_PECCARY,
                text: `${this.hero.name} returns the baby peccary to its family and receives a blessing in return. they are now stronger, wiser and faster.`,
                actions: {
                    continue: () => {
                        this.hero.str++;
                        this.hero.wis++;
                        this.hero.dex++;
                        this.game.history.peopleHelped++;
                        this.hero.basket.unequip(this.item);
                        this.game.progress();
                    }
                }
            }
        ];
    }
}
