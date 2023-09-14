import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import EventView from '../event';
import Hero from '../../entities/hero';
import View from '../view';

export default class MerchantEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.MERCHANT,
                text: 'your party comes across a merchant. a party member will get new items to fill their inventory.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(this.game.party.members, (hero: Hero) => ({
                                'get items': () => this.trade(hero)
                            }))
                        )
                }
            }
        ];
    }

    private trade(hero: Hero): void {
        const n = hero.basket.total - hero.basket.itemCount;
        for (let a = 0; a < n; a++) {
            hero.basket.equip(this.game.data.getRandomItem());
        }
        this.game.views.setViews([
            {
                image: hero.sprite,
                text: `${hero.name} got ${n} new item${n === 1 ? '' : 's'} from the merchant.`,
                actions: { continue: () => this.game.progress() }
            }
        ]);
    }
}
