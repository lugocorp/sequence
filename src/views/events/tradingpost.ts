import Sprites from '../../media/sprites';
import EventView from '../event';
import Hero from '../../entities/hero';
import Item from '../../entities/item';
import Selectors from '../selectors';
import View from '../view';

export default class TradingPostEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.TRADING_POST,
                text: 'your party comes across a trading post. choose a party member and they will trade all their items for new ones.',
                actions: {
                    continue: () =>
                        this.game.views.setViews(
                            this.game.party.hasItems
                                ? Selectors.heroes(
                                      this.game,
                                      this.game.party.members.filter(
                                          (h: Hero) => h.basket.hasItems
                                      ),
                                      (hero: Hero) => ({
                                          trade: () => {
                                              const items: Item[] = hero.basket.toList();
                                              for (let a = 0; a < items.length; a++) {
                                                  hero.basket.unequip(items[a]);
                                                  hero.basket.equip(this.game.data.getRandomItem());
                                              }
                                              this.game.views.setViews([
                                                  {
                                                      image: hero.sprite,
                                                      text: `${hero.name} traded all their items for new ones.`,
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
                                          image: Sprites.TRADING_POST,
                                          text: 'nobody has any items to trade.',
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
