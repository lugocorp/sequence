import ScoreView from '../../views/scoreboard';
import Sprites from '../../media/sprites';
import GameAudio from '../../media/audio';
import EventView from '../event';
import Game from '../../game';

export default class DeathEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    this.game.audio.play(GameAudio.FAIL);
    const place: number = this.game.history.log();
    this.game.views.setViews([{(Sprites.DEATH, 'your party is empty.', [
      'continue': () => this.game.setView(new ScoreView(this.game, place)))
    ]);
  }
}
