import ForageEvent from './forage';
import { Rarity, Trigger, TriggerType } from '../../types';
import Sprites from '../../media/sprites';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class SeedEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.SEED,
                text: `your party finds a mysterious seed in the grass. choose someone to pick it up.`,
                actions: {
                    continue: () => {
                        if (this.game.party.canPickupItems) {
                            this.game.views.setViews(
                                Selectors.heroes(
                                    this.game,
                                    this.game.party.emptyItemSlots(),
                                    (hero: Hero) => ({
                                        choose: () => {
                                            const item: Item = new Item(
                                                'magic seed',
                                                Sprites.SEED,
                                                Rarity.RARE,
                                                `+10% luck`,
                                                function (game: Game, data: Trigger) {
                                                    if (data.type === TriggerType.GET_STATS) {
                                                        data.luck += 10;
                                                    }
                                                }
                                            );
                                            hero.basket.equip(item);
                                            this.game.chain.futureEvent(
                                                new PickupSeedEvent(this.game, hero, item),
                                                6,
                                                () =>
                                                    hero.isInParty(this.game.party) &&
                                                    hero.basket.contains(item)
                                            );
                                            this.game.views.setViews([
                                                {
                                                    image: Sprites.SEED,
                                                    text: `${hero.name} picks up the mysterious seed.`,
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
                            this.game.views.setViews([
                                {
                                    image: Sprites.SEED,
                                    text: `your party's inventory is completely full. your party leaves the mysterious seed.`,
                                    actions: {
                                        continue: () => this.game.progress()
                                    }
                                }
                            ]);
                        }
                    }
                }
            }
        ];
    }
}

class PickupSeedEvent extends EventView {
    constructor(game: Game, private hero: Hero, private item: Item) {
        super(game);
    }

    getViews(): View[] {
        return [
            {
                image: Sprites.SEED,
                text: `${this.hero.name} takes the seed from their bag and plants it. it sprouts into a large plant.`,
                actions: {
                    continue: () => {
                        this.game.chain.futureEvent(new ForageEvent(this.game), 1);
                        this.hero.basket.unequip(this.item);
                        this.game.progress();
                    }
                }
            }
        ];
    }
}
