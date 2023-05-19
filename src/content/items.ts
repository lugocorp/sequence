import { Trigger, TriggerType, Rarity, Weather, Time } from '../types';
import Sprites from '../media/sprites';
import Item from '../entities/item';
import Game from '../game';

export type ItemGenerator = () => Item;

export const items: ItemGenerator[] = [
  () =>
    new Item('corn', Sprites.CORN, Rarity.COMMON, '+1 strength.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.str++;
      }
    }),
  () =>
    new Item('squash', Sprites.SQUASH, Rarity.COMMON, '+1 wisdom.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.wis++;
      }
    }),
  () =>
    new Item('beans', Sprites.BEANS, Rarity.COMMON, '+1 dexterity.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.dex++;
      }
    }),
  () =>
    new Item('turquoise bead', Sprites.TURQUOISE_BEAD, Rarity.COMMON, '+5% luck.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.luck += 5;
      }
    }),
  () =>
    new Item(
      'copper axe',
      Sprites.COPPER_AXE,
      Rarity.UNCOMMON,
      '+2 strength, -1 wisdom.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS) {
          data.str += 2;
          data.wis--;
        }
      }
    ),
  () =>
    new Item('quipu', Sprites.QUIPU, Rarity.UNCOMMON, '+2 wisdom, -1 dexterity.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.wis += 2;
        data.dex--;
      }
    }),
  () =>
    new Item(
      'moccasins',
      Sprites.MOCCASINS,
      Rarity.UNCOMMON,
      '+2 dexterity, -1 strength.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS) {
          data.dex += 2;
          data.str--;
        }
      }
    ),
  () =>
    new Item(
      'fry bread',
      Sprites.FRY_BREAD,
      Rarity.UNCOMMON,
      '+2 to all stats if you have 3 or fewer party members.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.party.size <= 3) {
          data.str += 2;
          data.wis += 2;
          data.dex += 2;
        }
      }
    ),
  () =>
    new Item(
      'sack of gold',
      Sprites.SACK_OF_GOLD,
      Rarity.UNCOMMON,
      '+1 to all stats during the day.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.time === Time.DAY) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'sack of silver',
      Sprites.SACK_OF_SILVER,
      Rarity.UNCOMMON,
      '+1 to all stats at night.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.time === Time.NIGHT) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'paw paw',
      Sprites.PAW_PAW,
      Rarity.UNCOMMON,
      '+1 to all stats in rainy weather.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.RAIN) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'cassava',
      Sprites.CASSAVA,
      Rarity.UNCOMMON,
      '+1 to all stats in windy weather.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.WIND) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'sunflower',
      Sprites.SUNFLOWER,
      Rarity.UNCOMMON,
      '+1 to all stats in sunny weather.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.SUN) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'crowberry',
      Sprites.CROWBERRY,
      Rarity.UNCOMMON,
      '+1 to all stats in snowy weather.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS && game.world.weather === Weather.SNOW) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item(
      'succotash',
      Sprites.SUCCOTASH,
      Rarity.RARE,
      '+1 strength, +1 wisdom, +1 dexterity.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS) {
          data.str++;
          data.wis++;
          data.dex++;
        }
      }
    ),
  () =>
    new Item('macuahuitl', Sprites.MACUAHUITL, Rarity.RARE, '+2 strength, -5% luck.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.str += 2;
      }
      if (data.type === TriggerType.GET_STATS) {
        data.luck -= 5;
      }
    }),
  () =>
    new Item('amoxtli', Sprites.AMOXTLI, Rarity.RARE, '+2 wisdom, -5% luck.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.wis += 2;
      }
      if (data.type === TriggerType.GET_STATS) {
        data.luck -= 5;
      }
    }),
  () =>
    new Item('huarache', Sprites.HUARACHE, Rarity.RARE, '+2 dexterity, -5% luck.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.dex += 2;
      }
      if (data.type === TriggerType.GET_STATS) {
        data.luck -= 5;
      }
    }),
  () =>
    new Item(
      'corn and bean soup',
      Sprites.CORN_AND_BEAN_SOUP,
      Rarity.LEGENDARY,
      '+2 strength, +2 wisdom, +2 dexterity.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS) {
          data.str += 2;
          data.wis += 2;
          data.dex += 2;
        }
      }
    ),
  () =>
    new Item('eagle feather', Sprites.EAGLE_FEATHER, Rarity.LEGENDARY, '+100% luck.', function (
      game: Game,
      data: Trigger
    ) {
      if (data.type === TriggerType.GET_STATS) {
        data.luck += 100;
      }
    }),
  () =>
    new Item(
      'turquoise ring',
      Sprites.TURQUOISE_RING,
      Rarity.MYTHIC,
      '+3 strength, +3 wisdom, +3 dexterity.',
      function (game: Game, data: Trigger) {
        if (data.type === TriggerType.GET_STATS) {
          data.str += 3;
          data.wis += 3;
          data.dex += 3;
        }
      }
    )
];
