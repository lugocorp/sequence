import Sprites from '../enums/sprites';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class CreditsView extends View {

  constructor() {
    super(
      Sprites.DIRE_CRAB,
      [
        '-programming-',
        'alex lugo',
        '-design-',
        'alex lugo',
        '-pixel art-',
        'alex lugo',
        'alexlugo.net'
      ].join('\n'),
      [
        new Action('back', () => Game.setView(new StartView()))
      ]
    );
  }
}