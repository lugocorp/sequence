import { expect } from 'chai';
import RiverEvent from '../views/events/river';
import { TestAudio, TestGraphics, TestHistory } from './media';
import View from '../views/view';
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
    const views: View[] = event.getViews();
    game.views.setViews(views);
    views[0].actions['continue']();
    const lines = (game.views.getView().text.match(/\n/g) || []).length;
    expect(lines + 2).to.be.lte(LIMIT); // +2 for the 'choose' option
  });
});
