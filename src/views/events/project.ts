import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class ProjectEvent extends View {

  constructor() {
    super();
    const that = this;
    const project: string = Random.element([
      'build a bridge',
      'maintain a garden',
      'rebuild a house',
      'cook a feast'
    ]);
    this.setDetails(Sprites.PROJECT, `your party has the chance to ${project} for a local community, but it will wear everyone out. will they do it?`, [
      new Action('yes', () => that.yes(project)),
      new Action('no', () => that.setDetails(Sprites.PROJECT, `your party does not ${project}`, [
        new Action('continue', () => Game.game.progress())
      ]))
    ]);
  }

  yes(project: string): void {
    this.setDetails(Sprites.PROJECT, `your party stays a while to ${project}. it is tiring but eventually the work is done and the community is thankful.`, [
      new Action('continue', () => Game.game.progress())
    ]);

    for (const hero of Game.game.party.members) {
      hero.fatigue();
    }

    // Set up future event
    const future: View = new View();
    future.setDetails(Sprites.PROJECT, `your party sees a group approaching. they are a community you helped recently, and they have come to show their gratitude.`, [
      new Action('continue', () => future.setDetails(Sprites.PROJECT, 'your party is empowered by the thankful community members', [
        new Action('continue', () => {
          for (const hero of Game.game.party.members) {
            hero.strength++;
            hero.wisdom++;
            hero.dexterity++;
          }
          Game.game.progress();
        })
      ]))
    ]);
    Game.futureEvent(future, 8);
  }
}