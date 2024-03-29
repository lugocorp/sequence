import { Skill, TriggerType, Trigger, Time } from '../types';
import EventView from '../views/event';
import Sprites from '../media/sprites';
import Hero from '../entities/hero';
import View from '../views/view';
import Game from '../game';

export type HeroGenerator = (game: Game) => Hero;

export function turtle(game: Game): Hero {
    return new Hero(game, Sprites.TURTLE, 'turtle', 'four leggeds', 1, 1, 1, 2, 0);
}

export const heroes: HeroGenerator[] = [
    (game: Game) =>
        new Hero(
            game,
            Sprites.CORN_WOMAN,
            'corn woman',
            'oneida',
            6,
            0,
            0,
            2,
            1,
            [ undefined, undefined ],
            'summons her younger sister when she leaves the party',
            (game: Game, data: Trigger) => {
                if (data.type === TriggerType.LEAVE_PARTY) {
                    summon(game, game.data.getNamedHero('squash lady'));
                }
            }
        ),
    (game: Game) =>
        new Hero(
            game,
            Sprites.SQUASH_LADY,
            'squash lady',
            'piscataway',
            0,
            6,
            0,
            2,
            1,
            [ undefined, undefined ],
            'summons her younger sister when she leaves the party',
            (game: Game, data: Trigger) => {
                if (data.type === TriggerType.LEAVE_PARTY) {
                    summon(game, game.data.getNamedHero('bean girl'));
                }
            }
        ),
    (game: Game) => new Hero(game, Sprites.BEAN_GIRL, 'bean girl', 'narragansett', 0, 0, 6, 2, 1),
    (game: Game) =>
        new Hero(game, Sprites.MINDIMOOYENH, 'mindimooyenh', 'ojibwe', 3, 3, 0, 4, 2, [
            Skill.DIPLOMACY,
            undefined
        ]),
    (game: Game) =>
        new Hero(game, Sprites.GUECHA, 'guecha', 'muisca', 3, 0, 3, 4, 2, [
            Skill.PROWESS,
            undefined
        ]),
    (game: Game) =>
        new Hero(game, Sprites.BIRD_CATCHER, 'bird catcher', 'taíno', 0, 3, 3, 4, 2, [
            Skill.STEALTH,
            undefined
        ]),
    (game: Game) => {
        const hero = new Hero(
            game,
            Sprites.BEAD_QUEEN,
            'bead queen',
            'diné',
            2,
            2,
            2,
            4,
            4,
            [ Skill.ENDURANCE, Skill.DIPLOMACY ],
            '+5% luck for each equipped item'
        );
        hero.effect = (game: Game, data: Trigger) => {
            if (data.type === TriggerType.GET_STATS) {
                data.luck += 5 * hero.basket.itemCount;
            }
        };
        return hero;
    },
    (game: Game) =>
        new Hero(game, Sprites.HIGHLANDER, 'highlander', 'guachichil', 2, 2, 2, 4, 2, [
            Skill.PROWESS,
            Skill.STEALTH
        ]),
    (game: Game) =>
        new Hero(
            game,
            Sprites.GUARDIAN,
            'guardian',
            'wampanoag',
            3,
            3,
            0,
            2,
            2,
            [ Skill.PROWESS, Skill.DIPLOMACY ],
            '+1 stats when you have no other party members',
            (game: Game, data: Trigger) => {
                if (data.type === TriggerType.GET_STATS && game.party.size === 1) {
                    data.str++;
                    data.wis++;
                    data.dex++;
                }
            }
        ),
    (game: Game) => {
        const hero = new Hero(
            game,
            Sprites.EAGLE_KNIGHT,
            'eagle knight',
            'mexica',
            3,
            0,
            3,
            2,
            2,
            [ Skill.PROWESS, Skill.ENDURANCE ],
            'will eventually heal from 1 base health'
        );
        const EagleKnightHealEvent = class extends EventView {
            getViews(): View[] {
                return [
                    {
                        image: hero.sprite,
                        text: `${hero.name} healed from low health.`,
                        actions: {
                            continue: () => {
                                hero.health++;
                                game.progress();
                            }
                        }
                    }
                ];
            }
        };
        hero.effect = (game: Game, data: Trigger) => {
            if (data.type === TriggerType.LOSE_HEALTH && hero.stats.health === 1) {
                game.chain.futureEvent(new EagleKnightHealEvent(game), 6, () =>
                    game.party.contains(hero)
                );
            }
        };
        return hero;
    },
    (game: Game) =>
        new Hero(
            game,
            Sprites.MEDICINE_WOMAN,
            'medicine woman',
            'mapuche',
            0,
            3,
            3,
            2,
            2,
            [ Skill.ENDURANCE, Skill.DIPLOMACY ],
            'cannot lose any base luck',
            (game: Game, data: Trigger) => {
                if (data.type === TriggerType.LOSS_CHECK) {
                    data.luck = false;
                }
            }
        ),
    (game: Game) =>
        new Hero(game, Sprites.KAMAYUQ, 'kamayuq', 'quechua', 3, 0, 0, 2, 2, [
            Skill.PROWESS,
            Skill.STEALTH
        ]),
    (game: Game) =>
        new Hero(game, Sprites.GOURD_ELDER, 'gourd elder', 'aymara', 0, 3, 0, 2, 2, [
            Skill.DIPLOMACY,
            Skill.STEALTH
        ]),
    (game: Game) =>
        new Hero(game, Sprites.HOOP_DANCER, 'hoop dancer', 'nehiyaw', 0, 0, 3, 2, 2, [
            Skill.ENDURANCE,
            Skill.STEALTH
        ]),
    (game: Game) =>
        new Hero(game, Sprites.SWORD_HOLDER, 'sword holder', 'oceti sakowin', 6, 0, 0, 3, 1, [
            Skill.PROWESS,
            undefined
        ]),
    (game: Game) =>
        new Hero(game, Sprites.TRACKER, 'tracker', 'inuit', 0, 6, 0, 3, 1, [
            Skill.ENDURANCE,
            undefined
        ]),
    (game: Game) =>
        new Hero(game, Sprites.RUNNER, 'runner', 'ohkay owingeh', 0, 0, 6, 3, 1, [
            Skill.ENDURANCE,
            undefined
        ]),

    (game: Game) => {
        const hero = new Hero(
            game,
            Sprites.WANDERER,
            'wanderer',
            'omaha',
            3,
            0,
            0,
            3,
            2,
            [ undefined, undefined ],
            '+1 stats and +10% luck when she joins your party'
        );
        let boosts = 0;
        hero.effect = (game: Game, data: Trigger) => {
            if (data.type === TriggerType.JOIN_PARTY) {
                boosts++;
            }
            if (data.type === TriggerType.GET_STATS) {
                data.str += boosts;
                data.wis += boosts;
                data.dex += boosts;
                data.luck += boosts * 10;
            }
        };
        return hero;
    },
    (game: Game) =>
        new Hero(
            game,
            Sprites.MOON_PRIESTESS,
            'moon priestess',
            'itza',
            0,
            3,
            0,
            3,
            2,
            [ undefined, undefined ],
            '+1 stats at night',
            (game: Game, data: Trigger) => {
                if (data.type === TriggerType.GET_STATS && game.world.time === Time.NIGHT) {
                    data.str++;
                    data.wis++;
                    data.dex++;
                }
            }
        ),
    (game: Game) => {
        const hero = new Hero(
            game,
            Sprites.FISHERMAN,
            'fisherman',
            'lummi',
            0,
            0,
            3,
            3,
            2,
            [ undefined, undefined ],
            'will eventually rejoin your party if he has leftover health'
        );
        hero.effect = (game: Game, data: Trigger) => {
            if (data.type === TriggerType.LEAVE_PARTY && hero.stats.health > 0) {
                summon(game, hero);
            }
        };
        return hero;
    }
];

export function summon(game: Game, hero: Hero): void {
    const SummonEvent = class extends EventView {
        getViews(): View[] {
            return [
                {
                    image: hero.sprite,
                    text: `${hero.name} joins your party.`,
                    actions: {
                        continue: () => {
                            game.party.add(hero);
                            game.progress();
                        }
                    }
                }
            ];
        }
    };
    game.chain.futureEvent(
        new SummonEvent(game),
        4,
        () => !game.party.isFull && !game.party.contains(hero)
    );
}
