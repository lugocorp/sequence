import Sprites from '../media/sprites';
import Selector from '../ui/selector';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class CreditsView extends View {
  constructor(game: Game) {
    super(game);
    const that = this;
    this.setSelector(
      new Selector<string>(
        [
          '-development-\n\nalex lugo\ntaíno/guachichil\n\n-play testing-\n\namanda brooks',
          '-consultants-\n\nkoro valdivia\ntawantinsuyu\n\nnati/palta\nquechua\nshe/they',
          'c. travioli\ncheyenne river lakota\n\nlydia prince\ndakelh/nehiyaw\nshe/her'
        ],
        (v: View, e: string) => {
          that.image = Sprites.CREDITS;
          that.setText(e);
        }
      ),
      [ new Action('back', () => game.setView(new StartView(game))) ]
    );
  }
}
