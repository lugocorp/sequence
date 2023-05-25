import { expect } from 'chai';
import { TestAudio, TestGraphics, TestHistory } from './media';
import EventView from '../views/event';
import Game from '../game';

const game = new Game(new TestGraphics(), new TestAudio(), new TestHistory());
game.start();
game.setInitialState();

describe('Chain tests', function () {
  const chain = game.chain;

  beforeEach(function () {
    chain.clear();
  });

  it('Continuous event chain', function () {
    let previous: EventView = chain.latest();
    for (let a = 0; a < 10; a++) {
      chain.events.splice(0, 1);
      const current = chain.latest();
      expect(current).to.exist;
      expect(current).to.equal(chain.latest());
      expect(current).to.not.equal(previous);
      previous = current;
    }
  });

  it('Future event fires at correct time', function () {
    const future = new EventView(game);
    chain.futureEvent(future, 3);
    chain.events.splice(0, 1);
    expect(chain.latest()).to.not.equal(future);
    chain.events.splice(0, 1);
    expect(chain.latest()).to.not.equal(future);
    chain.events.splice(0, 1);
    expect(chain.latest()).to.equal(future);
  });
});

describe('Data tests', function () {
  const data = game.data;

  it('Make sure we can grab a turtle hero', function () {
    const turtle = data.getNamedHero('turtle');
    expect(turtle).to.exist;
    expect(turtle.name).to.equal('turtle');
  });
});
