import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import Hero from '../../entities/hero';
import EventView from '../event';
import Game from '../../game';
import View from '../view';

export default class RiverEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.RIVER,
                text: 'your party approaches a dangerous, fast moving river. choose a party member to get closer for a blessing, but they may get swept down the river.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            Selectors.heroes(
                                this.game,
                                this.game.party.members,
                                (hero: Hero) => ({
                                    'approach river': () => this.river(hero)
                                }),
                                (hero: Hero) =>
                                    `${this.coloredRate(
                                        100 - hero.stats.luck,
                                        true
                                    )} chance to fall in`
                            )
                        )
                }
            }
        ];
    }

    river(hero: Hero): void {
        hero.str++;
        hero.wis++;
        hero.dex++;
        this.game.views.setViews([
            {
                image: hero.sprite,
                text: `${hero.name} became stronger, wiser, and faster by the river!`,
                actions: {
                    continue: () => {
                        if (hero.lucky()) {
                            this.game.progress();
                        } else {
                            this.consequence(hero);
                        }
                    }
                }
            }
        ]);
    }

    consequence(hero: Hero): void {
        this.game.party.remove(hero);
        this.game.chain.futureEvent(
            new RetrieveEvent(this.game, hero),
            5,
            () => !this.game.party.isFull
        );
        this.game.views.setViews([
            {
                image: Sprites.RIVER,
                text: `${hero.name} was swept away by the river! you may meet them downstream if your party can use more members.`,
                actions: { continue: () => this.game.progress() }
            }
        ]);
    }
}

class RetrieveEvent extends EventView {
    constructor(game: Game, private hero: Hero) {
        super(game);
    }

    getViews(): View[] {
        return [
            {
                image: this.hero.sprite,
                text: `your party reunites with ${this.hero.name} after they were swept away by a river.`,
                actions: {
                    continue: () => {
                        this.game.party.add(this.hero);
                        this.game.progress();
                    }
                }
            }
        ];
    }
}
