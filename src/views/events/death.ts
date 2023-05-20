import ScoreView from '../../views/scoreboard';
import Sprites from '../../media/sprites';
import GameAudio from '../../media/audio';
import Action from '../../ui/action';
import EventView from '../event';
import Game from '../../game';

export default class DeathEvent extends EventView {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    this.game.audio.play(GameAudio.FAIL);
    const place: number = this.game.history.log();
    this.setDetails(Sprites.DEATH, 'your party is empty.', [
      new Action('continue', () => this.game.setView(new ScoreView(this.game, place)))
    ]);
  }
}
