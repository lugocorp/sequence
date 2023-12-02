import { Trigger, TriggerType, Rarity, Weather, Time } from '../types';
import EventView from '../views/event';
import Sprites from '../media/sprites';
import Item from '../entities/item';
import Hero from '../entities/hero';
import View from '../views/view';
import Game from '../game';

export type ItemGenerator = () => Item;

export const items: ItemGenerator[] = [
    // Common items
    () =>
        new Item('corn', Sprites.CORN, Rarity.COMMON, '+1 strength', (game: Game, data: Trigger) =>
            stats(data, 1, 0, 0, 0, 0)
        ),
    () =>
        new Item(
            'squash',
            Sprites.SQUASH,
            Rarity.COMMON,
            '+1 wisdom',
            (game: Game, data: Trigger) => stats(data, 0, 1, 0, 0, 0)
        ),
    () =>
        new Item(
            'beans',
            Sprites.BEANS,
            Rarity.COMMON,
            '+1 dexterity',
            (game: Game, data: Trigger) => stats(data, 0, 0, 1, 0, 0)
        ),
    () =>
        new Item(
            'turquoise bead',
            Sprites.TURQUOISE_BEAD,
            Rarity.COMMON,
            '+10% luck',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 10, 0)
        ),
    () =>
        new Item(
            'gold bead',
            Sprites.GOLD_BEAD,
            Rarity.COMMON,
            '+1 health during the day',
            (game: Game, data: Trigger) =>
                game.world.time === Time.DAY ? stats(data, 0, 0, 0, 0, 1) : undefined
        ),
    () =>
        new Item(
            'silver bead',
            Sprites.SILVER_BEAD,
            Rarity.COMMON,
            '+1 health at night',
            (game: Game, data: Trigger) =>
                game.world.time === Time.NIGHT ? stats(data, 0, 0, 0, 0, 1) : undefined
        ),
    () =>
        new Item(
            'bad medicine',
            Sprites.BAD_MEDICINE,
            Rarity.COMMON,
            '-5% luck',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, -5, 0)
        ),

    // Uncommon items
    () =>
        new Item(
            'gold ring',
            Sprites.GOLD_RING,
            Rarity.UNCOMMON,
            '+2 strength\n-1 wisdom',
            (game: Game, data: Trigger) => stats(data, 2, -1, 0, 0, 0)
        ),
    () =>
        new Item(
            'corn soup',
            Sprites.CORN_SOUP,
            Rarity.UNCOMMON,
            '+2 strength\n-1 dexterity',
            (game: Game, data: Trigger) => stats(data, 2, 0, -1, 0, 0)
        ),
    () =>
        new Item(
            'jade amulet',
            Sprites.JADE_AMULET,
            Rarity.UNCOMMON,
            '+2 wisdom\n-1 strength',
            (game: Game, data: Trigger) => stats(data, -1, 2, 0, 0, 0)
        ),
    () =>
        new Item(
            'squash soup',
            Sprites.SQUASH_SOUP,
            Rarity.UNCOMMON,
            '+2 wisdom\n-1 dexterity',
            (game: Game, data: Trigger) => stats(data, 0, 2, -1, 0, 0)
        ),
    () =>
        new Item(
            'beaded moccasins',
            Sprites.BEADED_MOCCASINS,
            Rarity.UNCOMMON,
            '+2 dexterity\n-1 strength',
            (game: Game, data: Trigger) => stats(data, -1, 0, 2, 0, 0)
        ),
    () =>
        new Item(
            'bean soup',
            Sprites.BEAN_SOUP,
            Rarity.UNCOMMON,
            '+2 dexterity\n-1 wisdom',
            (game: Game, data: Trigger) => stats(data, 0, -1, 2, 0, 0)
        ),
    () =>
        new Item(
            'gourd bottle',
            Sprites.GOURD_BOTTLE,
            Rarity.UNCOMMON,
            '+1 health',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, 1)
        ),
    () =>
        new Item(
            'gold bracelet',
            Sprites.GOLD_BRACELET,
            Rarity.UNCOMMON,
            '+25% luck during the day',
            (game: Game, data: Trigger) =>
                game.world.time === Time.DAY ? stats(data, 0, 0, 0, 25, 0) : undefined
        ),
    () =>
        new Item(
            'silver bracelet',
            Sprites.SILVER_BRACELET,
            Rarity.UNCOMMON,
            '+25% luck at night',
            (game: Game, data: Trigger) =>
                game.world.time === Time.NIGHT ? stats(data, 0, 0, 0, 25, 0) : undefined
        ),
    () =>
        new Item(
            'cursed ring',
            Sprites.CURSED_RING,
            Rarity.UNCOMMON,
            '-1 strength',
            (game: Game, data: Trigger) => stats(data, -1, 0, 0, 0, 0)
        ),
    () =>
        new Item(
            'cursed amulet',
            Sprites.CURSED_AMULET,
            Rarity.UNCOMMON,
            '-1 wisdom',
            (game: Game, data: Trigger) => stats(data, 0, -1, 0, 0, 0)
        ),
    () =>
        new Item(
            'cursed sandals',
            Sprites.CURSED_SANDALS,
            Rarity.UNCOMMON,
            '-1 dexterity',
            (game: Game, data: Trigger) => stats(data, 0, 0, -1, 0, 0)
        ),

    // Rare items
    () =>
        new Item(
            'macuahuitl',
            Sprites.MACUAHUITL,
            Rarity.RARE,
            '+2 strength',
            (game: Game, data: Trigger) => stats(data, 2, 0, 0, 0, 0)
        ),
    () =>
        new Item('quipu', Sprites.QUIPU, Rarity.RARE, '+2 wisdom', (game: Game, data: Trigger) =>
            stats(data, 0, 2, 0, 0, 0)
        ),
    () =>
        new Item(
            'mogollon',
            Sprites.MOGOLLON,
            Rarity.RARE,
            '+2 dexterity',
            (game: Game, data: Trigger) => stats(data, 0, 0, 2, 0, 0)
        ),
    () =>
        new Item(
            'medicine bag',
            Sprites.MEDICINE_BAG,
            Rarity.RARE,
            '+25% luck',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 25, 0)
        ),
    () =>
        new Item(
            'pemmican',
            Sprites.PEMMICAN,
            Rarity.RARE,
            '+2 health',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, 2)
        ),
    () =>
        new Item(
            'sunflower',
            Sprites.SUNFLOWER,
            Rarity.RARE,
            '+1 str, wis and dex in sunny weather',
            (game: Game, data: Trigger) =>
                game.world.weather === Weather.SUN ? stats(data, 1, 1, 1, 0, 0) : undefined
        ),
    () =>
        new Item(
            'paw paw',
            Sprites.PAW_PAW,
            Rarity.RARE,
            '+1 str, wis and dex in rainy weather',
            (game: Game, data: Trigger) =>
                game.world.weather === Weather.RAIN ? stats(data, 1, 1, 1, 0, 0) : undefined
        ),
    () =>
        new Item(
            'pitaya',
            Sprites.PITAYA,
            Rarity.RARE,
            '+1 str, wis and dex in windy weather',
            (game: Game, data: Trigger) =>
                game.world.weather === Weather.WIND ? stats(data, 1, 1, 1, 0, 0) : undefined
        ),
    () =>
        new Item(
            'crowberries',
            Sprites.CROWBERRIES,
            Rarity.RARE,
            '+1 str, wis and dex in snowy weather',
            (game: Game, data: Trigger) =>
                game.world.weather === Weather.SNOW ? stats(data, 1, 1, 1, 0, 0) : undefined
        ),
    () =>
        new Item(
            'passionflower tea',
            Sprites.PASSIONFLOWER_TEA,
            Rarity.RARE,
            '-1 health',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, -1)
        ),

    // Legendary items
    () =>
        new Item(
            'condor feather',
            Sprites.CONDOR_FEATHER,
            Rarity.LEGENDARY,
            'cannot lose any base strength',
            (game: Game, data: Trigger) => canLoseStats(data, false, true, true, true)
        ),
    () =>
        new Item(
            'owl feather',
            Sprites.OWL_FEATHER,
            Rarity.LEGENDARY,
            'cannot lose any base wisdom',
            (game: Game, data: Trigger) => canLoseStats(data, true, false, true, true)
        ),
    () =>
        new Item(
            'falcon feather',
            Sprites.FALCON_FEATHER,
            Rarity.LEGENDARY,
            'cannot lose any base dexterity',
            (game: Game, data: Trigger) => canLoseStats(data, true, true, false, true)
        ),
    () =>
        new Item(
            'succotash',
            Sprites.SUCCOTASH,
            Rarity.LEGENDARY,
            '+1 strength\n+1 wisdom\n+1 dexterity',
            (game: Game, data: Trigger) => stats(data, 1, 1, 1, 0, 0)
        ),
    () =>
        new Item(
            'eagle feather',
            Sprites.EAGLE_FEATHER,
            Rarity.LEGENDARY,
            '+100% luck',
            (game: Game, data: Trigger) => stats(data, 0, 0, 0, 100, 0)
        ),

    // Mythic items
    () => {
        const item = new Item(
            'golden mirror',
            Sprites.GOLDEN_MIRROR,
            Rarity.MYTHIC,
            'eventually summons a reflection of the bearer if they leave the party',
            undefined
        );
        item.effect = (game: Game, data: Trigger) => {
            if (data.type === TriggerType.LEAVE_PARTY) {
                const GoldenMirrorEvent = class extends EventView {
                    getViews(): View[] {
                        return [
                            {
                                image: Sprites.GOLDEN_MIRROR,
                                text: `${item.bearer.name} is summoned to your party by the magic of a golden mirror.`,
                                actions: {
                                    continue: () => {
                                        game.party.add(game.data.getNamedHero(item.bearer.name));
                                        game.progress();
                                    }
                                }
                            }
                        ];
                    }
                };
                game.chain.futureEvent(new GoldenMirrorEvent(game), 3, () => !game.party.isFull);
            }
        };
        return item;
    },
    () => {
        const item = new Item(
            'deer totem',
            Sprites.DEER_TOTEM,
            Rarity.MYTHIC,
            "doubles the bearer's base health",
            undefined
        );
        item.effect = (game: Game, data: Trigger) =>
            doubleBaseStats(data, item.bearer, false, false, false, true);
        return item;
    },
    () => {
        const item = new Item(
            'buffalo totem',
            Sprites.BUFFALO_TOTEM,
            Rarity.MYTHIC,
            "doubles the bearer's base strength",
            undefined
        );
        item.effect = (game: Game, data: Trigger) =>
            doubleBaseStats(data, item.bearer, true, false, false, false);
        return item;
    },
    () => {
        const item = new Item(
            'turtle totem',
            Sprites.TURTLE_TOTEM,
            Rarity.MYTHIC,
            "doubles the bearer's base wisdom",
            undefined
        );
        item.effect = (game: Game, data: Trigger) =>
            doubleBaseStats(data, item.bearer, false, true, false, false);
        return item;
    },
    () => {
        const item = new Item(
            'coyotl totem',
            Sprites.COYOTL_TOTEM,
            Rarity.MYTHIC,
            "doubles the bearer's base dexterity",
            undefined
        );
        item.effect = (game: Game, data: Trigger) =>
            doubleBaseStats(data, item.bearer, false, false, true, false);
        return item;
    },
    () =>
        new Item(
            'turquoise ring',
            Sprites.TURQUOISE_RING,
            Rarity.MYTHIC,
            '+1 strength\n+1 wisdom\n+1 dexterity\n+100% luck\n+3 health',
            (game: Game, data: Trigger) => stats(data, 1, 1, 1, 100, 3)
        )
];

function stats(
    data: Trigger,
    str: number,
    wis: number,
    dex: number,
    luck: number,
    health: number
): void {
    if (data.type === TriggerType.GET_STATS) {
        data.str += str;
        data.wis += wis;
        data.dex += dex;
        data.luck += luck;
        data.health += health;
    }
}

function canLoseStats(
    data: Trigger,
    str: boolean,
    wis: boolean,
    dex: boolean,
    luck: boolean
): void {
    if (data.type === TriggerType.LOSS_CHECK) {
        data.str = data.str && str;
        data.wis = data.wis && wis;
        data.dex = data.dex && dex;
        data.luck = data.luck && luck;
    }
}

function doubleBaseStats(
    data: Trigger,
    hero: Hero,
    str: boolean,
    wis: boolean,
    dex: boolean,
    health: boolean
): void {
    if (data.type === TriggerType.GET_STATS) {
        data.str += str ? hero.str : 0;
        data.wis += wis ? hero.wis : 0;
        data.dex += dex ? hero.dex : 0;
        data.health += health ? hero.health : 0;
    }
}
