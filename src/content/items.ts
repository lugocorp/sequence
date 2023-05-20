import { Trigger, TriggerType, Rarity, Weather, Time } from '../types';
import EventView from '../views/event';
import Sprites from '../media/sprites';
import Action from '../ui/action';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Game from '../game';

export type ItemGenerator = () => Item;

export const items: ItemGenerator[] = [
  // Common items
  () =>
    new Item('corn', Sprites.CORN, Rarity.COMMON, '+1 strength', (game: Game, data: Trigger) =>
      stats(data, 1, 0, 0, 0, 0)
    ),
  () =>
    new Item('squash', Sprites.SQUASH, Rarity.COMMON, '+1 wisdom', (game: Game, data: Trigger) =>
      stats(data, 0, 1, 0, 0, 0)
    ),
  () =>
    new Item('beans', Sprites.BEANS, Rarity.COMMON, '+1 dexterity', (game: Game, data: Trigger) =>
      stats(data, 0, 0, 1, 0, 0)
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
      Sprites.TURQUOISE_BEAD,
      Rarity.COMMON,
      '+1 energy during the day',
      (game: Game, data: Trigger) =>
        game.world.time === Time.DAY ? stats(data, 0, 0, 0, 0, 1) : undefined
    ),
  () =>
    new Item(
      'silver bead',
      Sprites.TURQUOISE_BEAD,
      Rarity.COMMON,
      '+1 energy at night',
      (game: Game, data: Trigger) =>
        game.world.time === Time.NIGHT ? stats(data, 0, 0, 0, 0, 1) : undefined
    ),
  () =>
    new Item(
      'bad medicine',
      Sprites.TURQUOISE_BEAD,
      Rarity.COMMON,
      '-5% luck',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, -5, 0)
    ),

  // Uncommon items
  () =>
    new Item(
      'gold ring',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 strength\n-1 wisdom',
      (game: Game, data: Trigger) => stats(data, 2, -1, 0, 0, 0)
    ),
  () =>
    new Item(
      'corn soup',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 strength\n-1 dexterity',
      (game: Game, data: Trigger) => stats(data, 2, 0, -1, 0, 0)
    ),
  () =>
    new Item(
      'jade amulet',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 wisdom\n-1 strength',
      (game: Game, data: Trigger) => stats(data, -1, 2, 0, 0, 0)
    ),
  () =>
    new Item(
      'squash soup',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 wisdom\n-1 dexterity',
      (game: Game, data: Trigger) => stats(data, 0, 2, -1, 0, 0)
    ),
  () =>
    new Item(
      'beaded moccasins',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 dexterity\n-1 strength',
      (game: Game, data: Trigger) => stats(data, -1, 0, 2, 0, 0)
    ),
  () =>
    new Item(
      'bean soup',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+2 dexterity\n-1 wisdom',
      (game: Game, data: Trigger) => stats(data, 0, -1, 2, 0, 0)
    ),
  () =>
    new Item(
      'gourd bottle',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+1 energy',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, 1)
    ),
  () =>
    new Item(
      'gold bracelet',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+25% luck during the day',
      (game: Game, data: Trigger) =>
        game.world.time === Time.DAY ? stats(data, 0, 0, 0, 25, 0) : undefined
    ),
  () =>
    new Item(
      'silver bracelet',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '+25% luck at night',
      (game: Game, data: Trigger) =>
        game.world.time === Time.NIGHT ? stats(data, 0, 0, 0, 25, 0) : undefined
    ),
  () =>
    new Item(
      'cursed ring',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '-1 strength',
      (game: Game, data: Trigger) => stats(data, -1, 0, 0, 0, 0)
    ),
  () =>
    new Item(
      'cursed amulet',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '-1 wisdom',
      (game: Game, data: Trigger) => stats(data, 0, -1, 0, 0, 0)
    ),
  () =>
    new Item(
      'cursed sandals',
      Sprites.TURQUOISE_BEAD,
      Rarity.UNCOMMON,
      '-1 dexterity',
      (game: Game, data: Trigger) => stats(data, 0, 0, -1, 0, 0)
    ),

  // Rare items
  () =>
    new Item(
      'macuahuitl',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+2 strength',
      (game: Game, data: Trigger) => stats(data, 2, 0, 0, 0, 0)
    ),
  () =>
    new Item(
      'quipu',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+2 wisdom',
      (game: Game, data: Trigger) => stats(data, 0, 2, 0, 0, 0)
    ),
  () =>
    new Item(
      'mogollon',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+2 dexterity',
      (game: Game, data: Trigger) => stats(data, 0, 0, 2, 0, 0)
    ),
  () =>
    new Item(
      'medicine bag',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+25% luck',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, 25, 0)
    ),
  () =>
    new Item(
      'pemmican',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+2 energy',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, 2)
    ),
  () =>
    new Item(
      'sunflower',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+1 str, wis and dex in sunny weather',
      (game: Game, data: Trigger) =>
        game.world.weather === Weather.SUN ? stats(data, 1, 1, 1, 0, 0) : undefined
    ),
  () =>
    new Item(
      'paw paw',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+1 str, wis and dex in rainy weather',
      (game: Game, data: Trigger) =>
        game.world.weather === Weather.RAIN ? stats(data, 1, 1, 1, 0, 0) : undefined
    ),
  () =>
    new Item(
      'pitaya',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+1 str, wis and dex in windy weather',
      (game: Game, data: Trigger) =>
        game.world.weather === Weather.WIND ? stats(data, 1, 1, 1, 0, 0) : undefined
    ),
  () =>
    new Item(
      'crowberries',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '+1 str, wis and dex in snowy weather',
      (game: Game, data: Trigger) =>
        game.world.weather === Weather.SNOW ? stats(data, 1, 1, 1, 0, 0) : undefined
    ),
  () =>
    new Item(
      'passionflower tea',
      Sprites.TURQUOISE_BEAD,
      Rarity.RARE,
      '-1 energy',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, 0, -1)
    ),

  // Legendary items
  () =>
    new Item(
      'condor feather',
      Sprites.TURQUOISE_BEAD,
      Rarity.LEGENDARY,
      'cannot lose any strength (except from items)',
      (game: Game, data: Trigger) => canLoseStats(data, false, true, true, true)
    ),
  () =>
    new Item(
      'owl feather',
      Sprites.TURQUOISE_BEAD,
      Rarity.LEGENDARY,
      'cannot lose any wisdom (except from items)',
      (game: Game, data: Trigger) => canLoseStats(data, true, false, true, true)
    ),
  () =>
    new Item(
      'falcon feather',
      Sprites.TURQUOISE_BEAD,
      Rarity.LEGENDARY,
      'cannot lose any dexterity (except from items)',
      (game: Game, data: Trigger) => canLoseStats(data, true, true, false, true)
    ),
  () =>
    new Item(
      'succotash',
      Sprites.TURQUOISE_BEAD,
      Rarity.LEGENDARY,
      '+1 strength\n+1 wisdom\n+1 dexterity',
      (game: Game, data: Trigger) => stats(data, 1, 1, 1, 0, 0)
    ),
  () =>
    new Item(
      'eagle feather',
      Sprites.TURQUOISE_BEAD,
      Rarity.LEGENDARY,
      '+100% luck',
      (game: Game, data: Trigger) => stats(data, 0, 0, 0, 100, 0)
    ),

  // Mythic items
  () => {
    const item = new Item(
      'golden mirror',
      Sprites.TURQUOISE_BEAD,
      Rarity.MYTHIC,
      'eventually summons a reflection of the bearer if they leave the party',
      undefined
    );
    item.effect = (game: Game, data: Trigger) => {
      if (data.type === TriggerType.LEAVE_PARTY && data.hero === item.bearer) {
        const view: EventView = new EventView(game);
        view.setDetails(
          Sprites.TURQUOISE_BEAD,
          `${item.bearer.name} is summoned to your party by the magic of a golden mirror.`,
          [
            new Action('continue', () => {
              game.party.add(game.data.getNamedHero(item.bearer.name));
              game.progress();
            })
          ]
        );
        game.chain.futureEvent(view, 3, () => !game.party.isFull());
      }
    };
    return item;
  },
  () => {
    const item = new Item(
      'deer totem',
      Sprites.TURQUOISE_BEAD,
      Rarity.MYTHIC,
      "doubles the bearer's base energy",
      undefined
    );
    item.effect = (game: Game, data: Trigger) =>
      doubleBaseStats(data, item.bearer, false, false, false, true);
    return item;
  },
  () => {
    const item = new Item(
      'buffalo totem',
      Sprites.TURQUOISE_BEAD,
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
      Sprites.TURQUOISE_BEAD,
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
      Sprites.TURQUOISE_BEAD,
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
      Sprites.TURQUOISE_BEAD,
      Rarity.MYTHIC,
      '+1 strength\n+1 wisdom\n+1 dexterity\n+100% luck\n+3 energy',
      (game: Game, data: Trigger) => stats(data, 1, 1, 1, 100, 3)
    )
];

function stats(
  data: Trigger,
  str: number,
  wis: number,
  dex: number,
  luck: number,
  energy: number
): void {
  if (data.type === TriggerType.GET_STATS) {
    data.str += str;
    data.wis += wis;
    data.dex += dex;
    data.luck += luck;
    data.energy += energy;
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
  energy: boolean
): void {
  if (data.type === TriggerType.GET_STATS) {
    data.str += str ? hero.str : 0;
    data.wis += wis ? hero.wis : 0;
    data.dex += dex ? hero.dex : 0;
    data.energy += energy ? hero.energy : 0;
  }
}
