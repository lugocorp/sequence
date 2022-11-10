import Sprites from '../../enums/sprites';
import Stats from '../../enums/stats';
import Random from '../../logic/random';
import Action from '../../ui/action';
import { EventView } from '../event';
import Game from '../../game';

export default class ProjectEvent extends EventView {
  static label = 'project';

  constructor() {
    super(ProjectEvent);
    const that = this;
    const project: { sprite: Sprites; name: string } = Random.element([
      {
        name: 'build a bridge',
        sprite: Sprites.BRIDGE
      },
      {
        name: 'cook a feast',
        sprite: Sprites.FEAST
      },
      {
        name: 'maintain a garden',
        sprite: Sprites.GARDEN
      }
    ]);
    this.setDetails(
      project.sprite,
      `your party has the chance to ${project.name} for a local community, but it will wear everyone out. will they do it?`,
      [
        new Action('yes', () => that.yes(project)),
        new Action('no', () =>
          that.setDetails(project.sprite, `your party does not ${project.name}.`, [
            new Action('continue', () => Game.game.progress())
          ])
        )
      ]
    );
  }

  yes(project: { name: string; sprite: Sprites }): void {
    this.setDetails(
      project.sprite,
      `your party stays a while to ${project.name}. it is tiring but eventually the work is done and the community is thankful.`,
      [ new Action('continue', () => Game.game.progress()) ]
    );

    Game.game.history.peopleHelped++;
    for (const hero of Game.game.party.members) {
      hero.fatigue();
    }

    // Set up future event
    const future: EventView = new EventView({ label: 'projectthankyou' });
    future.setDetails(
      project.sprite,
      `your party sees a group approaching. they are a community you helped recently, and they have come to show their gratitude.`,
      [
        new Action('continue', () =>
          future.setDetails(
            project.sprite,
            'your party is empowered and made luckier by the thankful community members.',
            [
              new Action('continue', () => {
                for (const hero of Game.game.party.members) {
                  hero.boostLuck(5);
                  hero.empowerRandom();
                }
                Game.game.progress();
              })
            ]
          )
        )
      ]
    );
    Game.futureEvent(future, 8);
  }
}
