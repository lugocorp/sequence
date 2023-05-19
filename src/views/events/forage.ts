import Action from '../../ui/action';
import { EventView } from '../event';
import Sprites from '../../media/sprites';
import Random from '../../logic/random';
import Game from '../../game';

export default class ForageEvent extends EventView {
  constructor(game: Game) {
    super(game);
    const SAFE = 0;
    const SEMISAFE = 1;
    const TOXIC = 2;
    const plant = Random.element([
      {
        name: 'purple passionflower',
        sprite: Sprites.PASSIONFLOWER,
        type: SAFE
      },
      {
        name: 'pokeweed',
        sprite: Sprites.POKEWEED,
        type: SEMISAFE
      },
      {
        name: 'castor bean',
        sprite: Sprites.CASTOR_BEAN,
        type: TOXIC
      }
    ]);
    const that = this;
    const result = (action: string, aftermath: () => void): void =>
      that.setDetails(plant.sprite, `your party ${action} the plant known as ${plant.name}.`, [
        new Action('continue', () => aftermath())
      ]);
    this.setDetails(
      plant.sprite,
      `your party is hungry and they come across a plant known as ${plant.name}. what do they do?`,
      [
        new Action('eat it raw', () => {
          if (plant.type === SAFE) {
            result('eats', () => that.empower());
          } else {
            result('eats', () => that.poison());
          }
        }),
        new Action('boil it', () => {
          if (plant.type === SEMISAFE) {
            result('boils and eats', () => that.empower());
          } else if (plant.type === TOXIC) {
            result('boils and eats', () => that.poison());
          } else {
            result('boils and eats', () => this.game.progress());
          }
        }),
        new Action('avoid it', () => result('avoids', () => this.game.progress()))
      ]
    );
  }

  poison(): void {
    const view: EventView = new EventView(this.game);
    view.init = (): void =>
      view.setDetails(
        this.game.party.members[0].sprite,
        `your party suddenly feels weaker and slower. perhaps it was something they ate...`,
        [
          new Action('continue', () => {
            for (const hero of this.game.party.members) {
              hero.str--;
              hero.wis--;
              hero.dex--;
            }
            this.game.progress();
          })
        ]
      );
    this.game.chain.futureEvent(view, 3);
    this.game.progress();
  }

  empower(): void {
    const view: EventView = new EventView(this.game);
    view.init = (): void =>
      view.setDetails(
        this.game.party.members[0].sprite,
        `your party suddenly feels stronger, smarter and faster. perhaps it was something they ate!`,
        [
          new Action('continue', () => {
            for (const hero of this.game.party.members) {
              hero.str++;
              hero.wis++;
              hero.dex++;
            }
            this.game.progress();
          })
        ]
      );
    this.game.chain.futureEvent(view, 3);
    this.game.progress();
  }
}
