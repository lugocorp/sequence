import Sprites from '../enums/sprites';
import InstructionsView from './instructions';
import CreditsView from './credits';
import Action from '../ui/action';
import View from '../ui/view';
import Game from '../game';

export default class StartView extends View {

  constructor() {
    super();
    this.setDetails(Sprites.WELCOME, 'welcome to the game!\nthis is a beta release, it\'s still in development', [
      new Action('instructions', () => Game.setView(new InstructionsView())),
      new Action('credits', () => Game.setView(new CreditsView())),
      new Action('new game', () => Game.setView(Game.game.chain.latest()))
    ]);
  }

  init(): void {
    Game.game.setInitialState();
  }
}