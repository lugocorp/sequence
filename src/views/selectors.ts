import Hero from '../entities/hero';
import Item from '../entities/item';
import { Actions } from '../types';
import Game from '../game';
import View from './view';

export default class Selectors {
    static heroes(
        game: Game,
        heroes: Hero[],
        actions: (hero: Hero) => Actions,
        extra?: (hero: Hero) => string
    ): View[] {
        return heroes.map((hero: Hero, i: number) => {
            const view: View = {
                image: hero.sprite,
                text: `${i + 1}/${heroes.length} ${hero.descriptionText()}${
                    extra ? '\n' + extra(hero) : ''
                }`,
                actions: {
                    ...(hero.basket.hasItems
                        ? {
                              items: () =>
                                  game.views.setViews(
                                      Selectors.items(hero.basket.toList(), (_: Item) => ({
                                          back: () => game.views.setViews([ view ])
                                      }))
                                  )
                          }
                        : {}),
                    ...actions(hero)
                }
            };
            return view;
        });
    }

    static items(items: Item[], actions: (item: Item) => Actions): View[] {
        return items.map((x: Item, i: number) => ({
            image: x.sprite,
            text: `${i + 1}/${items.length} ${x.descriptionText()}`,
            actions: actions(x)
        }));
    }
}
