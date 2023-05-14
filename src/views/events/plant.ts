import Action from '../../ui/action';
import { EventView } from '../event';
import Stats from '../../enums/stats';
import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Game from '../../game';

export default class PlantEvent extends EventView {
  static label = 'plant';

  constructor(game: Game) {
    super(PlantEvent);
    const SAFE = 0;
    const SEMISAFE = 1;
    const TOXIC = 2;
    const plant = Random.element([
      {
        name: 'chayote',
        sprite: Sprites.CHAYOTE,
        type: SAFE
      },
      {
        name: 'bear corn',
        sprite: Sprites.BEAR_CORN,
        type: SAFE
      },
      {
        name: 'purple passionflower',
        sprite: Sprites.PASSIONFLOWER,
        type: SAFE
      },
      {
        name: 'elderberry',
        sprite: Sprites.ELDERBERRY,
        type: SEMISAFE
      },
      {
        name: 'yaupon holly',
        sprite: Sprites.YAUPON_HOLLY,
        type: SEMISAFE
      },
      {
        name: 'pokeweed',
        sprite: Sprites.POKEWEED,
        type: SEMISAFE
      },
      {
        name: 'foxglove',
        sprite: Sprites.FOXGLOVE,
        type: TOXIC
      },
      {
        name: 'castor bean',
        sprite: Sprites.CASTOR_BEAN,
        type: TOXIC
      },
      {
        name: 'swamp sumac',
        sprite: Sprites.SWAMP_SUMAC,
        type: TOXIC
      }
    ]);
    const that = this;
    const result = (aftermath: () => void, ate = true): void =>
      that.setDetails(
        plant.sprite,
        `your party ${ate ? 'eats' : 'avoids'} the plant known as ${plant.name}.`,
        [ new Action('continue', () => aftermath()) ]
      );
    this.setDetails(
      plant.sprite,
      `your party is hungry and they come across a plant known as ${plant.name}. what do they do?`,
      [
        new Action('eat it raw', () => {
          if (plant.type === SAFE) {
            result(() => that.empower(game));
          } else {
            result(() => that.poison(game));
          }
        }),
        new Action('eat it boiled', () => {
          if (plant.type === SEMISAFE) {
            result(() => that.empower(game));
          } else if (plant.type === TOXIC) {
            result(() => that.poison(game));
          } else {
            result(() => game.progress());
          }
        }),
        new Action('avoid it', () => result(() => game.progress(), false))
      ]
    );
  }

  poison(game: Game): void {
    const view: EventView = new EventView({ label: 'plantpoison' });
    view.init = (): void =>
      view.setDetails(
        game.party.members[0].sprite,
        `your party suddenly feels fatigued. perhaps it was something they ate...`,
        [
          new Action('continue', () => {
            for (const hero of game.party.members) {
              hero.fatigue(game.party);
            }
            game.progress();
          })
        ]
      );
    game.futureEvent(view, 3);
    game.progress();
  }

  empower(game: Game): void {
    const view: EventView = new EventView({ label: 'plantempower' });
    view.init = (): void =>
      view.setDetails(
        game.party.members[0].sprite,
        `your party suddenly feels stronger, smarter and faster. perhaps it was something they ate!`,
        [
          new Action('continue', () => {
            for (const hero of game.party.members) {
              hero.empowerRandom();
            }
            game.progress();
          })
        ]
      );
    game.futureEvent(view, 3);
    game.progress();
  }
}
