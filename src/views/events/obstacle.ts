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
  private obstacle: {sprite: Sprites, name: string};

  constructor() {
    super();
    this.obstacle = Random.element([
      {sprite: Sprites.OBSTACLE, name: 'bog'},
      {sprite: Sprites.OBSTACLE, name: 'cliff'},
      {sprite: Sprites.OBSTACLE, name: 'bog'},
    ]);
    this.original = Game.game.party.length();
    this.stat = Stats.getRandomStat();
    this.minimum = Random.max(3) + 1;
    const that = this;
    this.setDetails(
      this.obstacle.sprite,
      `your party comes across a ${this.obstacle.name}. only travelers with ${this.minimum} ${Stats.getStatName(this.stat)} or more may pass.`,
      [ new Action('continue', () => that.finish()) ]
    );
  }

  finish(): void {
    Game.game.party.filter(this.stat, this.minimum);
    const size: number = Game.game.party.length();
    this.setDetails(
      this.obstacle.sprite,
      size ?
        (size === this.original ?
          `all party members passed the ${this.obstacle.name}.` :
          `only ${size} party member${size > 1 ? 's' : ''} made it past the ${this.obstacle.name}.`) :
        `no one in your party could pass the ${this.obstacle.name}.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );
  }
}