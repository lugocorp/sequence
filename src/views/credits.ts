import Game from '../game';
import StartView from './start';
import View from '../graphics/view';

export default class CreditsView extends View {

  constructor() {
    super();
    this.text = [
      '-programming-',
      'alex lugo',
      '-design-',
      'alex lugo',
      '-pixel art-',
      'alex lugo',
      'alexlugo.net'
    ].join('\n');
    this.actions = [
      {
        text: 'back',
        effect: () => {
          Game.game.view = new StartView();
        }
      }
    ];
  }
}