import GraphicsRenderer from '../../graphics/renderer';
import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

/*
 * In this event your party is filtered by a certain stat limit.
 */
export default class ObstacleEvent extends View {
  private original: number;
  private minimum: number;
  private stat: number;

  constructor() {
    super();
    this.original = Game.game.party.length();
    this.stat = Stats.getRandomStat();
    this.minimum = Random.max(3) + 1;
    const that = this;
    this.set(
      Sprites.DIRE_CRAB,
      `your party comes across a natural obstacle. only travelers with ${this.minimum} ${Stats.getStatName(this.stat)} or more may pass.`,
      [ new Action('continue', () => that.finish()) ]
    );
  }

  finish(): void {
    const size: number = Game.game.party.length();
    Game.game.party.filter(this.stat, this.minimum);
    this.set(
      Sprites.DIRE_CRAB,
      size ?
        size === this.original ?
          'all party members passed the obstacle.' :
          `only ${size} party members made it past the obstacle.` :
        'no one in your party could pass the obstacle.',
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}