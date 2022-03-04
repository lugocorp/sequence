import Game from '../game';
import Text from '../graphics/text';
import StartView from './start';
import View from './view';

export default class CreditsView extends View {

  constructor() {
    super();
    this.addText(
      new Text('-programming-', 15, 10),
      new Text('alex lugo', 25, 20, true),
      new Text('-design-', 30, 40),
      new Text('alex lugo', 25, 50, true),
      new Text('-pixel art-', 20, 70),
      new Text('alex lugo', 25, 80, true),
      new Text('alexlugo.net', 20, 130, true),
      new Text('back', 40, 190, false, () => {
        Game.game.view = new StartView();
      })
    );
    this.startTextAnimation();
  }
}