import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import EventView from '../event';
import Hero from '../../entities/hero';
import View from '../view';

export default class MedicineManEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.MEDICINE_MAN,
                text: 'your party comes across a medicine man. he will bless one of your party members in exchange for a gift.',
                actions: { continue: () => this.viewParty() }
            }
        ];
    }

    viewParty(): void {
        if (this.game.party.hasItems) {
            this.game.views.setViews(
                Selectors.heroes(
                    this.game,
                    this.game.party.members.filter((h: Hero) => h.basket.hasItems),
                    (hero: Hero) => ({
                        'make trade': () => this.makeTrade(hero)
                    })
                )
            );
        } else {
            this.game.views.setViews([
                {
                    image: Sprites.MEDICINE_MAN,
                    text: `no one in your party has anything to give.`,
                    actions: {
                        continue: () => this.game.progress()
                    }
                }
            ]);
        }
    }

    makeTrade(hero: Hero): void {
        for (const item of hero.basket.toList()) {
            hero.basket.unequip(item);
        }
        hero.str++;
        hero.wis++;
        hero.dex++;
        this.game.views.setViews([
            {
                image: hero.sprite,
                text: `${hero.name} gifted all their items to the medicine man. they were blessed with strength, wisdom and dexterity.`,
                actions: { continue: () => this.game.progress() }
            }
        ]);
    }
}
