import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Action from '../../ui/action';
import { Event } from '../event';
import Game from '../../game';

/*
 * In this event your party is filtered by a certain stat limit.
 */
export default class ObstacleEvent extends Event {
  static label = 'obstacle';
  private original: number;
  private cutoff: number;
  private stat: number;
  private obstacle: { sprite: Sprites; name: string };

  constructor() {
    super(ObstacleEvent);
    this.obstacle = Random.element([
      { sprite: Sprites.OBSTACLE, name: 'swamp' },
      { sprite: Sprites.OBSTACLE, name: 'cliff' },
      { sprite: Sprites.OBSTACLE, name: 'mountain' }
    ]);
    this.original = Game.game.party.length();
    this.stat = Stats.getRandomStat();
    this.cutoff = Random.max(4) + 1;
    const that = this;
    this.setDetails(
      this.obstacle.sprite,
      `your party comes across a ${this.obstacle.name}. only travelers with ${
        this.cutoff
      } ${Stats.getStatName(this.stat)} or ${this.higher ? 'higher' : 'lower'} may pass.`,
      [ new Action('continue', () => that.finish()) ]
    );
  }

  // True if this event only allows members above a certain threshold
  get higher(): boolean {
    return this.cutoff <= 2;
  }

  finish(): void {
    Game.game.party.filter(this.stat, this.cutoff, this.higher);
    const size: number = Game.game.party.length();
    this.setDetails(
      this.obstacle.sprite,
      size
        ? size === this.original
          ? `all party members passed the ${this.obstacle.name}.`
          : `only ${size} party member${size > 1 ? 's' : ''} made it past the ${
              this.obstacle.name
            }.`
        : `no one in your party could pass the ${this.obstacle.name}.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}
