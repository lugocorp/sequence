import { Stats } from '../../types';
import Hero from '../../entities/hero';
import Sprites from '../../media/sprites';
import { orange } from '../../media/colors';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

type Challenger = {
    name: string;
    sprite: Sprites;
    strength: number;
    wisdom: number;
    dexterity: number;
};

export default class ChallengeEvent extends EventView {
    private challenger: Challenger;
    private expectation: Stats;

    getViews(): View[] {
        const that = this;
        this.challenger = {
            ...this.game.data.getRandomSpirit(),
            strength: Random.max(7),
            wisdom: Random.max(7),
            dexterity: Random.max(7)
        };
        this.expectation = EnumsHelper.getRandomStat();
        return [
            {
                image: this.challenger.sprite,
                text: `a powerful spirit offers your party a challenge. choose someone to participate.`,
                actions: { continue: () => that.viewChallenger() }
            }
        ];
    }

    viewChallenger(): void {
        const that = this;
        const stat = (n: number): string => (n > 9 ? `\t${n}\t` : `\t${n}\t\t`);
        const desc = `${this.challenger.name}\nstr:${stat(this.challenger.strength)}wis:${stat(
            this.challenger.wisdom
        )}dex:${stat(this.challenger.dexterity)}`;
        const text = `${desc}\nchallenges you to a test of ${orange(
            EnumsHelper.getStatName(this.expectation)
        )}.`;
        this.game.views.setViews([
            {
                image: this.challenger.sprite,
                text,
                actions: {
                    'view party': () => that.viewParty()
                }
            }
        ]);
    }

    viewParty(): void {
        const that = this;
        this.game.views.setViews(
            Selectors.heroes(
                this.game,
                this.game.party.members,
                (hero: Hero) => ({
                    choose: () => that.finish(hero),
                    'view spirit': () => that.viewChallenger()
                }),
                (hero: Hero) =>
                    `${this.coloredRate(
                        this.playerStatsHigher(hero) ? 100 : hero.stats.luck
                    )} chance of success`
            )
        );
    }

    finish(hero: Hero): void {
        const that = this;
        const result: boolean = this.playerOvercomesChallenge(hero);
        if (result) {
            this.game.history.challengesWon++;
            hero.energy--;
        } else {
            hero.energy = -100;
        }
        this.game.views.setViews([
            {
                image: hero.sprite,
                text: result
                    ? `${hero.name} overcame the spirit's challenge!`
                    : `${hero.name} did not succeed in the spirit's challenge.`,
                actions: {
                    continue: () =>
                        that.game.views.setViews([
                            {
                                image: hero.sprite,
                                text: result
                                    ? `${hero.name} is triumphant but tired. they have lost some of their energy.`
                                    : `${hero.name} used up all their energy in the challenge.`,
                                actions: { continue: () => this.game.progress() }
                            }
                        ])
                }
            }
        ]);
    }

    private playerStatsHigher(hero: Hero): boolean {
        const sum1: number = hero.getStat(this.expectation);
        const sum2: number = {
            [Stats.STRENGTH]: this.challenger.strength,
            [Stats.WISDOM]: this.challenger.wisdom,
            [Stats.DEXTERITY]: this.challenger.dexterity
        }[this.expectation];
        return sum1 >= sum2;
    }

    playerOvercomesChallenge(hero: Hero): boolean {
        return this.playerStatsHigher(hero) || hero.lucky();
    }
}
