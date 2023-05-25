import { expect } from 'chai';
import { TestAudio, TestGraphics, TestHistory } from './media';
import { heroes } from '../content/heroes';
import Hero from '../entities/hero';
import { WTEXT, Time } from '../types';
import Game from '../game';

const game = new Game(new TestGraphics(), new TestAudio(), new TestHistory());
game.start();

describe('Naming convention checks', function () {
  for (const getHero of heroes) {
    const hero: Hero = getHero(game);

    it(`${hero.name}'s description is lowercase`, function () {
      expect(hero.description.toLowerCase()).to.equal(hero.description);
    });

    it(`${hero.name}'s name is lowercase`, function () {
      expect(hero.name.toLowerCase()).to.equal(hero.name);
    });

    it(`${hero.name}'s name is a good length`, function () {
      expect(hero.name.length <= WTEXT - 4).to.be.true;
    });
  }
});

describe('Hero effects', function () {
  beforeEach(function () {
    game.setInitialState();
  });

  function testHero(name: string, extra: string, suite: (hero: Hero) => void): void {
    it(`${name}${extra ? ` (${extra})` : ''}`, () => {
      const hero = game.data.getNamedHero(name);
      game.party.clear();
      game.party.add(hero);
      suite(hero);
    });
  }

  testHero('corn woman', undefined, (hero: Hero) => {
    game.party.add(game.data.getNamedHero('corn woman'));
    const futures = game.chain.futures.length;
    game.party.remove(hero);
    expect(game.chain.futures.length).to.equal(futures + 1);
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    expect(game.chain.latest().getText().replace(/\n/g, ' ')).to.equal(
      'squash lady joins your party. '
    );
  });

  testHero('squash lady', undefined, (hero: Hero) => {
    game.party.add(game.data.getNamedHero('corn woman'));
    const futures = game.chain.futures.length;
    game.party.remove(hero);
    expect(game.chain.futures.length).to.equal(futures + 1);
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    expect(game.chain.latest().getText().replace(/\n/g, ' ')).to.equal(
      'bean girl joins your party. '
    );
  });

  testHero('bead queen', undefined, (hero: Hero) => {
    expect(hero.stats.str).to.equal(2);
    expect(hero.stats.wis).to.equal(2);
    expect(hero.stats.dex).to.equal(2);
    expect(hero.stats.luck).to.equal(5);
    expect(hero.stats.energy).to.equal(4);
    for (let a = 0; a < 4; a++) {
      hero.basket.equip(game.data.getNamedItem('silver bead'));
      expect(hero.stats.str).to.equal(2);
      expect(hero.stats.wis).to.equal(2);
      expect(hero.stats.dex).to.equal(2);
      expect(hero.stats.luck).to.equal(10 + a * 5);
      expect(hero.stats.energy).to.equal(4);
    }
  });

  testHero('guardian', undefined, (hero: Hero) => {
    expect(hero.stats.str).to.equal(4);
    expect(hero.stats.wis).to.equal(4);
    expect(hero.stats.dex).to.equal(1);
    game.party.add(game.data.getNamedHero('corn woman'));
    expect(hero.stats.str).to.equal(3);
    expect(hero.stats.wis).to.equal(3);
    expect(hero.stats.dex).to.equal(0);
  });

  testHero('eagle knight', undefined, (hero: Hero) => {
    const futures = game.chain.futures.length;
    expect(hero.energy).to.equal(2);
    hero.energy--;
    expect(game.chain.futures.length).to.equal(futures + 1);
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    expect(game.chain.latest().getText().replace(/\n/g, ' ')).to.equal(
      'eagle knight healed from low energy. '
    );
  });

  testHero('medicine woman', undefined, (hero: Hero) => {
    expect(hero.luck).to.equal(5);
    hero.luck += 10;
    expect(hero.luck).to.equal(15);
    hero.luck -= 10;
    expect(hero.luck).to.equal(15);
  });

  testHero('wanderer', undefined, (hero: Hero) => {
    expect(hero.stats.str).to.equal(4);
    expect(hero.stats.wis).to.equal(1);
    expect(hero.stats.dex).to.equal(1);
    expect(hero.stats.luck).to.equal(15);
    game.party.remove(hero);
    expect(hero.stats.str).to.equal(4);
    expect(hero.stats.wis).to.equal(1);
    expect(hero.stats.dex).to.equal(1);
    expect(hero.stats.luck).to.equal(15);
    game.party.add(hero);
    expect(hero.stats.str).to.equal(5);
    expect(hero.stats.wis).to.equal(2);
    expect(hero.stats.dex).to.equal(2);
    expect(hero.stats.luck).to.equal(25);
  });

  testHero('moon priestess', undefined, (hero: Hero) => {
    expect(hero.stats.str).to.equal(0);
    expect(hero.stats.wis).to.equal(3);
    expect(hero.stats.dex).to.equal(0);
    game.world.time = Time.NIGHT;
    expect(hero.stats.str).to.equal(1);
    expect(hero.stats.wis).to.equal(4);
    expect(hero.stats.dex).to.equal(1);
  });

  testHero('fisherman', undefined, (hero: Hero) => {
    game.party.add(game.data.getNamedHero('corn woman'));
    const futures = game.chain.futures.length;
    game.party.remove(hero);
    expect(hero.stats.energy).to.equal(3);
    expect(game.chain.futures.length).to.equal(futures + 1);
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    game.chain.latest();
    game.chain.events.splice(0, 1);
    expect(game.chain.latest().getText().replace(/\n/g, ' ')).to.equal(
      'fisherman joins your party. '
    );
  });
});
