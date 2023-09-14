import Sprites from '../../media/sprites';
import Item from '../../entities/item';
import Hero from '../../entities/hero';
import Selectors from '../selectors';
import EventView from '../event';
import View from '../view';
import Game from '../../game';

export default class SuspiciousItemEvent extends EventView {
    getViews(): View[] {
        const item: Item = this.game.data.getRandomItem();
        return [
            {
                image: item.sprite,
                text: `your party comes across a suspicious ${item.name}. choose someone to pick it up.`,
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            this.game.party.canPickupItems
                                ? Selectors.heroes(
                                      this.game.party.members.filter(
                                          (h: Hero) => h.basket.hasSpace
                                      ),
                                      (hero: Hero) => ({
                                          select: () => {
                                              this.game.chain.futureEvent(
                                                  new SpiritWantsItsStuffBackEvent(
                                                      this.game,
                                                      hero,
                                                      item
                                                  ),
                                                  5,
                                                  () =>
                                                      this.game.party.contains(hero) &&
                                                      hero.basket.contains(item)
                                              );
                                              this.game.views.setViews([
                                                  {
                                                      image: hero.sprite,
                                                      text: `${hero.name} picks up the ${item.name}.`,
                                                      actions: {
                                                          continue: () => this.game.progress()
                                                      }
                                                  }
                                              ]);
                                          }
                                      })
                                  )
                                : [
                                      {
                                          image: item.sprite,
                                          text: `no one in your party has inventory space. they leave the ${item.name} behind.`,
                                          actions: {
                                              continue: () => this.game.progress()
                                          }
                                      }
                                  ]
                        )
                }
            }
        ];
    }
}

class SpiritWantsItsStuffBackEvent extends EventView {
    constructor(game: Game, private hero: Hero, private item: Item) {
        super(game);
    }

    getViews(): View[] {
        return [
            {
                image: Sprites.PUMA,
                text: `a spirit comes to ${this.hero.name} and asks to have their ${this.item.name} back.`,
                actions: {
                    'return it': () => {
                        this.hero.basket.unequip(this.item);
                        this.game.views.setViews([
                            {
                                image: Sprites.PUMA,
                                text: `${this.hero.name} returns the ${this.item.name} to the spirit.`,
                                actions: {
                                    continue: () => this.game.progress()
                                }
                            }
                        ]);
                    },
                    'no way': () => {
                        this.hero.str--;
                        this.hero.wis--;
                        this.hero.dex--;
                        this.hero.luck -= 10;
                        this.hero.energy--;
                        this.game.views.setViews([
                            {
                                image: Sprites.PUMA,
                                text: `the spirit places a curse upon ${this.hero.name}.`,
                                actions: {
                                    continue: () => this.game.progress()
                                }
                            }
                        ]);
                    }
                }
            }
        ];
    }
}
