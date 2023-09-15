import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

/**
 * In this event you choose a new party member.
 */
export default class CaravanEvent extends EventView {
    /*
     * private recruitSelector: Selector<Hero>;
     * private memberSelector: Selector<Hero>;
     */
    private recruits: Hero[];

    getViews(): View[] {
        this.recruits = [
            this.game.data.getRandomHero(),
            this.game.data.getRandomHero(),
            this.game.data.getRandomHero()
        ];
        return [
            {
                image: this.recruits[0].sprite,
                text: 'your party comes across a small caravan.',
                actions: {
                    continue: () =>
                        this.game.views.setViews([
                            {
                                image: this.recruits[0].sprite,
                                text: 'one of the travelers would like to join your party.',
                                actions: { continue: () => this.viewRecruits() }
                            }
                        ])
                }
            }
        ];
    }

    viewRecruits(): void {
        this.game.views.setViews(
            Selectors.heroes(this.game, this.recruits, (hero: Hero) => ({
                choose: () => {
                    if (this.game.party.isFull) {
                        this.pleaseRemove(hero);
                    } else {
                        this.finished(hero);
                    }
                },
                'view party': () => this.viewParty()
            }))
        );
    }

    viewParty(): void {
        this.game.views.setViews(
            Selectors.heroes(this.game, this.game.party.members, (_: Hero) => ({
                back: () => this.viewRecruits()
            }))
        );
    }

    pleaseRemove(recruit: Hero): void {
        this.game.views.setViews([
            {
                image: recruit.sprite,
                text: 'one of your party members would like to join the caravan.',
                actions: { continue: () => this.removeMember(recruit) }
            }
        ]);
    }

    removeMember(recruit: Hero): void {
        this.game.views.setViews(
            Selectors.heroes(this.game, this.game.party.members, (hero: Hero) => ({
                choose: () => this.finished(recruit, hero)
            }))
        );
    }

    finished(recruit: Hero, member?: Hero): void {
        let text = `${recruit.name} left the caravan for your party!`;
        if (this.game.party.isFull) {
            text += ` ${member.name} left your party for the caravan.`;
            this.game.party.remove(member);
        }
        this.game.party.add(recruit);
        this.game.views.setViews([
            { image: recruit.sprite, text, actions: { continue: () => this.game.progress() } }
        ]);
    }
}
