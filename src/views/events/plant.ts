import Action from '../../ui/action';
import View from '../../ui/view';
import Sprites from '../../enums/sprites';
import Random from '../../logic/random';
import Game from '../../game';

export default class PlantEvent extends View {

  constructor() {
    super();
    const RAW = 0;
    const BOIL = 1;
    const AVOID = 2;
    const plant = Random.element([
      {
        name: 'pokeweed',
        sprite: Sprites.PLANT1,
        type: AVOID
      },
      {
        name: 'chayote',
        sprite: Sprites.PLANT2,
        type: RAW
      },
      {
        name: 'elderberry',
        sprite: Sprites.PLANT3,
        type: BOIL
      }
    ]);
    const that = this;
    const result = (verb: string): void => that.setDetails(plant.sprite, `your party ${verb} the plant known as ${plant.name}`, [
      new Action('continue', () => Game.game.progress())
    ]);
    this.setDetails(plant.sprite, `your party is hungry and they come across a plant known as ${plant.name}. what do they do?`, [
      new Action('eat it raw', () => {
        if (plant.type === RAW) {
          result(`is empowered by`);
        } else {
          result(`gets poisoned by`);
        }
      }),
      new Action('eat it boiled', () => {
        if (plant.type === BOIL) {
          result('is empowered by');
        } else if (plant.type === AVOID) {
          result('gets poisoned by');
        } else {
          result('is not affected by');
        }
      }),
      new Action('avoid it', () => result(`avoids`))
    ]);
  }
}