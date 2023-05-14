import ScoreView from '../../views/scoreboard';
import Sprites from '../../enums/sprites';
import GameAudio from '../../media/audio';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class DeathEvent extends EventView {
  static label = 'death';

  constructor() {
    super(DeathEvent);
  }

  init(game: Game): void {
    game.audio.play(GameAudio.FAIL);
    const place: number = game.history.log();
    this.setDetails(Sprites.DEATH, 'your party is empty.', [
      new Action('continue', () => game.setView(new ScoreView(place)))
    ]);
  }
}
