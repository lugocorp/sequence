import Action from '../../ui/action';
import View from '../../ui/view';
import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Game from '../../game';

export default class PlantEvent extends View {
  constructor() {
    super();
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
        sprite: Sprites.CHAYOTE,
        type: SAFE
      },
      {
        name: 'purple passionflower',
        sprite: Sprites.CHAYOTE,
        type: SAFE
      },
      {
        name: 'elderberry',
        sprite: Sprites.ELDERBERRY,
        type: SEMISAFE
      },
      {
        name: 'yaupon holly',
        sprite: Sprites.ELDERBERRY,
        type: SEMISAFE
      },
      {
        name: 'pokeweed',
        sprite: Sprites.ELDERBERRY,
        type: SEMISAFE
      },
      {
        name: 'foxglove',
        sprite: Sprites.POKEWEED,
        type: TOXIC
      },
      {
        name: 'castor bean',
        sprite: Sprites.POKEWEED,
        type: TOXIC
      },
      {
        name: 'swamp sumac',
        sprite: Sprites.POKEWEED,
        type: TOXIC
      }
    ]);
    const that = this;
    const result = (aftermath: () => void, ate = true): void =>
      that.setDetails(
        plant.sprite,
        `your party ${ate ? 'eats' : 'avoids'} the plant known as ${plant.name}`,
        [new Action('continue', () => aftermath())]
      );
    this.setDetails(
      plant.sprite,
      `your party is hungry and they come across a plant known as ${plant.name}. what do they do?`,
      [
        new Action('eat it raw', () => {
          if (plant.type === SAFE) {
            result(that.empower);
          } else {
            result(that.poison);
          }
        }),
        new Action('eat it boiled', () => {
          if (plant.type === SEMISAFE) {
            result(that.empower);
          } else if (plant.type === TOXIC) {
            result(that.poison);
          } else {
            result(() => Game.game.progress());
          }
        }),
        new Action('avoid it', () => result(() => Game.game.progress(), false))
      ]
    );
  }

  poison(): void {
    const view: View = new View();
    view.init = (): void =>
      view.setDetails(
        Game.game.party.members[0].sprite,
        `your party suddenly feels fatigued. perhaps it was something they ate...`,
        [
          new Action('continue', () => {
            for (const hero of Game.game.party.members) {
              hero.fatigue();
            }
            Game.game.progress();
          })
        ]
      );
    Game.futureEvent(view, 3, () => true);
    Game.game.progress();
  }

  empower(): void {
    const view: View = new View();
    view.init = (): void =>
      view.setDetails(
        Game.game.party.members[0].sprite,
        `your party suddenly feels stronger, smarter and faster. perhaps it was something they ate!`,
        [
          new Action('continue', () => {
            for (const hero of Game.game.party.members) {
              hero.strength++;
              hero.wisdom++;
              hero.dexterity++;
            }
            Game.game.progress();
          })
        ]
      );
    Game.futureEvent(view, 3, () => true);
    Game.game.progress();
  }
}
