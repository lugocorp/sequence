import Random from '../../logic/random';
import Selector from '../../ui/selector';
import Action from '../../ui/action';
import View from '../../ui/view';
import Sprites from '../../enums/sprites';
import Rarity from '../../enums/rarity';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Game from '../../game';

export default class AnimalEvent extends View {
  private heroSelector: Selector<Hero>;

  constructor() {
    super();
    const that = this;
    const baby = Random.element([
      {
        name: 'cardinal',
        sprite: Sprites.CARDINAL
      },
      {
        name: 'raccoon',
        sprite: Sprites.RACCOON
      },
      {
        name: 'coyotl',
        sprite: Sprites.COYOTL
      }
    ]);
    this.heroSelector = Selector.heroSelector(Game.game.party.members);
    this.setDetails(baby.sprite, `your party finds a lonely baby ${baby.name}. someone will pick it up and deliver it to its family.`, [
      new Action('continue', () => {
        if (Game.game.party.canPickupItems()) {
          that.setSelector(that.heroSelector, [
            new Action('choose', () => {
              const hero: Hero = that.heroSelector.item();
              const item: Item = new Item(baby.name, Rarity.RARE, `a lonely baby looking for its family`);
              hero.equip(item);
              const view: View = new View();
              view.setDetails(baby.sprite, `${hero.name} returns the baby ${baby.name} to its family. they are blessed with better luck`, [
                new Action('continue', () => {
                  hero.luck += 10;
                  hero.unequip(item);
                  Game.game.progress();
                })
              ]);
              Game.futureEvent(view, 8, () => hero.isInParty() && hero.hasItem(item));
              that.setDetails(baby.sprite, `${hero.name} picks up the baby ${baby.name}`, [
                new Action('continue', () => Game.game.progress())
              ]);
            })
          ]);
        } else {
          that.setDetails(baby.sprite, `your party cannot pickup any items`, [
            new Action('continue', () => Game.game.progress())
          ]);
        }
      })
    ]);
  }
}