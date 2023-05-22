import { expect } from 'chai';
import { TestAudio, TestGraphics, TestHistory } from './media';
import { WTEXT, Time, Weather, StatBlock } from '../types';
import { items } from '../content/items';
import EventView from '../views/event';
import Sprites from '../media/sprites';
import Party from '../entities/party';
import Item from '../entities/item';
import Hero from '../entities/hero';
import Game from '../game';

const game = new Game(new TestGraphics(), new TestAudio(), new TestHistory());
game.start();

describe('Naming convention checks', function () {
  for (const getItem of items) {
    const item: Item = getItem();

    it(`${item.name}'s description is lowercase`, function () {
      expect(item.description.toLowerCase()).to.equal(item.description);
    });

    it(`${item.name}'s name is lowercase`, function () {
      expect(item.name.toLowerCase()).to.equal(item.name);
    });

    it(`${item.name}'s name is a good length`, function () {
      expect(item.name.length <= WTEXT - 4).to.be.true;
    });
  }
});

describe('Item effects', function () {
  let hero: Hero;

  beforeEach(function () {
    game.setInitialState();
    game.data['heroesByName']['test hero'] = () =>
      new Hero(game, Sprites.NONE, 'test hero', '', 3, 3, 3, 3, 6);
    hero = game.data.getNamedHero('test hero');
    hero.luck = 35;
  });

  function testItem(name: string, extra: string, suite: (item: Item) => void): void {
    it(`${name}${extra ? ` (${extra})` : ''}`, () => suite(game.data.getNamedItem(name)));
  }

  function statBlockEffect(item: Item, partialStats: Partial<StatBlock> = {}) {
    const stats: StatBlock = {
      str: 3,
      wis: 3,
      dex: 3,
      luck: 35,
      energy: 3,
      ...partialStats
    };
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    expect(hero.stats.str).to.equal(3);
    expect(hero.stats.wis).to.equal(3);
    expect(hero.stats.dex).to.equal(3);
    expect(hero.stats.luck).to.equal(35);
    expect(hero.stats.energy).to.equal(3);
    hero.basket.equip(item);
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    expect(hero.stats.str).to.equal(stats.str);
    expect(hero.stats.wis).to.equal(stats.wis);
    expect(hero.stats.dex).to.equal(stats.dex);
    expect(hero.stats.luck).to.equal(stats.luck);
    expect(hero.stats.energy).to.equal(stats.energy);
  }

  function cannotLoseStatEffect(item: Item, partialStats: Partial<StatBlock<boolean>>) {
    const stats: StatBlock<boolean> = {
      str: true,
      wis: true,
      dex: true,
      luck: true,
      energy: true,
      ...partialStats
    };
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    hero.str--;
    hero.wis--;
    hero.dex--;
    hero.luck--;
    hero.energy--;
    expect(hero.str).to.equal(2);
    expect(hero.wis).to.equal(2);
    expect(hero.dex).to.equal(2);
    expect(hero.luck).to.equal(34);
    expect(hero.energy).to.equal(2);
    hero.str++;
    hero.wis++;
    hero.dex++;
    hero.luck++;
    hero.energy++;
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    hero.basket.equip(item);
    hero.str--;
    hero.wis--;
    hero.dex--;
    hero.luck -= 5;
    hero.energy--;
    expect(hero.str).to.equal(stats.str ? 2 : 3);
    expect(hero.wis).to.equal(stats.wis ? 2 : 3);
    expect(hero.dex).to.equal(stats.dex ? 2 : 3);
    expect(hero.luck).to.equal(stats.luck ? 30 : 35);
    expect(hero.energy).to.equal(stats.energy ? 2 : 3);
    hero.str += stats.str ? 1 : 0;
    hero.wis += stats.wis ? 1 : 0;
    hero.dex += stats.dex ? 1 : 0;
    hero.luck += stats.luck ? 5 : 0;
    hero.energy += stats.energy ? 1 : 0;
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    hero.basket.equip(game.data.getNamedItem('cursed ring'));
    hero.basket.equip(game.data.getNamedItem('cursed amulet'));
    hero.basket.equip(game.data.getNamedItem('cursed sandals'));
    hero.basket.equip(game.data.getNamedItem('passionflower tea'));
    hero.basket.equip(game.data.getNamedItem('bad medicine'));
    expect(hero.str).to.equal(3);
    expect(hero.wis).to.equal(3);
    expect(hero.dex).to.equal(3);
    expect(hero.luck).to.equal(35);
    expect(hero.energy).to.equal(3);
    expect(hero.stats.str).to.equal(2);
    expect(hero.stats.wis).to.equal(2);
    expect(hero.stats.dex).to.equal(2);
    expect(hero.stats.luck).to.equal(30);
    expect(hero.stats.energy).to.equal(2);
  }

  testItem('corn', undefined, (item: Item) => statBlockEffect(item, { str: 4 }));
  testItem('squash', undefined, (item: Item) => statBlockEffect(item, { wis: 4 }));
  testItem('beans', undefined, (item: Item) => statBlockEffect(item, { dex: 4 }));
  testItem('turquoise bead', undefined, (item: Item) => statBlockEffect(item, { luck: 45 }));
  testItem('bad medicine', undefined, (item: Item) => statBlockEffect(item, { luck: 30 }));
  testItem('gold ring', undefined, (item: Item) => statBlockEffect(item, { str: 5, wis: 2 }));
  testItem('corn soup', undefined, (item: Item) => statBlockEffect(item, { str: 5, dex: 2 }));
  testItem('jade amulet', undefined, (item: Item) => statBlockEffect(item, { wis: 5, str: 2 }));
  testItem('squash soup', undefined, (item: Item) => statBlockEffect(item, { wis: 5, dex: 2 }));
  testItem('beaded moccasins', undefined, (item: Item) =>
    statBlockEffect(item, { dex: 5, str: 2 })
  );

  testItem('bean soup', undefined, (item: Item) => statBlockEffect(item, { dex: 5, wis: 2 }));
  testItem('gourd bottle', undefined, (item: Item) => statBlockEffect(item, { energy: 4 }));
  testItem('cursed ring', undefined, (item: Item) => statBlockEffect(item, { str: 2 }));
  testItem('cursed amulet', undefined, (item: Item) => statBlockEffect(item, { wis: 2 }));
  testItem('cursed sandals', undefined, (item: Item) => statBlockEffect(item, { dex: 2 }));
  testItem('macuahuitl', undefined, (item: Item) => statBlockEffect(item, { str: 5 }));
  testItem('quipu', undefined, (item: Item) => statBlockEffect(item, { wis: 5 }));
  testItem('mogollon', undefined, (item: Item) => statBlockEffect(item, { dex: 5 }));
  testItem('medicine bag', undefined, (item: Item) => statBlockEffect(item, { luck: 60 }));
  testItem('pemmican', undefined, (item: Item) => statBlockEffect(item, { energy: 5 }));
  testItem('passionflower tea', undefined, (item: Item) => statBlockEffect(item, { energy: 2 }));
  testItem('condor feather', undefined, (item: Item) => cannotLoseStatEffect(item, { str: false }));
  testItem('owl feather', undefined, (item: Item) => cannotLoseStatEffect(item, { wis: false }));
  testItem('falcon feather', undefined, (item: Item) => cannotLoseStatEffect(item, { dex: false }));
  testItem('succotash', undefined, (item: Item) =>
    statBlockEffect(item, { str: 4, wis: 4, dex: 4 })
  );

  testItem('eagle feather', undefined, (item: Item) => statBlockEffect(item, { luck: 100 }));
  testItem('deer totem', undefined, (item: Item) => statBlockEffect(item, { energy: 6 }));
  testItem('buffalo totem', undefined, (item: Item) => statBlockEffect(item, { str: 6 }));
  testItem('turtle totem', undefined, (item: Item) => statBlockEffect(item, { wis: 6 }));
  testItem('coyotl totem', undefined, (item: Item) => statBlockEffect(item, { dex: 6 }));
  testItem('turquoise ring', undefined, (item: Item) =>
    statBlockEffect(item, { str: 4, wis: 4, dex: 4, luck: 100, energy: 6 })
  );

  testItem('golden mirror', undefined, (item: Item) => {
    hero.basket.equip(item);
    game.party.remove(game.party.get(0));
    game.party.add(hero);
    const n = game.chain.futures.length;
    game.party.remove(hero);
    expect(game.chain.futures.length).to.equal(n + 1);
    for (let a = 0; a < 3; a++) {
      game.chain.events.splice(0, 1);
      game.chain.latest();
    }
    const view: EventView = game.chain.latest();
    expect(view.getText().replace(/\n/g, ' ')).to.equal(
      'test hero is summoned to your party by the magic of a golden mirror. '
    );
    view.actions[0].effect();
    expect(game.party.members[Party.MAX - 1].name).to.contain('test hero');
    expect(game.party.members[Party.MAX - 1].basket.itemCount).to.equal(0);
  });

  [ Time.DAY, Time.NIGHT ].forEach((time: Time) => {
    const extra = { [Time.DAY]: 'daytime', [Time.NIGHT]: 'nighttime' }[time];

    testItem('gold bead', extra, (item: Item) => {
      game.world.time = time;
      statBlockEffect(item, time === Time.DAY ? { energy: 4 } : undefined);
    });

    testItem('silver bead', extra, (item: Item) => {
      game.world.time = time;
      statBlockEffect(item, time === Time.NIGHT ? { energy: 4 } : undefined);
    });

    testItem('gold bracelet', extra, (item: Item) => {
      game.world.time = time;
      statBlockEffect(item, time === Time.DAY ? { luck: 60 } : undefined);
    });

    testItem('silver bracelet', extra, (item: Item) => {
      game.world.time = time;
      statBlockEffect(item, time === Time.NIGHT ? { luck: 60 } : undefined);
    });
  });

  [ Weather.SUN, Weather.RAIN, Weather.WIND, Weather.SNOW ].forEach((weather: Weather) => {
    const boosted = { str: 4, wis: 4, dex: 4 };
    const extra = {
      [Weather.SUN]: 'sunny weather',
      [Weather.RAIN]: 'rainy weather',
      [Weather.WIND]: 'windy weather',
      [Weather.SNOW]: 'snowy weather'
    }[weather];

    testItem('sunflower', extra, (item: Item) => {
      game.world.weather = weather;
      statBlockEffect(item, weather === Weather.SUN ? boosted : undefined);
    });

    testItem('paw paw', extra, (item: Item) => {
      game.world.weather = weather;
      statBlockEffect(item, weather === Weather.RAIN ? boosted : undefined);
    });

    testItem('pitaya', extra, (item: Item) => {
      game.world.weather = weather;
      statBlockEffect(item, weather === Weather.WIND ? boosted : undefined);
    });

    testItem('crowberries', extra, (item: Item) => {
      game.world.weather = weather;
      statBlockEffect(item, weather === Weather.SNOW ? boosted : undefined);
    });
  });
});
