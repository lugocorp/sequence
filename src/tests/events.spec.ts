import { expect } from 'chai';
import RiverEvent from '../views/events/river';
import { TestAudio, TestGraphics, TestHistory } from './media';
import Action from '../ui/action';
import Game from '../game';

const game = new Game(new TestGraphics(), new TestAudio(), new TestHistory());
game.start();

const LIMIT = 11;

describe('Number of lines tests', function () {
  before(function () {
    game.party.clear();
    game.party.add(game.data.getNamedHero('fisherman'));
  });

  it('River event', function () {
    const event = new RiverEvent(game);
    event.init();
    game.setView(event);
    event.setSelector(event['heroSelector'], [ new Action('choose', () => null) ]);
    const lines = (event.getText().match(/\n/g) || []).length;
    expect(lines + 1).to.be.lte(LIMIT); // +1 for the 'choose' option
  });
});
