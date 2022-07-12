import GraphicsRenderer from '../../graphics/renderer';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import View from '../../graphics/view';
import Game from '../../game';

/*
 * In this event your party is filtered by a certain stat limit.
 */
export default class ObstacleEvent extends View {
  /* private static PRELUDE  = 0;
  private static FINISHED = 1;
  private continue: Text;
  private original: number;
  private minimum: number;
  private state: number;
  private stat: number;

  constructor() {
    super();
    const that = this;
    this.minimum = Random.max(3) + 1;
    this.stat = Stats.getRandomStat();
    this.state = ObstacleEvent.PRELUDE;
    this.original = Game.game.party.length();
    this.continue = new Text('continue', 30, 190, false, () => {
      if (that.state === ObstacleEvent.FINISHED) {
        Game.game.progress();
      }
      if (that.state === ObstacleEvent.PRELUDE) {
        that.state = ObstacleEvent.FINISHED;
        Game.game.party.filter(that.stat, that.minimum);
      }
    });
  }

  click(): void {
    this.continue.click();
  }

  render(view: GameView, r: GraphicsRenderer): void {
    if (this.state === ObstacleEvent.PRELUDE) {
      r.drawParagraph(`your party comes across a natural obstacle. only travelers with ${this.minimum} ${Stats.getStatName(this.stat)} or more may pass.`, 2, 2);
    }
    if (this.state === ObstacleEvent.FINISHED) {
      const size: number = Game.game.party.length();
      r.drawParagraph(size ?
        size === this.original ?
          'all party members passed the obstacle.' :
          `only ${size} party members made it past the obstacle.` :
        'no one in your party could pass the obstacle.',
        2, 2);
    }
    this.continue.render(view, r);
  } */
}