import { Skill } from '../../types';
import Hero from '../../entities/hero';
import Sprites from '../../media/sprites';
import EnumsHelper from '../../logic/enums';
import Random from '../../logic/random';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';

type Request = {
    name: string;
    sprite: Sprites;
    skill: Skill;
};

export default class RequestEvent extends EventView {
    getViews(): View[] {
        const challenger: Request = {
            ...this.game.data.getRandomSpirit(),
            skill: Random.element(EnumsHelper.skills())
        };
        const spiritView: View = {
            image: challenger.sprite,
            text: `${challenger.name}\nrequests help from someone with ${challenger.skill}.`,
            actions: {
                'view party': () =>
                    this.game.views.setViews(
                        Selectors.heroes(
                            this.game,
                            this.game.party.members,
                            (hero: Hero) => ({
                                choose: () => {
                                    const result: boolean = this.playerSatisfiesRequest(
                                        hero,
                                        challenger
                                    );
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
                                                ? `${hero.name} completed the spirit's request!`
                                                : `${hero.name} did not complete the spirit's request.`,
                                            actions: {
                                                continue: () =>
                                                    this.game.views.setViews([
                                                        {
                                                            image: hero.sprite,
                                                            text: result
                                                                ? `${hero.name} is successful but tired. they have lost some of their energy.`
                                                                : `${hero.name} used up all their energy in the request.`,
                                                            actions: {
                                                                continue: () => this.game.progress()
                                                            }
                                                        }
                                                    ])
                                            }
                                        }
                                    ]);
                                },
                                'view spirit': () => this.game.views.setViews([ spiritView ])
                            }),
                            (hero: Hero) =>
                                `${this.coloredRate(
                                    EnumsHelper.hasSkill(hero.skills, challenger.skill)
                                        ? 100
                                        : hero.stats.luck
                                )} chance of success`
                        )
                    )
            }
        };
        return [
            {
                image: challenger.sprite,
                text: `an ethereal spirit makes a request of your party. choose someone to help.`,
                actions: {
                    continue: () => this.game.views.setViews([ spiritView ])
                }
            }
        ];
    }

    private playerSatisfiesRequest(hero: Hero, challenger: Request): boolean {
        return EnumsHelper.hasSkill(hero.skills, challenger.skill) || hero.lucky();
    }
}
