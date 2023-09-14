import Sprites from '../../media/sprites';
import Selectors from '../selectors';
import EventView from '../event';
import Hero from '../../entities/hero';
import View from '../view';

export default class SunriseEvent extends EventView {
    getViews(): View[] {
        return [
            {
                image: Sprites.SUNRISE,
                text: 'a red sun rises over the horizon. someone in your party may offer all their belongings in return for an energy boost.',
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
                                          'offer items': () => {
                                              for (const item of hero.basket.toList()) {
                                                  hero.basket.unequip(item);
                                                  hero.energy++;
                                              }
                                              this.game.views.setViews([
                                                  {
                                                      image: hero.sprite,
                                                      text: `${hero.name} gave up all their belongings. they feel energized.`,
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
                                          image: Sprites.SUNRISE,
                                          text: `no one in your party has anything to offer.`,
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
