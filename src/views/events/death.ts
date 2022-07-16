import StartView from '../../views/start';
import Sprites from '../../enums/sprites';
import GameAudio from '../../media/audio';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class DeathEvent extends View {

  constructor() {
    super();
    this.setDetails(Sprites.DEATH, 'your party did not make it', [
      new Action('continue', () => Game.setView(new StartView()))
    ]);
  }

  init(): void {
    Game.game.audio.play(GameAudio.FAIL);
  }
}