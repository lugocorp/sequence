import Game from '../game';
import StartView from './start';
import View from '../ui/view';
import Action from '../ui/action';

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
      new Action('back', () => {
        Game.game.view = new StartView();
      })
    ];
  }
}