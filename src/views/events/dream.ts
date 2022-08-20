import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Action from '../../ui/action';
import View from '../../ui/view';
import Game from '../../game';

export default class DreamEvent extends View {

  init(): void {
    const hero: Hero = Game.game.party.randomHero();
    const item: Item = Game.game.data.getRandomItem();
    this.setDetails(hero.sprite, `${hero.name} has a dream about a powerful item. could it be prophetic?`, [
      new Action('continue', () => Game.game.progress())
    ]);

    // Set up future event
    const future: View = new View();
    future.setDetails(hero.sprite, `${hero.name} receives a powerful item they had recently dreamt of`, [
      new Action('view item', () => future.setDetails(hero.sprite, item.descriptionText(), [
        new Action('continue', () => {
          hero.equip(item);
          Game.game.progress();
        })
      ]))
    ]);
    Game.futureEvent(future, 10, () => Game.game.party.members.indexOf(hero) > -1);
  }
}