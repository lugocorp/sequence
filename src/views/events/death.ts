import ScoreView from '../../views/scoreboard';
import Sprites from '../../enums/sprites';
import GameAudio from '../../media/audio';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class DeathEvent extends View {

  init(): void {
    Game.game.audio.play(GameAudio.FAIL);
    Game.game.history.log();
    this.setDetails(Sprites.DEATH, 'your party is empty', [
      new Action('continue', () => Game.setView(new ScoreView()))
    ]);
  }
}