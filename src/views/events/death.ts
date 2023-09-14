import ViewFactory from '../factory';
import Sprites from '../../media/sprites';
import GameAudio from '../../media/audio';
import EventView from '../event';
import View from '../view';

export default class DeathEvent extends EventView {
  getViews(): View[] {
    this.game.audio.play(GameAudio.FAIL);
    const place: number = this.game.history.log();
    return [{image: Sprites.DEATH, text: 'your party is empty.', actions: {
      'continue': () => new ViewFactory(this.game).scoreView(place)
    }}];
  }
}
