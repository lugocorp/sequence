import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

/**
 * In this event you choose a party member to receive some pre-selected item.
 */
export default class OfferingEvent extends EventView {
    private gift: Item;

    constructor(game: Game, gift?: Item) {
        super(game);
        this.gift = gift || this.game.data.getRandomItem();
    }

    getViews(): View[] {
        if (!this.game.party.emptyItemSlots().length) {
            return [
                {
                    image: Sprites.BUTTERFLY,
                    text: `a generous spirit offers a gift of ${this.gift.name} to your party, but no one has space for more items. the spirit conceals itself once more.`,
                    actions: { continue: () => this.game.progress() }
                }
            ];
        }
        return [
            {
                image: Sprites.BUTTERFLY,
                text: `a generous spirit offers a gift of ${this.gift.name} to your party. choose someone to accept it.`,
                actions: {
                    continue: () => this.viewGift()
                }
            }
        ];
    }

    viewGift(): void {
        this.game.views.setViews([
            {
                image: this.gift.sprite,
                text: this.gift.descriptionText(),
                actions: {
                    'view party': () => this.viewParty()
                }
            }
        ]);
    }

    viewParty(): void {
        if (this.game.party.canPickupItems) {
            this.game.views.setViews(
                Selectors.heroes(this.game.party.emptyItemSlots(), (hero: Hero) => ({
                    choose: () => this.finish(hero),
                    'view gift': () => this.viewGift()
                }))
            );
        } else {
            this.game.views.setViews([
                {
                    image: this.game.party.members[0].sprite,
                    text: `no one in your party has space for new items.`,
                    actions: { continue: () => this.game.progress() }
                }
            ]);
        }
    }

    finish(hero: Hero): void {
        hero.basket.equip(this.gift);
        this.game.views.setViews([
            {
                image: Sprites.BUTTERFLY,
                text: `${hero.name} was given ${this.gift.name}. the spirit conceals itself once more.`,
                actions: { continue: () => this.game.progress() }
            }
        ]);
    }
}
