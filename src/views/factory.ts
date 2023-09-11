import HistoryManager from '../media/history';
import Sprites from '../media/sprites';
import View from '../ui/view';
import Game from '../game';

export default class ViewFactory {

    constructor(private game: Game) {}

    startView(): void {
        this.game.views.setViews([{
            image: Sprites.WELCOME,
            text: 'welcome to the game! check your options below',
            actions: {
                'instructions': () => this.instructionsView(),
                'credits': () => this.creditsView(),
                'new game': () => {
                    this.game.setInitialState();
                    this.setView(this.game.chain.latest());
                },
                'score': () => this.scoreView(),
            }
        }]);
    }

    instructionsView(): void {
        this.game.views.setViews([
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
              "take each event in stride and you'll get the hang of it."
            ]
          ].map((x: string[]): View => ({
            image: Sprites.INSTRUCTIONS,
            text: x.join(''),
            actions: {
                'back': () => this.startView()
            }
          })));
    }

    creditsView(): void {
        this.game.views.setViews([
            '-development-\n\nalex lugo\ntaíno/guachichil\n\n-play testing-\n\namanda brooks',
            '-consultants-\n\nkoro valdivia\ntawantinsuyu\n\nnati/palta\nquechua\nshe/they',
            'c. travioli\ncheyenne river lakota\n\nlydia prince\ndakelh/nehiyaw\nshe/her'
          ].map((x: string): View => ({
            image: Sprites.CREDITS,
            text: x,
            actions: {
                'back': () => this.startView()
            }
          })));
    }

    scoreView(place?: number): void {
      const scoreboard: View = {
        image: Sprites.SCORE,
        text: `${this.game.history.runs
          .map((x: [string, number], i: number) => this.format(x, i))
          .join('\n')}`,
        actions: {
          'main menu': () => this.startView()
        }
      };

      if (place !== undefined) {
        const history: HistoryManager = this.game.history;
        history.save();
        const total: number = history.calculateScore();
        this.game.views.setViews([{
          image: Sprites.SCORE,
          text: `${place < 0 ? 'not a high score' : 'high score!'}\n` +
            `${history.peopleHelped} people helped x100\n` +
            `${history.itemsCollected} items held x25\n` +
            `${history.nightsSurvived} nights x300\n` +
            `${history.challengesWon} challenges won x100\n` +
            `${history.partyMembers} party members x50\n` +
            `total: ${total}`,
            actions: {
              'continue': () => scoreboard
            }
        }]);
      } else {
        this.game.views.setViews([scoreboard]);
      }
    }
}