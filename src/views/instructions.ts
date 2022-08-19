import Sprites from '../enums/sprites';
import Selector from '../ui/selector';
import Action from '../ui/action';
import View from '../ui/view';
import StartView from './start';
import Game from '../game';

export default class InstructionsView extends View {

  constructor() {
    super();
    const that = this;
    this.setSelector(
      new Selector<string>(
        [
          [
            'this is a role playing game.',
            'all you have to do is make choices for your party.',
            'you will build a team, collect items, and meet helpful spirits.',
            'never give up hope and you will go far!'
          ],
          [
            'the only controls are the arrows on either side of the screen and the options in the box below.',
            'the arrows let you navigate lists.',
            'tapping on box options is how you play the game.'
          ],
          [
            'the goal of the game is to survive as long as you can.',
            'the game ends when you run out of party members, but you can always try again!',
            'take each event in stride and you\'ll get the hang of it.'
          ]
        ].map((x: string[]): string => x.join('')),
        (v: View, e: string) => {
          that.image = Sprites.INSTRUCTIONS;
          that.setText(e);
        }
      ),
      [ new Action('back', () => Game.setView(new StartView())) ]
    );
  }
}