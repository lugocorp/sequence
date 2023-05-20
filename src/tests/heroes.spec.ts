import { expect } from 'chai';
import { TestAudio, TestGraphics, TestHistory } from './media';
import { heroes } from '../content/heroes';
import Hero from '../entities/hero';
import { WTEXT } from '../types';
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
